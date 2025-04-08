// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SocialLogin from './SocialLogin';
import LoadingButton from '../common/LoadingButton';
import { toast } from 'react-toastify';
import './LoginForm.css';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [remember, setRemember] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await login(email, password, remember);
			toast.success('Đăng nhập thành công!', {
				position: 'top-right',
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			navigate('/');
		} catch (error) {
			const errorMessage =
				error.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
			toast.error(errorMessage, {
				position: 'top-right',
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-6 -mt-4">
			<form className="space-y-6" onSubmit={handleSubmit}>
				{/* Form fields với thiết kế cải tiến */}
				<div className="space-y-1">
					<label
						htmlFor="email-address"
						className="block text-sm font-medium text-gray-700"
					>
						Email
					</label>
					<input
						id="email-address"
						name="email"
						type="email"
						autoComplete="email"
						required
						className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:shadow-md transition-all duration-200 sm:text-sm"
						placeholder="your.email@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="space-y-1">
					<div className="flex items-center justify-between">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Mật khẩu
						</label>
						<Link
							to="/forgot-password"
							className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
						>
							Quên mật khẩu?
						</Link>
					</div>
					<input
						id="password"
						name="password"
						type="password"
						autoComplete="current-password"
						required
						className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:shadow-md transition-all duration-200 sm:text-sm"
						placeholder="••••••••"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

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

				<div>
					<LoadingButton
						isLoading={isLoading}
						loadingText="Đang đăng nhập..."
						text="Đăng nhập"
						className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 transform hover:-translate-y-0.5"
					/>
				</div>
			</form>

			{/* Divider giữa form và social login */}
			<div className="flex items-center my-6">
				<div className="flex-1 border-t border-gray-300"></div>
				<span className="mx-4 text-sm text-gray-500 font-medium">
					Hoặc đăng nhập với
				</span>
				<div className="flex-1 border-t border-gray-300"></div>
			</div>

			{/* Social Login với style cải tiến */}
			<SocialLogin />

			<p className="mt-8 text-center text-sm text-gray-600">
				Chưa có tài khoản?{' '}
				<Link
					to="/register"
					className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
				>
					Đăng ký ngay
				</Link>
			</p>
		</div>
	);
};

export default LoginForm;
