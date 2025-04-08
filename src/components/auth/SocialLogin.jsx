// src/components/auth/SocialLogin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import FacebookIcon from '../common/icons/FacebookIcon';
import GoogleIcon from '../common/icons/GoogleIcon';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';
import './LoginForm.css';

const SocialLogin = () => {
	const {
		loginWithGoogleProvider,
		loginWithFacebookProvider,
		isAuthPopupOpen,
	} = useAuth();
	const navigate = useNavigate();
	const [isGoogleLoading, setIsGoogleLoading] = useState(false);
	const [isFacebookLoading, setIsFacebookLoading] = useState(false);

	useEffect(() => {
		if (
			isAuthPopupOpen === false &&
			(isGoogleLoading || isFacebookLoading)
		) {
			setIsGoogleLoading(false);
			setIsFacebookLoading(false);
			toast.error('Đăng nhập đã bị hủy', {
				position: 'top-right',
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		}
	}, [isAuthPopupOpen, isGoogleLoading, isFacebookLoading]);

	const handleGoogleLogin = async () => {
		setIsGoogleLoading(true);
		try {
			await loginWithGoogleProvider(); // Chờ hoàn tất đăng nhập
			toast.success('Đăng nhập bằng Google thành công!', {
				position: 'top-right',
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			navigate('/'); // Điều hướng sau khi hoàn tất
		} catch (error) {
			console.error('Google login error:', error);
			let errorMsg =
				error.code === 'auth/popup-closed-by-user' ||
				error.code === 'auth/cancelled-popup-request'
					? 'Đăng nhập Google đã bị hủy'
					: 'Đăng nhập Google thất bại: ' +
					  (error.message || 'Đã xảy ra lỗi');
			toast.error(errorMsg, {
				position: 'top-right',
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		} finally {
			setIsGoogleLoading(false);
		}
	};

	const handleFacebookLogin = async () => {
		setIsFacebookLoading(true);
		try {
			await loginWithFacebookProvider(); // Chờ hoàn tất đăng nhập
			toast.success('Đăng nhập bằng Facebook thành công!', {
				position: 'top-right',
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			navigate('/'); // Điều hướng sau khi hoàn tất
		} catch (error) {
			console.error('Facebook login error:', error);
			let errorMsg =
				error.code === 'auth/popup-closed-by-user' ||
				error.code === 'auth/cancelled-popup-request'
					? 'Đăng nhập Facebook đã bị hủy'
					: 'Đăng nhập Facebook thất bại: ' +
					  (error.message || 'Đã xảy ra lỗi');
			toast.error(errorMsg, {
				position: 'top-right',
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		} finally {
			setIsFacebookLoading(false);
		}
	};

	return (
		<div className="mt-6 grid grid-cols-2 gap-4">
			<button
				type="button"
				onClick={handleFacebookLogin}
				disabled={isFacebookLoading || isGoogleLoading}
				className="social-btn transition-all duration-300 transform hover:-translate-y-0.5"
			>
				{isFacebookLoading ? (
					<Spinner color="text-blue-500" />
				) : (
					<FacebookIcon className="h-5 w-5 text-[#1877F2]" />
				)}
				<span className="ml-2 font-medium">
					{isFacebookLoading ? 'Đang xử lý...' : 'Facebook'}
				</span>
			</button>
			<button
				type="button"
				onClick={handleGoogleLogin}
				disabled={isGoogleLoading || isFacebookLoading}
				className="social-btn transition-all duration-300 transform hover:-translate-y-0.5"
			>
				{isGoogleLoading ? (
					<Spinner color="text-red-500" />
				) : (
					<GoogleIcon className="h-5 w-5" />
				)}
				<span className="ml-2 font-medium">
					{isGoogleLoading ? 'Đang xử lý...' : 'Google'}
				</span>
			</button>
		</div>
	);
};

export default SocialLogin;
