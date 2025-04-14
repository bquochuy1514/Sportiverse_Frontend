import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaKey } from 'react-icons/fa';
import { changePassword } from '../../services/userService'; // Giả sử bạn có service này

const ChangePassForm = () => {
	const [formData, setFormData] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState(0);
	const [passwordMessage, setPasswordMessage] = useState('');

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Đánh giá độ mạnh của mật khẩu mới
		if (name === 'newPassword') {
			evaluatePasswordStrength(value);
		}
	};

	const evaluatePasswordStrength = (password) => {
		// Reset
		let strength = 0;
		let message = '';

		// Tiêu chí đánh giá
		if (password.length === 0) {
			setPasswordStrength(0);
			setPasswordMessage('');
			return;
		}

		// Độ dài tối thiểu
		if (password.length >= 8) strength += 1;

		// Chứa số
		if (/\d/.test(password)) strength += 1;

		// Chứa chữ thường
		if (/[a-z]/.test(password)) strength += 1;

		// Chứa chữ hoa
		if (/[A-Z]/.test(password)) strength += 1;

		// Chứa ký tự đặc biệt
		if (/[^A-Za-z0-9]/.test(password)) strength += 1;

		// Xác định thông báo dựa trên độ mạnh
		if (strength < 2) {
			message = 'Rất yếu';
		} else if (strength < 3) {
			message = 'Yếu';
		} else if (strength < 4) {
			message = 'Trung bình';
		} else if (strength < 5) {
			message = 'Mạnh';
		} else {
			message = 'Rất mạnh';
		}

		setPasswordStrength(strength);
		setPasswordMessage(message);
	};

	const getStrengthColor = () => {
		if (passwordStrength < 2) return 'bg-red-500';
		if (passwordStrength < 3) return 'bg-orange-500';
		if (passwordStrength < 4) return 'bg-yellow-500';
		if (passwordStrength < 5) return 'bg-blue-500';
		return 'bg-green-500';
	};

	const getStrengthWidth = () => {
		return `${(passwordStrength / 5) * 100}%`;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate
		if (
			!formData.currentPassword ||
			!formData.newPassword ||
			!formData.confirmPassword
		) {
			toast.error('Vui lòng điền đầy đủ thông tin');
			return;
		}

		if (formData.newPassword !== formData.confirmPassword) {
			toast.error('Mật khẩu mới không khớp');
			return;
		}

		if (formData.newPassword.length < 8) {
			toast.error('Mật khẩu mới phải có ít nhất 8 ký tự');
			return;
		}

		setLoading(true);

		try {
			// Gọi API đổi mật khẩu (bạn cần triển khai service này)
			await changePassword({
				old_password: formData.currentPassword,
				new_password: formData.newPassword,
				new_password_confirmation: formData.confirmPassword,
			});

			toast.success('Đổi mật khẩu thành công!');

			// Reset form
			setFormData({
				currentPassword: '',
				newPassword: '',
				confirmPassword: '',
			});
			setPasswordStrength(0);
			setPasswordMessage('');
		} catch (error) {
			console.error('Lỗi khi đổi mật khẩu:', error);
			toast.error(
				error.message || 'Đổi mật khẩu thất bại. Vui lòng thử lại.'
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full md:w-3/4">
			<div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-teal-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
				<div className="mb-6">
					<h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
						<FaShieldAlt className="mr-3 text-teal-600" />
						Đổi mật khẩu
					</h2>
					<p className="text-gray-600">
						Cập nhật mật khẩu của bạn để bảo mật tài khoản
					</p>
					<div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full mt-2"></div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Mật khẩu hiện tại */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700">
							Mật khẩu hiện tại
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<FaLock className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type={showCurrentPassword ? 'text' : 'password'}
								name="currentPassword"
								value={formData.currentPassword}
								onChange={handleInputChange}
								className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
								placeholder="Nhập mật khẩu hiện tại"
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 pr-3 flex items-center"
								onClick={() =>
									setShowCurrentPassword(!showCurrentPassword)
								}
							>
								{showCurrentPassword ? (
									<FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-teal-600" />
								) : (
									<FaEye className="h-5 w-5 text-gray-400 hover:text-teal-600" />
								)}
							</button>
						</div>
					</div>

					{/* Mật khẩu mới */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700">
							Mật khẩu mới
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<FaKey className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type={showNewPassword ? 'text' : 'password'}
								name="newPassword"
								value={formData.newPassword}
								onChange={handleInputChange}
								className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
								placeholder="Nhập mật khẩu mới (ít nhất 8 ký tự)"
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 pr-3 flex items-center"
								onClick={() =>
									setShowNewPassword(!showNewPassword)
								}
							>
								{showNewPassword ? (
									<FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-teal-600" />
								) : (
									<FaEye className="h-5 w-5 text-gray-400 hover:text-teal-600" />
								)}
							</button>
						</div>

						{/* Thanh đánh giá độ mạnh mật khẩu */}
						{formData.newPassword && (
							<div className="mt-2">
								<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
									<div
										className={`h-full ${getStrengthColor()} transition-all duration-300`}
										style={{ width: getStrengthWidth() }}
									></div>
								</div>
								<p
									className={`text-xs mt-1 ${
										passwordStrength < 2
											? 'text-red-500'
											: passwordStrength < 3
											? 'text-orange-500'
											: passwordStrength < 4
											? 'text-yellow-600'
											: passwordStrength < 5
											? 'text-blue-600'
											: 'text-green-600'
									}`}
								>
									{passwordMessage}
								</p>
								<ul className="text-xs text-gray-500 mt-2 space-y-1">
									<li
										className={
											formData.newPassword.length >= 8
												? 'text-green-600'
												: ''
										}
									>
										• Ít nhất 8 ký tự
									</li>
									<li
										className={
											/[A-Z]/.test(formData.newPassword)
												? 'text-green-600'
												: ''
										}
									>
										• Ít nhất 1 chữ hoa
									</li>
									<li
										className={
											/[a-z]/.test(formData.newPassword)
												? 'text-green-600'
												: ''
										}
									>
										• Ít nhất 1 chữ thường
									</li>
									<li
										className={
											/\d/.test(formData.newPassword)
												? 'text-green-600'
												: ''
										}
									>
										• Ít nhất 1 số
									</li>
									<li
										className={
											/[^A-Za-z0-9]/.test(
												formData.newPassword
											)
												? 'text-green-600'
												: ''
										}
									>
										• Ít nhất 1 ký tự đặc biệt
									</li>
								</ul>
							</div>
						)}
					</div>

					{/* Nhập lại mật khẩu mới */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700">
							Xác nhận mật khẩu mới
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<FaKey className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type={showConfirmPassword ? 'text' : 'password'}
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleInputChange}
								className={`block w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
									formData.newPassword &&
									formData.confirmPassword &&
									formData.newPassword !==
										formData.confirmPassword
										? 'border-red-500 bg-red-50'
										: 'border-gray-300'
								}`}
								placeholder="Nhập lại mật khẩu mới"
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 pr-3 flex items-center"
								onClick={() =>
									setShowConfirmPassword(!showConfirmPassword)
								}
							>
								{showConfirmPassword ? (
									<FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-teal-600" />
								) : (
									<FaEye className="h-5 w-5 text-gray-400 hover:text-teal-600" />
								)}
							</button>
						</div>
						{formData.newPassword &&
							formData.confirmPassword &&
							formData.newPassword !==
								formData.confirmPassword && (
								<p className="text-xs text-red-500 mt-1">
									Mật khẩu xác nhận không khớp
								</p>
							)}
					</div>

					{/* Lưu ý và nút submit */}
					<div className="pt-4">
						<div className="p-4 bg-blue-50 rounded-xl mb-6 border-l-4 border-blue-500">
							<p className="text-sm text-blue-700">
								<strong>Lưu ý:</strong> Sau khi đổi mật khẩu,
								bạn sẽ cần đăng nhập lại bằng mật khẩu mới.
							</p>
						</div>

						<button
							type="submit"
							disabled={loading}
							className={`w-full py-3 px-4 flex justify-center items-center rounded-xl text-white font-medium transition-all duration-300 ${
								loading
									? 'bg-gray-400 cursor-not-allowed'
									: 'bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 shadow-md hover:shadow-lg'
							}`}
						>
							{loading ? (
								<>
									<svg
										className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									Đang xử lý...
								</>
							) : (
								'Cập nhật mật khẩu'
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ChangePassForm;
