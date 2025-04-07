// src/services/authService.js
// Chứa tất cả các hàm gọi API liên quan đến xác thực

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

export async function loginUser(email, password, remember = false) {
	const response = await fetch('/api/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password, remember }),
	});

	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message || 'Đăng nhập thất bại');
	}

	return data;
}

export async function registerUser(userData) {
	const response = await fetch('/api/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	});

	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message || 'Đăng ký thất bại');
	}

	return data;
}

export async function logoutUser(token) {
	// Nếu backend yêu cầu invalidate token
	try {
		if (token) {
			await fetch('/api/logout', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		}
	} catch (error) {
		console.error('Lỗi khi logout từ server:', error);
	}
}
