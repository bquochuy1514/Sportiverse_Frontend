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

	const result = await response.json();
	if (!response.ok) {
		throw new Error(result.message || 'Đăng nhập thất bại');
	}

	return result.data;
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

export async function loginWithGoogle() {
	try {
		const response = await fetch('http://localhost:8000/api/auth/google', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error('Không thể kết nối với máy chủ');
		}

		const data = await response.json();

		if (!data.success || !data.url) {
			throw new Error('Không thể lấy URL đăng nhập Google');
		}

		const width = 1000;
		const height = 600;
		const left = window.screenX + (window.outerWidth - width) / 2;
		const top = window.screenY + (window.outerHeight - height) / 2.5;

		const popup = window.open(
			data.url,
			'googleAuth',
			`width=${width},height=${height},left=${left},top=${top}`
		);

		if (!popup) {
			throw new Error(
				'Popup bị chặn. Vui lòng cho phép popup trong trình duyệt.'
			);
		}

		return new Promise((resolve, reject) => {
			const checkPopup = setInterval(() => {
				if (!popup || popup.closed) {
					clearInterval(checkPopup);
					reject(new Error('Đăng nhập bị hủy hoặc thất bại'));
				}
			}, 500);

			// Lắng nghe message từ popup
			const handleMessage = (event) => {
				// Kiểm tra nguồn gốc để bảo mật
				if (event.origin !== 'http://localhost:5173') return;

				const { token, user } = event.data;
				if (token && user) {
					clearInterval(checkPopup);
					popup.close();
					window.removeEventListener('message', handleMessage);
					resolve({ token, user });
				}
			};

			window.addEventListener('message', handleMessage);

			// Timeout
			setTimeout(() => {
				clearInterval(checkPopup);
				if (popup && !popup.closed) popup.close();
				window.removeEventListener('message', handleMessage);
				reject(new Error('Đăng nhập hết thời gian chờ'));
			}, 120000); // 2 phút
		});
	} catch (error) {
		console.error('Lỗi đăng nhập Google:', error);
		throw error;
	}
}
