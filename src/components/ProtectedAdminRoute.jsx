// src/components/ProtectedAdminRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { fetchCurrentUser } from '../services/authService';

const ProtectedAdminRoute = ({ children }) => {
	const { setUser, token } = useAuth();
	const [loading, setLoading] = useState(true);
	const [isAuthorized, setIsAuthorized] = useState(false);

	useEffect(() => {
		const checkAdminStatus = async () => {
			// Nếu không có token, chắc chắn không được phép truy cập
			if (!token) {
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				const userData = await fetchCurrentUser(token);
				setUser(userData);

				// Kiểm tra nếu người dùng là admin
				if (userData && userData.role === 'admin') {
					setIsAuthorized(true);
				}
			} catch (error) {
				console.error('Lỗi khi kiểm tra quyền admin:', error);
			} finally {
				setLoading(false);
			}
		};

		checkAdminStatus();
	}, [token, setUser]);

	// Hiển thị loading khi đang kiểm tra
	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
			</div>
		);
	}

	// Nếu không có token, chuyển hướng đến trang đăng nhập
	if (!token) {
		toast.error('Vui lòng đăng nhập để tiếp tục.');
		return <Navigate to="/login" replace />;
	}

	// Nếu có token nhưng không phải admin, chuyển hướng về trang chủ
	if (!isAuthorized) {
		toast.error('Bạn không có quyền truy cập trang này.');
		return <Navigate to="/" replace />;
	}

	// Nếu là admin, hiển thị nội dung được bảo vệ
	return children;
};

export default ProtectedAdminRoute;
