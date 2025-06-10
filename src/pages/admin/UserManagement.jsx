// src/pages/admin/users/UserManagement.jsx
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UserFilters from './UserManagement/UserFilter';
import UserTable from './UserManagement/UserTable';
import UserDetailModal from './UserManagement/UserDetailModal';
import UserEditModal from './UserManagement/UserEditModal';
import { useAuth } from '../../contexts/AuthContext';

const UserManagement = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedRole, setSelectedRole] = useState('');
	const [selectedUser, setSelectedUser] = useState(null);
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const { token } = useAuth();

	const roleOptions = [
		{ value: '', label: 'Tất cả vai trò', color: 'gray' },
		{ value: 'admin', label: 'Quản trị viên', color: 'red' },
		{ value: 'customer', label: 'Người dùng', color: 'blue' },
	];

	// Fetch users từ API
	const fetchUsers = async () => {
		try {
			setLoading(true);
			const params = new URLSearchParams();
			if (selectedRole) params.append('role', selectedRole);
			if (searchTerm.trim()) params.append('search', searchTerm.trim());

			const response = await fetch(`/api/users?${params.toString()}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				const result = await response.json();
				if (result.status) {
					setUsers(result.users);
				} else {
					toast.error('Không thể tải danh sách người dùng');
				}
			} else {
				toast.error('Lỗi khi tải danh sách người dùng');
			}
		} catch (error) {
			console.error('Error fetching users:', error);
			toast.error('Có lỗi xảy ra khi tải danh sách người dùng');
		} finally {
			setLoading(false);
		}
	};

	// Load users khi component mount và khi filter thay đổi
	useEffect(() => {
		fetchUsers();
	}, [selectedRole]);

	// Debounce search để tránh gọi API liên tục
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			fetchUsers();
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [searchTerm]);

	// Cập nhật vai trò người dùng
	const updateUserRole = async (userId, newRole) => {
		try {
			setIsUpdating(true);
			const response = await fetch(`/api/users/${userId}/role`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ role: newRole }),
			});
			const result = await response.json();

			if (response.ok) {
				toast.success('Cập nhật vai trò người dùng thành công');
				fetchUsers();
				if (selectedUser && selectedUser.id === userId) {
					setSelectedUser({
						...selectedUser,
						role: newRole,
					});
				}
			} else {
				toast.error(
					result.message || 'Lỗi khi cập nhật vai trò người dùng'
				);
			}
		} catch (error) {
			console.error('Error updating user role:', error);
			toast.error('Có lỗi xảy ra khi cập nhật vai trò');
		} finally {
			setIsUpdating(false);
		}
	};

	// Xóa người dùng
	const deleteUser = async (userId) => {
		if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
			return;
		}

		try {
			setIsUpdating(true);
			const response = await fetch(`/api/users/${userId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});

			const result = await response.json();
			console.log(result);
			if (response.ok) {
				toast.success('Xóa người dùng thành công');
				fetchUsers();
				if (selectedUser && selectedUser.user_id === userId) {
					closeDetailModal();
				}
			} else {
				toast.error(result.message || 'Lỗi khi xóa người dùng');
			}
		} catch (error) {
			console.error('Error deleting user:', error);
			toast.error('Có lỗi xảy ra khi xóa người dùng');
		} finally {
			setIsUpdating(false);
		}
	};

	// Mở modal chi tiết người dùng
	const openUserDetail = (user) => {
		setSelectedUser(user);
		setIsDetailModalOpen(true);
	};

	// Mở modal chỉnh sửa người dùng
	const openUserEdit = (user) => {
		setSelectedUser(user);
		setIsEditModalOpen(true);
	};

	// Đóng modal chi tiết
	const closeDetailModal = () => {
		setIsDetailModalOpen(false);
		setSelectedUser(null);
	};

	// Đóng modal chỉnh sửa
	const closeEditModal = () => {
		setIsEditModalOpen(false);
		setSelectedUser(null);
	};

	return (
		<div className="max-w-7xl mx-auto px-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-900">
					Quản Lý Người Dùng
				</h1>
				<div className="text-sm text-gray-500">
					Tổng cộng: {users.length} người dùng
				</div>
			</div>

			<UserFilters
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				selectedRole={selectedRole}
				setSelectedRole={setSelectedRole}
				roleOptions={roleOptions}
			/>

			<UserTable
				users={users}
				loading={loading}
				roleOptions={roleOptions}
				onUserDetail={openUserDetail}
				onUserEdit={openUserEdit}
				onDeleteUser={deleteUser}
				isUpdating={isUpdating}
			/>

			{isDetailModalOpen && selectedUser && (
				<UserDetailModal
					user={selectedUser}
					roleOptions={roleOptions}
					onClose={closeDetailModal}
					onDeleteUser={deleteUser}
					isUpdating={isUpdating}
				/>
			)}

			{isEditModalOpen && selectedUser && (
				<UserEditModal
					user={selectedUser}
					roleOptions={roleOptions}
					onClose={closeEditModal}
					onUpdateRole={updateUserRole}
					onDeleteUser={deleteUser}
					isUpdating={isUpdating}
				/>
			)}
		</div>
	);
};

export default UserManagement;
