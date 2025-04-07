// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ErrorAlert from '../common/ErrorAlert';
import SocialLogin from './SocialLogin';
import LoadingButton from '../common/LoadingButton';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [remember, setRemember] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage('');
		setIsLoading(true);

		try {
			// Truyền thêm tham số remember vào hàm login
			await login(email, password, remember);
			navigate('/'); // Chuyển hướng về trang chủ sau khi đăng nhập thành công
		} catch (error) {
			setErrorMessage(
				error.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{errorMessage && <ErrorAlert message={errorMessage} />}

			<form className="space-y-6" onSubmit={handleSubmit}>
				{/* Email input */}
				<div>
					<label
						htmlFor="email-address"
						className="block text-sm font-medium text-gray-700"
					>
						Email
					</label>
					<div className="mt-1">
						<input
							id="email-address"
							name="email"
							type="email"
							autoComplete="email"
							required
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							placeholder="your.email@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
				</div>

				{/* Password input */}
				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700"
					>
						Mật khẩu
					</label>
					<div className="mt-1">
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							required
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							placeholder="••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>

				{/* Remember checkbox */}
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<input
							id="remember-me"
							name="remember-me"
							type="checkbox"
							className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
							checked={remember}
							onChange={(e) => setRemember(e.target.checked)}
						/>
						<label
							htmlFor="remember-me"
							className="ml-2 block text-sm text-gray-700"
						>
							Ghi nhớ đăng nhập
						</label>
					</div>

					<div className="text-sm">
						<a
							href="#"
							className="font-medium text-blue-600 hover:text-blue-500"
						>
							Quên mật khẩu?
						</a>
					</div>
				</div>

				<div>
					<LoadingButton
						isLoading={isLoading}
						loadingText="Đang đăng nhập..."
						text="Đăng nhập"
					/>
				</div>
			</form>

			{/* Social login */}
			<SocialLogin />

			<p className="mt-8 text-center text-sm text-gray-600">
				Chưa có tài khoản?{' '}
				<Link
					to="/register"
					className="font-medium text-blue-600 hover:text-blue-500"
				>
					Đăng ký ngay
				</Link>
			</p>
		</>
	);
};

export default LoginForm;
