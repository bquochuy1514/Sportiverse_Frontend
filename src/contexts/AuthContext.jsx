// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import {
	fetchCurrentUser,
	loginUser,
	registerUser,
	logoutUser,
} from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [token, setToken] = useState(localStorage.getItem('token'));
	const [tokenExpiry, setTokenExpiry] = useState(
		localStorage.getItem('token_expiry')
	);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Kiểm tra token hết hạn
	const isTokenExpired = () => {
		if (!tokenExpiry) return false;
		return new Date(tokenExpiry) < new Date();
	};

	// Hàm lấy thông tin người dùng từ token
	async function getUser() {
		if (!token || isTokenExpired()) {
			// Nếu token hết hạn, đăng xuất người dùng
			if (isTokenExpired()) {
				console.log('Token đã hết hạn, đăng xuất tự động');
				logout();
			}
			setUser(null);
			setLoading(false);
			return;
		}

		try {
			setLoading(true);
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
		} finally {
			setLoading(false);
		}
	}

	// Hàm đăng nhập với remember me
	const login = async (email, password, remember = false) => {
		try {
			setLoading(true);
			const data = await loginUser(email, password, remember);
			localStorage.setItem('token', data.data.token);

			// Lưu thời gian hết hạn token nếu có
			if (data.data.expires_at) {
				localStorage.setItem('token_expiry', data.data.expires_at);
				setTokenExpiry(data.data.expires_at);
			}

			setToken(data.data.token);
			setError(null);
			return data;
		} catch (err) {
			setError(err.message || 'Đăng nhập thất bại');
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// Hàm đăng xuất
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

	// Hàm đăng ký
	const register = async (userData) => {
		try {
			setLoading(true);
			const data = await registerUser(userData);
			localStorage.setItem('token', data.data.token);

			// Lưu thời gian hết hạn token nếu có
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
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (token && !isTokenExpired()) {
			getUser();
		} else {
			if (isTokenExpired()) {
				// Nếu token hết hạn, xóa token và đăng xuất
				localStorage.removeItem('token');
				localStorage.removeItem('token_expiry');
				setToken(null);
				setTokenExpiry(null);
				setUser(null);
			}
			setLoading(false);
		}
	}, [token]);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				token,
				setToken,
				loading,
				error,
				login,
				logout,
				register,
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
