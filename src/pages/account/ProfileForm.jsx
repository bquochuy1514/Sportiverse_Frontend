import React from 'react';
// eslint-disable-next-line no-unused-vars
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import {
	FiUser,
	FiMail,
	FiPhone,
	FiMapPin,
	FiImage,
	FiCheck,
	FiZap,
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
		<div className="w-full md:w-3/4">
			<div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-teal-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
				<div className="mb-8 pb-4 border-b border-gray-100">
					<h2 className="text-2xl font-bold text-gray-800 flex items-center">
						<span className="text-gradient-sport mr-2">
							<FiUser className="h-6 w-6" />
						</span>
						Thông tin cá nhân
					</h2>
					<p className="text-gray-600 mt-2">
						Cập nhật thông tin cá nhân của bạn để chúng tôi có thể
						phục vụ bạn tốt hơn.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-8">
					{/* Avatar section */}
					<div className="flex flex-col items-center justify-center py-10 bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl border border-dashed border-teal-300">
						<div className="w-40 h-40 rounded-full overflow-hidden mb-6 ring-4 ring-white shadow-xl bg-white p-1">
							<img
								src={
									avatarPreview ||
									'https://via.placeholder.com/150'
								}
								alt="Avatar"
								className="w-full h-full object-cover rounded-full"
							/>
						</div>
						<label className="cursor-pointer bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-teal-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2">
							<FiImage className="h-5 w-5" />
							<span>Thay đổi ảnh đại diện</span>
							<input
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleAvatarChange}
							/>
						</label>
						<p className="text-sm text-gray-500 mt-4 bg-white px-4 py-2 rounded-lg shadow-sm">
							Cho phép định dạng JPG, GIF hoặc PNG. Kích thước tối
							đa 2MB.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Email (Chỉ hiển thị) */}
						<div className="col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
								Email
								<span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
									Không thể thay đổi
								</span>
							</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
									<FiMail className="h-5 w-5" />
								</div>
								<input
									type="email"
									value={user.email}
									className="pl-10 w-full rounded-xl border-gray-300 bg-gray-50 shadow-sm py-3 text-gray-500 cursor-not-allowed"
									disabled
									readOnly
								/>
							</div>
							<p className="mt-1 text-xs text-gray-500">
								Email được sử dụng để đăng nhập và không thể
								thay đổi.
							</p>
						</div>

						{/* Name */}
						<div className="col-span-2 md:col-span-1">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Họ và tên
							</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-teal-500 transition-colors duration-200">
									<FiUser className="h-5 w-5" />
								</div>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									className="pl-10 w-full rounded-xl border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all duration-200 py-3"
									placeholder="Nhập họ và tên của bạn"
								/>
							</div>
						</div>

						{/* Phone */}
						<div className="col-span-2 md:col-span-1">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Số điện thoại
							</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-teal-500 transition-colors duration-200">
									<FiPhone className="h-5 w-5" />
								</div>
								<input
									type="text"
									name="phone"
									value={formData.phone}
									onChange={handleInputChange}
									className="pl-10 w-full rounded-xl border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all duration-200 py-3"
									placeholder="Nhập số điện thoại của bạn"
								/>
							</div>
						</div>

						{/* Address */}
						<div className="col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Địa chỉ
							</label>
							<div className="relative group">
								<div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none text-gray-400 group-hover:text-teal-500 transition-colors duration-200">
									<FiMapPin className="h-5 w-5" />
								</div>
								<textarea
									name="address"
									value={formData.address}
									onChange={handleInputChange}
									rows="3"
									className="pl-10 w-full rounded-xl border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all duration-200"
									placeholder="Nhập địa chỉ đầy đủ của bạn"
								></textarea>
							</div>
						</div>
					</div>

					{/* Submit Button */}
					<div className="flex justify-end pt-6 border-t border-gray-100">
						<button
							type="submit"
							disabled={formLoading}
							className={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 transform hover:-translate-y-0.5 ${
								formLoading
									? 'opacity-70 cursor-not-allowed'
									: ''
							}`}
						>
							{formLoading ? (
								<>
									<ImSpinner8 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
									Đang xử lý...
								</>
							) : (
								<>
									<FiCheck className="h-5 w-5 mr-2" />
									Lưu thay đổi
								</>
							)}
						</button>
					</div>
				</form>
			</div>

			{/* Thông tin bổ sung - thẻ thể thao */}
			<div className="mt-8 bg-gradient-to-r from-teal-500 to-blue-600 p-6 rounded-2xl shadow-xl text-white">
				<div className="flex items-start">
					<div className="mr-4 bg-white bg-opacity-20 p-3 rounded-lg">
						<FiZap className="h-8 w-8" />
					</div>
					<div>
						<h3 className="text-xl font-bold mb-2">
							Tài khoản thể thao của bạn
						</h3>
						<p className="text-teal-100">
							Cập nhật thông tin cá nhân để không bỏ lỡ các sự
							kiện thể thao hấp dẫn và ưu đãi dành riêng cho thành
							viên.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileForm;
