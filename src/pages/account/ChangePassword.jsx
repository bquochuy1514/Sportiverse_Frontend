import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchCurrentUser } from '../../services/userService';
import { toast } from 'react-toastify';
import HomeButton from '../../components/common/HomeButton';
import SidebarPassword from './SidebarPassword';
import ChangePassForm from './ChangePassForm';
import HeaderAccount from './HeaderAccount';
import AccountEffect from './AccountEffect';

const AccountPage = () => {
	const { setUser, token } = useAuth();
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		address: '',
		avatar: null,
	});
	const [avatarPreview, setAvatarPreview] = useState(null);

	// Fetch thông tin người dùng khi component mount
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				setLoading(true);
				const userData = await fetchCurrentUser(token);
				setUser(userData); // Cập nhật user vào context
				setFormData({
					name: userData.name || '',
					phone: userData.phone || '',
					address: userData.address || '',
					avatar: null,
				});
				setAvatarPreview(
					userData.avatar || 'https://via.placeholder.com/150'
				);
			} catch (error) {
				console.error('Lỗi khi fetch user:', error);
				toast.error(
					'Không thể tải thông tin người dùng. Vui lòng thử lại sau.'
				);
			} finally {
				setLoading(false);
			}
		};

		if (token) {
			fetchUserData();
		} else {
			toast.error('Vui lòng đăng nhập để tiếp tục.');
			setLoading(false);
		}
	}, [setUser, token]);

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-account-pattern bg-cover bg-center bg-fixed relative py-12 px-4 sm:px-6 overflow-hidden">
			<AccountEffect />

			<div className="max-w-6xl mx-auto relative z-10">
				{/* Header cao cấp với hiệu ứng và 3 chấm màu */}
				<HeaderAccount message="Thay đổi mật khẩu" />

				{/* Phần nội dung chính của trang */}
				<div className="flex flex-col md:flex-row gap-8">
					<SidebarPassword
						avatarPreview={avatarPreview}
						name={formData.name}
					/>
					<ChangePassForm />
				</div>
			</div>
		</div>
	);
};

export default AccountPage;
