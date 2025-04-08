// src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import LoadingButton from '../common/LoadingButton';
import { toast } from 'react-toastify';
import './LoginForm.css';
import { useAuth } from '../../contexts/AuthContext';

const RegisterForm = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [agreeTerms, setAgreeTerms] = useState(false);

	const navigate = useNavigate();
	const { register } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!agreeTerms) {
			toast.error('Vui lòng đồng ý với điều khoản dịch vụ để tiếp tục.', {
				position: 'top-right',
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			return;
		}

		setIsLoading(true);

		try {
			await register({
				name,
				email,
				password,
				password_confirmation: passwordConfirmation,
			});
			toast.success('Đăng ký thành công! Vui lòng đăng nhập.', {
				position: 'top-right',
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			navigate('/login');
		} catch (error) {
			const errorMessage =
				error.message || 'Đăng ký thất bại. Vui lòng thử lại.';
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
				{/* Name Input */}
				<div className="space-y-1">
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700"
					>
						Tên người dùng
					</label>
					<input
						type="text"
						name="name"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Tên người dùng của bạn"
						className="input-field"
						required
					/>
				</div>

				{/* Email Input */}
				<div className="space-y-1">
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="your.email@example.com"
						className="input-field"
						required
					/>
					<p className="text-xs text-gray-500 mt-1">
						Chúng tôi sẽ không bao giờ chia sẻ email của bạn với bất
						kỳ ai khác.
					</p>
				</div>

				{/* Password Fields - Side by side on larger screens */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Password Input */}
					<div className="space-y-1">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Mật khẩu
						</label>
						<input
							type="password"
							name="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							className="input-field"
							required
						/>
					</div>

					{/* Password Confirmation Input */}
					<div className="space-y-1">
						<label
							htmlFor="password_confirmation"
							className="block text-sm font-medium text-gray-700"
						>
							Xác nhận mật khẩu
						</label>
						<input
							type="password"
							name="password_confirmation"
							id="password_confirmation"
							value={passwordConfirmation}
							onChange={(e) =>
								setPasswordConfirmation(e.target.value)
							}
							placeholder="••••••••"
							className="input-field"
							required
						/>
					</div>
				</div>

				{/* Password strength indicator */}
				{password && (
					<div className="space-y-1">
						<div className="flex items-center justify-between">
							<span className="text-xs text-gray-500">
								Độ mạnh mật khẩu:
							</span>
							<span className="text-xs font-medium">
								{password.length < 6 ? (
									<span className="text-red-500">Yếu</span>
								) : password.length < 8 ? (
									<span className="text-yellow-500">
										Trung bình
									</span>
								) : (
									<span className="text-green-500">Mạnh</span>
								)}
							</span>
						</div>
						<div className="w-full bg-gray-200 rounded-full h-1.5">
							<div
								className={`h-1.5 rounded-full ${
									password.length < 6
										? 'bg-red-500 w-1/3'
										: password.length < 8
										? 'bg-yellow-500 w-2/3'
										: 'bg-green-500 w-full'
								}`}
							></div>
						</div>
						<ul className="text-xs text-gray-500 mt-1 space-y-1 list-disc pl-5">
							<li
								className={
									password.length >= 8 ? 'text-green-600' : ''
								}
							>
								Ít nhất 8 ký tự
							</li>
							<li
								className={
									/[A-Z]/.test(password)
										? 'text-green-600'
										: ''
								}
							>
								Ít nhất 1 chữ hoa
							</li>
							<li
								className={
									/[0-9]/.test(password)
										? 'text-green-600'
										: ''
								}
							>
								Ít nhất 1 số
							</li>
						</ul>
					</div>
				)}

				{/* Terms and Conditions Checkbox */}
				<div className="flex items-start">
					<div className="flex items-center h-5">
						<input
							id="terms"
							name="terms"
							type="checkbox"
							checked={agreeTerms}
							onChange={(e) => setAgreeTerms(e.target.checked)}
							className="checkbox-custom h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
						/>
					</div>
					<div className="ml-3 text-sm">
						<label htmlFor="terms" className="text-gray-600">
							Tôi đồng ý với{' '}
							<Link
								to="/terms"
								className="text-blue-600 hover:text-blue-800"
							>
								Điều khoản dịch vụ
							</Link>{' '}
							và{' '}
							<Link
								to="/privacy"
								className="text-blue-600 hover:text-blue-800"
							>
								Chính sách bảo mật
							</Link>
						</label>
					</div>
				</div>

				<div>
					<LoadingButton
						isLoading={isLoading}
						loadingText="Đang đăng ký..."
						text="Đăng ký tài khoản"
						className="login-btn transform hover:-translate-y-0.5"
						disabled={!agreeTerms}
					/>
				</div>
			</form>

			{/* Divider */}
			<div className="divider">
				<span className="divider-text">Hoặc đăng ký với</span>
			</div>

			{/* Social Login */}
			<SocialLogin />

			{/* Already have account */}
			<div className="mt-8 text-center">
				<p className="text-sm text-gray-600">
					Đã có tài khoản?{' '}
					<Link
						to="/login"
						className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
					>
						Đăng nhập ngay
					</Link>
				</p>
			</div>
			{/* Security notice */}
			<div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
				<div className="flex">
					<div className="flex-shrink-0">
						<svg
							className="h-5 w-5 text-blue-400"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<div className="ml-3">
						<h3 className="text-sm font-medium text-blue-800">
							Bảo mật thông tin
						</h3>
						<div className="mt-1 text-xs text-blue-700">
							<p>
								Thông tin của bạn được mã hóa và bảo vệ an toàn.
								Chúng tôi không bao giờ chia sẻ thông tin cá
								nhân của bạn với bên thứ ba mà không có sự đồng
								ý.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterForm;
