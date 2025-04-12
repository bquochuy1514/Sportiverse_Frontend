import React from 'react';
import { FaSignOutAlt, FaCircle } from 'react-icons/fa'; // Import các biểu tượng cần thiết

const Sidebar = ({ avatarPreview, name }) => {
	return (
		<div className="w-full md:w-1/4">
			<div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-teal-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
				<div className="flex flex-col items-center mb-8">
					<div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-teal-400 to-blue-500 p-1 shadow-lg mb-4">
						<img
							src={
								avatarPreview ||
								'https://via.placeholder.com/150'
							}
							alt="User"
							className="w-full h-full object-cover rounded-full"
						/>
					</div>
					<h2 className="text-xl font-bold text-gray-800">
						{name || 'Người dùng'}
					</h2>
					<div className="flex items-center mt-2">
						<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
							<FaCircle className="mr-1 h-2 w-2 text-teal-500" />{' '}
							{/* Thay SVG vòng tròn */}
							Thành viên
						</span>
					</div>
				</div>

				<div className="space-y-4">
					<div className="p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border-l-4 border-teal-500 shadow-sm">
						<p className="text-sm font-semibold text-teal-700">
							Thông tin cá nhân
						</p>
						<p className="text-xs text-teal-600 mt-1 opacity-80">
							Quản lý thông tin cá nhân của bạn
						</p>
					</div>

					<div className="p-4 rounded-xl border-l-4 border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors">
						<p className="text-sm font-semibold text-gray-700">
							Đổi mật khẩu
						</p>
						<p className="text-xs text-gray-500 mt-1">
							Cập nhật mật khẩu tài khoản
						</p>
					</div>
				</div>

				<div className="mt-10 pt-6 border-t border-gray-100">
					<button className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 p-3 rounded-xl transition-colors duration-300">
						<FaSignOutAlt className="h-5 w-5" />{' '}
						<span>Đăng xuất</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
