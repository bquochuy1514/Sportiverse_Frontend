import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
	FiUser,
	FiMail,
	FiPhone,
	FiMapPin,
	FiImage,
	FiCheck,
	FiZap,
	FiInfo,
	FiShield,
} from 'react-icons/fi';
import { ImSpinner8 } from 'react-icons/im';

const ProfileForm = ({
	formData,
	avatarPreview,
	formLoading,
	handleInputChange,
	handleAvatarChange,
	handleSubmit,
}) => {
	const { user } = useAuth();

	return (
		<div className="w-full md:w-3/4 ">
			<div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-teal-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Cột trái: Avatar và thông tin nhanh */}
					<div className="lg:col-span-1">
						{/* Avatar section tối ưu */}
						<div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-dashed border-teal-300 p-5 flex flex-col items-center">
							<div className="w-32 h-32 rounded-full overflow-hidden mb-4 ring-4 ring-white shadow-lg bg-white p-1">
								<img
									src={
										avatarPreview ||
										'https://via.placeholder.com/150'
									}
									alt="Avatar"
									className="w-full h-full object-cover rounded-full"
								/>
							</div>
							<label className="cursor-pointer bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-300 shadow-md flex items-center space-x-1 text-sm">
								<FiImage className="h-4 w-4" />
								<span>Thay đổi ảnh</span>
								<input
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleAvatarChange}
								/>
							</label>
							<p className="text-xs text-gray-500 mt-3 text-center">
								JPG, GIF, PNG. Tối đa 2MB
							</p>
						</div>

						{/* Thông tin bổ sung */}
						<div className="mt-4 bg-gradient-to-r from-teal-500 to-blue-600 p-4 rounded-xl shadow-lg text-white">
							<div className="flex items-center">
								<FiShield className="h-5 w-5 mr-2" />
								<h3 className="text-sm font-bold">
									Xác thực tài khoản
								</h3>
							</div>
							<p className="text-xs text-teal-100 mt-2">
								Tài khoản của bạn đã được xác thực. Cập nhật
								thông tin để nhận các ưu đãi đặc biệt.
							</p>
						</div>
					</div>

					{/* Cột phải: Form thông tin */}
					<div className="lg:col-span-2">
						<h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
							<FiUser className="h-5 w-5 mr-2 text-teal-600" />
							Thông tin cá nhân
						</h2>

						<form onSubmit={handleSubmit} className="space-y-4">
							{/* Email (Chỉ hiển thị) */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
									Email
									<span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
										<FiInfo className="h-3 w-3 mr-1" />
										Không thể thay đổi
									</span>
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
										<FiMail className="h-4 w-4" />
									</div>
									<input
										type="email"
										value={user.email}
										className="pl-9 w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm py-2 text-gray-500 cursor-not-allowed text-sm"
										disabled
										readOnly
									/>
								</div>
							</div>

							{/* Grid layout cho các trường còn lại */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{/* Name */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Họ và tên
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-teal-500 transition-colors duration-200">
											<FiUser className="h-4 w-4" />
										</div>
										<input
											type="text"
											name="name"
											value={formData.name}
											onChange={handleInputChange}
											className="pl-9 w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all duration-200 py-2 text-sm"
											placeholder="Nhập họ và tên của bạn"
										/>
									</div>
								</div>

								{/* Phone */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Số điện thoại
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-teal-500 transition-colors duration-200">
											<FiPhone className="h-4 w-4" />
										</div>
										<input
											type="text"
											name="phone"
											value={formData.phone}
											onChange={handleInputChange}
											className="pl-9 w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all duration-200 py-2 text-sm"
											placeholder="Nhập số điện thoại của bạn"
										/>
									</div>
								</div>
							</div>

							{/* Address */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Địa chỉ
								</label>
								<div className="relative">
									<div className="absolute top-2.5 left-0 pl-3 flex items-start pointer-events-none text-gray-400 group-hover:text-teal-500 transition-colors duration-200">
										<FiMapPin className="h-4 w-4" />
									</div>
									<textarea
										name="address"
										value={formData.address}
										onChange={handleInputChange}
										rows="2"
										className="pl-9 w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all duration-200 text-sm"
										placeholder="Nhập địa chỉ đầy đủ của bạn"
									></textarea>
								</div>
							</div>

							{/* Submit Button */}
							<div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
								<button
									type="submit"
									disabled={formLoading}
									className={`inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 text-sm ${
										formLoading
											? 'opacity-70 cursor-not-allowed'
											: ''
									}`}
								>
									{formLoading ? (
										<>
											<ImSpinner8 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
											Đang xử lý...
										</>
									) : (
										<>
											<FiCheck className="h-4 w-4 mr-2" />
											Lưu thay đổi
										</>
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>

			{/* Thông tin bổ sung - thẻ thể thao */}
			<div className="mt-5 bg-gradient-to-r from-teal-500 to-blue-600 p-4 rounded-2xl shadow-lg text-white">
				<div className="flex items-center">
					<div className="mr-3 bg-white bg-opacity-20 p-2 rounded-lg">
						<FiZap className="h-6 w-6" />
					</div>
					<div>
						<h3 className="text-base font-bold">
							Tài khoản thể thao của bạn
						</h3>
						<p className="text-sm text-teal-100 mt-1">
							Cập nhật thông tin để không bỏ lỡ các sự kiện thể
							thao hấp dẫn.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileForm;
