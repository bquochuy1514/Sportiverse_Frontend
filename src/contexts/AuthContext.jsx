import { createContext, useContext, useState, useEffect } from 'react';
import {
	fetchCurrentUser,
	loginUser,
	registerUser,
	logoutUser,
	loginWithGoogle,
} from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [token, setToken] = useState(localStorage.getItem('token'));
	const [tokenExpiry, setTokenExpiry] = useState(
		localStorage.getItem('token_expiry')
	);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	const isTokenExpired = () => {
		if (!tokenExpiry) return false;
		return new Date(tokenExpiry) < new Date();
	};

	async function getUser() {
		if (!token || isTokenExpired()) {
			if (isTokenExpired()) {
				console.log('Token đã hết hạn, đăng xuất tự động');
				logout();
			}
			setUser(null);
			return;
		}

		try {
			const userData = await fetchCurrentUser(token);
			setUser(userData);
			setError(null);
		} catch (error) {
			console.error('Error fetching user:', error);
			setToken(null);
			localStorage.removeItem('token');
			localStorage.removeItem('token_expiry');
			setUser(null);
			setError(error.message || 'Không thể lấy thông tin người dùng');
		}
	}

	const loginWithGoogleProvider = async () => {
		try {
			const { token, user } = await loginWithGoogle();
			localStorage.setItem('token', token);
			setToken(token);
			setUser(user);
			setError(null);
			return { token, user };
		} catch (err) {
			setError(err.message || 'Đăng nhập bằng Google thất bại');
			throw err;
		}
	};

	const login = async (email, password, remember = false) => {
		try {
			const data = await loginUser(email, password, remember);
			localStorage.setItem('token', data.token);
			if (data.expires_at) {
				localStorage.setItem('token_expiry', data.expires_at);
				setTokenExpiry(data.expires_at);
			}
			setToken(data.token);
			setError(null);
			return data;
		} catch (err) {
			setError(err.message || 'Đăng nhập thất bại');
			throw err;
		}
	};

	const logout = async () => {
		try {
			await logoutUser(token);
		} finally {
			localStorage.removeItem('token');
			localStorage.removeItem('token_expiry');
			setToken(null);
			setTokenExpiry(null);
			setUser(null);
		}
	};

	const register = async (userData) => {
		try {
			const data = await registerUser(userData);
			localStorage.setItem('token', data.data.token);
			if (data.data.expires_at) {
				localStorage.setItem('token_expiry', data.data.expires_at);
				setTokenExpiry(data.data.expires_at);
			}
			setToken(data.data.token);
			setError(null);
			return data;
		} catch (err) {
			setError(err.message || 'Đăng ký thất bại');
			throw err;
		}
	};

	useEffect(() => {
		if (token && !isTokenExpired()) {
			getUser();
		} else {
			if (isTokenExpired()) {
				localStorage.removeItem('token');
				localStorage.removeItem('token_expiry');
				setToken(null);
				setTokenExpiry(null);
				setUser(null);
			}
		}
	}, [token]);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				token,
				setToken,
				error,
				login,
				logout,
				register,
				loginWithGoogleProvider,
				isAuthenticated: !!user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
