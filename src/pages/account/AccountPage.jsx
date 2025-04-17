import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
	fetchCurrentUser,
	updateUserProfile,
} from '../../services/userService';
import { toast } from 'react-toastify';
import HomeButton from '../../components/common/HomeButton';
import Sidebar from './Sidebar';
import ProfileForm from './ProfileForm';
import HeaderAccount from './HeaderAccount';
import AccountEffect from './AccountEffect';

const AccountPage = () => {
	const { setUser, token } = useAuth();
	const [loading, setLoading] = useState(true);
	const [formLoading, setFormLoading] = useState(false);
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

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleAvatarChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.size > 2048 * 1024) {
				toast.error('Ảnh phải nhỏ hơn 2MB');
				return;
			}
			setFormData((prev) => ({ ...prev, avatar: file }));
			setAvatarPreview(URL.createObjectURL(file));
			console.log('File đã chọn:', file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormLoading(true);

		const data = new FormData();
		data.append('name', formData.name);
		data.append('phone', formData.phone);
		data.append('address', formData.address);
		if (formData.avatar instanceof File)
			data.append('avatar', formData.avatar);

		console.log('Dữ liệu gửi đi:');
		for (let [key, value] of data.entries()) {
			console.log(`${key}:`, value);
		}

		try {
			const response = await updateUserProfile(data);
			console.log('Response từ backend:', response);

			// Cập nhật user trong context
			const updatedUser = {
				name: formData.name,
				phone: formData.phone,
				address: formData.address,
				avatar: response.user.avatar || avatarPreview,
			};

			setUser(updatedUser);
			setAvatarPreview(response.user.avatar || avatarPreview);
			toast.success(response.message || 'Cập nhật thông tin thành công!');
		} catch (error) {
			console.error('Lỗi:', error);
			toast.error(
				error.message || 'Cập nhật thất bại. Vui lòng thử lại.'
			);
		} finally {
			setFormLoading(false);
		}
	};

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
				<HeaderAccount message="Quản lí tài khoản" />

				{/* Phần nội dung chính của trang */}
				<div className="flex flex-col md:flex-row gap-8">
					<Sidebar
						avatarPreview={avatarPreview}
						name={formData.name}
					/>
					<ProfileForm
						formData={formData}
						avatarPreview={avatarPreview}
						formLoading={formLoading}
						handleInputChange={handleInputChange}
						handleAvatarChange={handleAvatarChange}
						handleSubmit={handleSubmit}
					/>
				</div>
			</div>
		</div>
	);
};

export default AccountPage;
