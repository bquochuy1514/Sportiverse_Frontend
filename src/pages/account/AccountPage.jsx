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
import { FaUser } from 'react-icons/fa';

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
			const response = await updateUserProfile(data, token);
			console.log('Response từ backend:', response);

			// Cập nhật user trong context
			const updatedUser = {
				name: formData.name,
				phone: formData.phone,
				address: formData.address,
				avatar: response.data.user.avatar || avatarPreview,
			};

			setUser(updatedUser);
			setAvatarPreview(response.data.user.avatar || avatarPreview);
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
			<div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 via-blue-900/60 to-blue-800/70 backdrop-blur-sm"></div>
			<div className="absolute inset-0 opacity-10 bg-pattern-sport"></div>
			<HomeButton variant="light" position="top-6 left-6" />
			<div className="absolute top-20 right-10 w-60 h-60 bg-teal-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
			<div
				className="absolute bottom-20 left-10 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"
				style={{ animationDelay: '2s' }}
			></div>

			<div className="max-w-6xl mx-auto relative z-10">
				{/* Phần header ở đầu trang có 3 cái chấm màu */}
				<div className="relative mb-10">
					<div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg opacity-10 blur-xl h-32"></div>
					<div className="relative flex items-center justify-between p-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-teal-100">
						<h1 className="text-3xl font-extrabold text-gray-800 flex items-center">
							<span className="bg-gradient-to-r from-teal-600 to-blue-600 text-white p-2 rounded-lg mr-3">
								<FaUser className="h-6 w-6" />
							</span>
							Quản lý tài khoản
						</h1>
						<div className="hidden md:block">
							<div className="flex space-x-1">
								<span className="h-3 w-3 bg-red-500 rounded-full"></span>
								<span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
								<span className="h-3 w-3 bg-green-500 rounded-full"></span>
							</div>
						</div>
					</div>
				</div>

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
