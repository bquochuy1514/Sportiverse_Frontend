// src/pages/admin/users/UserManagement/UserTable.jsx
import {
	FiEye,
	FiEdit,
	FiTrash2,
	FiUser,
	FiMail,
	FiPhone,
	FiMapPin,
} from 'react-icons/fi';

const UserTable = ({
	users,
	loading,
	roleOptions,
	onUserDetail,
	onUserEdit,
	onDeleteUser,
	isUpdating,
}) => {
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

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('vi-VN', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	if (loading) {
		return (
			<div className="bg-white rounded-lg shadow-sm border border-gray-200">
				<div className="p-8 text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
					<p className="mt-2 text-gray-500">
						Đang tải danh sách người dùng...
					</p>
				</div>
			</div>
		);
	}

	if (users.length === 0) {
		return (
			<div className="bg-white rounded-lg shadow-sm border border-gray-200">
				<div className="p-8 text-center">
					<FiUser className="h-12 w-12 text-gray-400 mx-auto mb-4" />
					<p className="text-gray-500">
						Không tìm thấy người dùng nào
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Người dùng
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Liên hệ
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Vai trò
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Ngày tạo
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Thao tác
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{users.map((user) => (
							<tr key={user.id} className="hover:bg-gray-50">
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="flex items-center">
										<div className="flex-shrink-0 h-10 w-10">
											{user.avatar ? (
												<img
													className="h-10 w-10 rounded-full object-cover"
													src={user.avatar}
													alt={user.name}
												/>
											) : (
												<div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
													<FiUser className="h-6 w-6 text-gray-600" />
												</div>
											)}
										</div>
										<div className="ml-4">
											<div className="text-sm font-medium text-gray-900">
												{user.name || 'Chưa cập nhật'}
											</div>
											<div className="text-sm text-gray-500">
												ID: {user.id}
											</div>
										</div>
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-gray-900">
										<div className="flex items-center mb-1">
											<FiMail className="h-4 w-4 text-gray-400 mr-2" />
											{user.email}
										</div>
										<div
											className={`flex items-center ${
												user.phone ? '' : 'text-red-400'
											}`}
										>
											<FiPhone
												className={`h-4 w-4 text-gray-400 mr-2 ${
													user.phone
														? ''
														: 'text-red-400'
												}`}
											/>
											{user.phone
												? user.phone
												: 'Chưa cập nhật'}
										</div>
										<div
											className={`flex items-center ${
												user.address
													? ''
													: 'text-red-400'
											}`}
										>
											<FiMapPin
												className={`h-4 w-4 text-gray-400 mr-2 ${
													user.address
														? ''
														: 'text-red-400'
												}`}
											/>
											{user.address
												? user.address
												: 'Chưa cập nhật'}
										</div>
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									{getRoleBadge(user.role)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{formatDate(user.created_at)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<div className="flex items-center space-x-2">
										<button
											onClick={() => onUserDetail(user)}
											className="text-blue-600 hover:text-blue-900 p-1 rounded"
											title="Xem chi tiết"
										>
											<FiEye className="h-4 w-4" />
										</button>
										<button
											onClick={() => onUserEdit(user)}
											className="text-green-600 hover:text-green-900 p-1 rounded"
											title="Chỉnh sửa"
										>
											<FiEdit className="h-4 w-4" />
										</button>
										<button
											onClick={() =>
												onDeleteUser(user.id)
											}
											disabled={isUpdating}
											className="text-red-600 hover:text-red-900 p-1 rounded disabled:opacity-50"
											title="Xóa người dùng"
										>
											<FiTrash2 className="h-4 w-4" />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserTable;
