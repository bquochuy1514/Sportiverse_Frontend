import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AuthCallback = () => {
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const token = params.get('token');
		const id = params.get('id');
		const name = params.get('name');
		const email = params.get('email');
		const avatar = params.get('avatar');
		const role = params.get('role');

		if (token && window.opener) {
			// Gửi dữ liệu về cửa sổ chính
			window.opener.postMessage(
				{
					token,
					user: { id, name, email, avatar, role },
				},
				'http://localhost:5173'
			);
			window.close(); // Đóng popup
		} else {
			console.error('No token or opener found');
		}
	}, [location]);

	return <div>Processing...</div>;
};

export default AuthCallback;
