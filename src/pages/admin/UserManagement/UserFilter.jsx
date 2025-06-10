// src/pages/admin/users/UserManagement/UserFilter.jsx
import { FiSearch } from 'react-icons/fi';

const UserFilters = ({
	searchTerm,
	setSearchTerm,
	selectedRole,
	setSelectedRole,
	roleOptions,
}) => {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Tìm kiếm */}
				<div className="relative">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Tìm kiếm người dùng
					</label>
					<div className="relative">
						<FiSearch className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
						<input
							type="text"
							placeholder="Tìm theo tên, email, số điện thoại..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
				</div>

				{/* Lọc theo vai trò */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Vai trò
					</label>
					<select
						value={selectedRole}
						onChange={(e) => setSelectedRole(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					>
						{roleOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Nút reset filters */}
			<div className="mt-4 flex justify-end">
				<button
					onClick={() => {
						setSearchTerm('');
						setSelectedRole('');
					}}
					className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
				>
					Xóa bộ lọc
				</button>
			</div>
		</div>
	);
};

export default UserFilters;
