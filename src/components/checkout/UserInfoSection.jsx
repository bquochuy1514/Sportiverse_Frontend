import { FaUser, FaPhone, FaMapMarkerAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserInfoSection = ({ userInfo }) => {
	return (
		<div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
			<div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
				<h2 className="text-xl font-semibold text-white flex items-center gap-3">
					<FaUser className="text-lg" />
					Thông tin người nhận
				</h2>
			</div>
			<div className="p-6">
				{userInfo ? (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
									<FaUser className="text-blue-600" />
								</div>
								<div>
									<p className="text-sm text-gray-500">
										Họ và tên
									</p>
									<p className="font-semibold text-gray-800">
										{userInfo.name ||
											userInfo.full_name ||
											'Chưa cập nhật'}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
									<FaPhone className="text-green-600" />
								</div>
								<div>
									<p className="text-sm text-gray-500">
										Số điện thoại
									</p>
									<p className="font-semibold text-gray-800">
										{userInfo.phone || 'Chưa cập nhật'}
									</p>
								</div>
							</div>
						</div>
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mt-1">
									<FaMapMarkerAlt className="text-red-600" />
								</div>
								<div>
									<p className="text-sm text-gray-500">
										Địa chỉ
									</p>
									<p className="font-semibold text-gray-800">
										{userInfo.address || 'Chưa cập nhật'}
									</p>
								</div>
							</div>
							<button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
								<FaEdit className="text-sm" />
								<Link to="/account">Chỉnh sửa thông tin</Link>
							</button>
						</div>
					</div>
				) : (
					<div className="text-center py-8">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
						<p className="text-gray-500 mt-2">
							Đang tải thông tin...
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserInfoSection;
