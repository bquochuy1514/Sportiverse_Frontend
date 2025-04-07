// src/pages/auth/LoginPage.jsx
import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import LoginBanner from '../../components/auth/LoginBanner';
import Logo from '../../components/common/Logo';
import loginImage from '../../assets/images/login-image.jpg';
import MembershipBenefits from '../../components/auth/MembershipBenefits'; // Import component MembershipBenefits
import './LoginPage.css';

const LoginPage = () => {
	return (
		<div className="min-h-screen flex flex-col md:flex-row">
			{/* Phần banner bên trái */}
			<LoginBanner image={loginImage} />

			{/* Phần form đăng nhập - có thể cuộn */}
			<div className="w-full md:w-1/2 bg-white flex flex-col h-screen">
				<div className="flex-1 custom-scrollbar overflow-y-auto px-6 py-12">
					<div className="w-full max-w-md mx-auto">
						{/* Nội dung bên trên form đăng nhập */}
						<div className="flex flex-col items-center mb-10">
							<div className="mb-6 flex justify-center">
								<Logo size="large" animated={true} />
							</div>
							<h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
								Chào mừng trở lại!
							</h2>
							<p className="text-gray-600 text-center">
								Đăng nhập để tiếp tục hành trình thể thao của
								bạn
							</p>
						</div>

						{/* Form đăng nhập */}
						<LoginForm />

						{/* Thêm nội dung mới ở cuối */}
						<MembershipBenefits />
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
