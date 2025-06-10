// src/pages/admin/users/UserManagement/UserDetailModal.jsx
import {
	FiX,
	FiUser,
	FiMail,
	FiPhone,
	FiMapPin,
	FiCalendar,
	FiTrash2,
} from 'react-icons/fi';

const UserDetailModal = ({ user, roleOptions, onClose }) => {
	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('vi-VN', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const getRoleBadge = (role) => {
		const roleOption = roleOptions.find((opt) => opt.value === role);
		if (!roleOption) return null;

		const colorClasses = {
			red: 'bg-red-100 text-red-800',
			blue: 'bg-blue-100 text-blue-800',
			gray: 'bg-gray-100 text-gray-800',
		};

		return (
			<span
				className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
					colorClasses[roleOption.color] || colorClasses.gray
				}`}
			>
				{roleOption.label}
			</span>
		);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex justify-between items-center p-6 border-b border-gray-200">
					<h2 className="text-xl font-semibold text-gray-900">
						Chi Tiết Người Dùng
					</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 p-1 rounded"
					>
						<FiX className="h-6 w-6" />
					</button>
				</div>

				{/* Content */}
				<div className="p-6">
					{/* Thông tin cơ bản */}
					<div className="mb-6">
						<h3 className="text-lg font-medium text-gray-900 mb-4">
							Thông Tin Cơ Bản
						</h3>
						<div className="bg-gray-50 rounded-lg p-4">
							<div className="flex items-center mb-4">
								<div className="flex-shrink-0 h-16 w-16 mr-4">
									{user.avatar ? (
										<img
											className="h-16 w-16 rounded-full object-cover"
											src={user.avatar}
											alt={user.name}
										/>
									) : (
										<div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
											<FiUser className="h-8 w-8 text-gray-600" />
										</div>
									)}
								</div>
								<div className="flex-1">
									<h4 className="text-lg font-medium text-gray-900">
										{user.name || 'Chưa cập nhật'}
									</h4>
									<p className="text-sm text-gray-500">
										ID: {user.id}
									</p>
									<div className="flex items-center space-x-2 mt-2">
										{getRoleBadge(user.role)}
									</div>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="flex items-center">
									<FiMail className="h-5 w-5 text-gray-400 mr-3" />
									<div>
										<p className="text-sm font-medium text-gray-900">
											Email
										</p>
										<p className="text-sm text-gray-600">
											{user.email}
										</p>
									</div>
								</div>

								{user.phone && (
									<div className="flex items-center">
										<FiPhone className="h-5 w-5 text-gray-400 mr-3" />
										<div>
											<p className="text-sm font-medium text-gray-900">
												Số điện thoại
											</p>
											<p className="text-sm text-gray-600">
												{user.phone}
											</p>
										</div>
									</div>
								)}

								{user.address && (
									<div className="flex items-start">
										<FiMapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
										<div>
											<p className="text-sm font-medium text-gray-900">
												Địa chỉ
											</p>
											<p className="text-sm text-gray-600">
												{user.address}
											</p>
										</div>
									</div>
								)}

								<div className="flex items-center">
									<FiCalendar className="h-5 w-5 text-gray-400 mr-3" />
									<div>
										<p className="text-sm font-medium text-gray-900">
											Ngày tạo
										</p>
										<p className="text-sm text-gray-600">
											{formatDate(user.created_at)}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Thông tin bổ sung */}
					{user.date_of_birth && (
						<div className="mb-6">
							<h3 className="text-lg font-medium text-gray-900 mb-4">
								Thông Tin Bổ Sung
							</h3>
							<div className="bg-gray-50 rounded-lg p-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<p className="text-sm font-medium text-gray-900">
											Ngày sinh
										</p>
										<p className="text-sm text-gray-600">
											{new Date(
												user.date_of_birth
											).toLocaleDateString('vi-VN')}
										</p>
									</div>
									{user.gender && (
										<div>
											<p className="text-sm font-medium text-gray-900">
												Giới tính
											</p>
											<p className="text-sm text-gray-600">
												{user.gender === 'male'
													? 'Nam'
													: user.gender === 'female'
													? 'Nữ'
													: 'Khác'}
											</p>
										</div>
									)}
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
					<button
						onClick={onClose}
						className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Đóng
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserDetailModal;
