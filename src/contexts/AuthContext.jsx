// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import {
	fetchCurrentUser,
	loginUser,
	registerUser,
	logoutUser,
	loginWithGoogle,
	loginWithFacebook,
} from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [token, setToken] = useState(localStorage.getItem('token'));
	const [tokenExpiry, setTokenExpiry] = useState(
		localStorage.getItem('token_expiry')
	);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);

	const isTokenExpired = () => {
		if (!tokenExpiry) return false;
		return new Date(tokenExpiry) < new Date();
	};

	useEffect(() => {
		const handleWindowFocus = () => {
			if (isAuthPopupOpen) {
				setIsAuthPopupOpen(false);
			}
		};
		window.addEventListener('focus', handleWindowFocus);
		return () => window.removeEventListener('focus', handleWindowFocus);
	}, [isAuthPopupOpen]);

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
			setIsAuthPopupOpen(true);
			const { token, user: initialUser } = await loginWithGoogle();
			localStorage.setItem('token', token);
			setToken(token);
			setUser(initialUser); // Cập nhật user ban đầu
			await getUser(); // Đồng bộ thông tin user từ server
			setError(null);
			setIsAuthPopupOpen(false);
		} catch (err) {
			setIsAuthPopupOpen(false);
			setError(err.message || 'Đăng nhập bằng Google thất bại');
			throw err;
		}
	};

	const loginWithFacebookProvider = async () => {
		try {
			setIsAuthPopupOpen(true);
			const { token, user: initialUser } = await loginWithFacebook();
			localStorage.setItem('token', token);
			setToken(token);
			setUser(initialUser); // Cập nhật user ban đầu
			await getUser(); // Đồng bộ thông tin user từ server
			setError(null);
			setIsAuthPopupOpen(false);
		} catch (err) {
			// eslint-disable-next-line no-undef
			setIs / AuthPopupOpen(false);
			setError(err.message || 'Đăng nhập bằng Facebook thất bại');
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
			await getUser(); // Đồng bộ user sau khi đăng nhập
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
			await registerUser(userData);
			setError(null);
		} catch (err) {
			setError(err.message || 'Đăng ký thất bại');
			throw err;
		}
	};

	useEffect(() => {
		if (token && !isTokenExpired()) {
			getUser();
		} else if (isTokenExpired()) {
			localStorage.removeItem('token');
			localStorage.removeItem('token_expiry');
			setToken(null);
			setTokenExpiry(null);
			setUser(null);
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
				loginWithFacebookProvider,
				isAuthenticated: !!user,
				isAuthPopupOpen,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
