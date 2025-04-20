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
		// Gọi API để lấy URL đăng nhập Google
		const response = await fetch('/api/auth/google');

		if (!response.ok) {
			throw new Error('Không thể kết nối với máy chủ');
		}

		const data = await response.json();

		if (!data.success || !data.url) {
			throw new Error('Không thể lấy URL đăng nhập Google');
		}

		// Tính toán kích thước và vị trí popup
		const width = 1000;
		const height = 600;
		const left = window.screenX + (window.outerWidth - width) / 2;
		const top = window.screenY + (window.outerHeight - height) / 2.5;

		// Mở popup
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

		// Kiểm tra trạng thái popup
		const checkPopupInterval = setInterval(() => {
			if (!popup || popup.closed) {
				clearInterval(checkPopupInterval);
				throw new Error('Đăng nhập bị hủy hoặc thất bại');
			}
		}, 500);

		// Chuyển đổi sự kiện message thành một promise để await
		const messagePromise = new Promise((resolve) => {
			const handleMessage = (event) => {
				if (event.origin !== import.meta.env.VITE_FRONTEND_URL) return;

				const { token, user } = event.data;
				if (token && user) {
					clearInterval(checkPopupInterval);
					popup.close();
					window.removeEventListener('message', handleMessage);
					resolve({ token, user });
				}
			};
			window.addEventListener('message', handleMessage);
		});

		// Xử lý timeout
		const timeoutPromise = new Promise((_, reject) => {
			setTimeout(() => {
				clearInterval(checkPopupInterval);
				if (popup && !popup.closed) popup.close();
				reject(new Error('Đăng nhập hết thời gian chờ'));
			}, 120000); // 2 phút
		});

		// Chờ kết quả từ message hoặc timeout
		const result = await Promise.race([messagePromise, timeoutPromise]);

		return result; // Trả về { token, user }
	} catch (error) {
		console.error('Lỗi đăng nhập Google:', error);
		throw error;
	}
}

export async function loginWithFacebook() {
	try {
		// Gọi API để lấy URL đăng nhập Facebook
		const response = await fetch('/api/auth/facebook');

		if (!response.ok) {
			throw new Error('Không thể kết nối với máy chủ');
		}

		const data = await response.json();

		console.log('data', data);

		if (!data.success || !data.url) {
			throw new Error('Không thể lấy URL đăng nhập Facebook');
		}

		// Tính toán kích thước và vị trí popup
		const width = 1000;
		const height = 600;
		const left = window.screenX + (window.outerWidth - width) / 2;
		const top = window.screenY + (window.outerHeight - height) / 2.5;

		// Mở popup
		const popup = window.open(
			data.url,
			'facebookAuth',
			`width=${width},height=${height},left=${left},top=${top}`
		);

		if (!popup) {
			throw new Error(
				'Popup bị chặn. Vui lòng cho phép popup trong trình duyệt.'
			);
		}

		// Kiểm tra trạng thái popup
		const checkPopupInterval = setInterval(() => {
			if (!popup || popup.closed) {
				clearInterval(checkPopupInterval);
				throw new Error('Đăng nhập bị hủy hoặc thất bại');
			}
		}, 500);

		// Chuyển đổi sự kiện message thành một promise để await
		const messagePromise = new Promise((resolve) => {
			const handleMessage = (event) => {
				if (event.origin !== 'http://localhost:5173') return;

				const { token, user } = event.data;
				if (token && user) {
					clearInterval(checkPopupInterval);
					popup.close();
					window.removeEventListener('message', handleMessage);
					resolve({ token, user });
				}
			};
			window.addEventListener('message', handleMessage);
		});

		// Xử lý timeout
		const timeoutPromise = new Promise((_, reject) => {
			setTimeout(() => {
				clearInterval(checkPopupInterval);
				if (popup && !popup.closed) popup.close();
				reject(new Error('Đăng nhập hết thời gian chờ'));
			}, 120000); // 2 phút
		});

		// Chờ kết quả từ message hoặc timeout
		const result = await Promise.race([messagePromise, timeoutPromise]);

		return result; // Trả về { token, user }
	} catch (error) {
		console.error('Lỗi đăng nhập Facebook:', error);
		throw error;
	}
}
