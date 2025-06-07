import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../components/common/Logo';

const ResetPassword = () => {
	const [token, setToken] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const query = new URLSearchParams(useLocation().search);

	useEffect(() => {
		// Lấy token và email từ query parameters
		const tokenFromUrl = query.get('token') || '';
		const emailFromUrl = query.get('email') || '';
		setToken(tokenFromUrl);
		setEmail(emailFromUrl);

		// Kiểm tra nếu thiếu token hoặc email
		if (!tokenFromUrl || !emailFromUrl) {
			setMessage('Liên kết không hợp lệ. Vui lòng thử lại.');
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setMessage('');

		try {
			const response = await fetch('/api/reset-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'ngrok-skip-browser-warning': 'true', // Header cho ngrok
				},
				body: JSON.stringify({
					token,
					email,
					password,
					password_confirmation: passwordConfirmation,
				}),
			});

			const data = await response.json();

			console.log(data);

			if (!response.ok) {
				throw new Error(data.message || 'Đã có lỗi xảy ra.');
			}

			setMessage(data.message);
			setTimeout(() => navigate('/login'), 2000);
		} catch (error) {
			setMessage(error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-400 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
			<div className="relative bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105 duration-300">
				{/* Logo Placeholder */}
				<div className="flex justify-center mb-6">
					<Logo />
				</div>
				<h2 className="text-3xl font-extrabold text-center text-gray-900 mb-4">
					Đặt lại mật khẩu
				</h2>
				<p className="text-sm text-gray-600 text-center mb-6">
					Nhập mật khẩu mới để đặt lại mật khẩu của bạn.
				</p>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<div className="mt-1 relative">
							<input
								id="email"
								type="email"
								value={email}
								readOnly
								className="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-500 cursor-not-allowed"
							/>
							<svg
								className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
								/>
							</svg>
						</div>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Mật khẩu mới
						</label>
						<div className="mt-1 relative">
							<input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
								placeholder="Nhập mật khẩu mới"
								required
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="password_confirmation"
							className="block text-sm font-medium text-gray-700"
						>
							Xác nhận mật khẩu
						</label>
						<div className="mt-1 relative">
							<input
								id="password_confirmation"
								type="password"
								value={passwordConfirmation}
								onChange={(e) =>
									setPasswordConfirmation(e.target.value)
								}
								className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
								placeholder="Xác nhận mật khẩu"
								required
							/>
						</div>
					</div>
					{message && (
						<div
							className={`text-sm p-3 rounded-lg transition-opacity duration-300 ${
								message.includes('has been reset')
									? 'bg-green-100 text-green-700'
									: 'bg-red-100 text-red-700'
							}`}
						>
							{message}
						</div>
					)}
					<button
						type="submit"
						disabled={isLoading}
						className={`w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out ${
							isLoading ? 'opacity-50 cursor-not-allowed' : ''
						}`}
					>
						{isLoading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
					</button>
				</form>
				<p className="mt-6 text-center text-sm text-gray-600">
					Quay lại{' '}
					<a
						href="/login"
						className="text-blue-600 font-medium hover:underline"
					>
						Đăng nhập
					</a>
				</p>
			</div>
		</div>
	);
};

export default ResetPassword;
