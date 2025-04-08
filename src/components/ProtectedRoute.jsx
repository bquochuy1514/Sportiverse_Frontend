// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, redirectIfAuthenticated = false }) => {
	const { isAuthenticated, token } = useAuth();

	if (redirectIfAuthenticated && isAuthenticated) {
		toast.info('Bạn đã đăng nhập, không thể truy cập trang này.', {
			position: 'top-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		});
		return <Navigate to="/" replace />;
	}

	if (!redirectIfAuthenticated && !isAuthenticated && !token) {
		toast.error('Vui lòng đăng nhập để truy cập trang này.', {
			position: 'top-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		});
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default ProtectedRoute;
