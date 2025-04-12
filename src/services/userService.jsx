// src/services/userService.js

// Lấy thông tin user hiện tại
export async function fetchCurrentUser(token) {
	if (!token) return null;

	const res = await fetch('/api/me', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		throw new Error('Không thể lấy thông tin người dùng');
	}
	const result = await res.json();
	return result.data.user;
}

// Cập nhật thông tin profile
export const updateUserProfile = async (userData) => {
	try {
		const response = await fetch('/api/user/update', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: userData,
		});

		if (!response.ok) {
			throw new Error('Không thể cập nhật thông tin người dùng');
		}

		return await response.json();
	} catch (error) {
		console.error('Lỗi khi cập nhật thông tin người dùng:', error);
		throw error;
	}
};

// Đổi mật khẩu
export const changePassword = async (passwordData) => {
	try {
		const response = await fetch('/api/user/change-password', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(passwordData),
		});

		if (!response.ok) {
			const data = await response.json();
			throw new Error(data.message || 'Không thể đổi mật khẩu');
		}

		return await response.json();
	} catch (error) {
		console.error('Lỗi khi đổi mật khẩu:', error);
		throw error;
	}
};
