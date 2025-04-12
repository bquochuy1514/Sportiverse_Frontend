// src/pages/auth/RegisterPage.jsx
import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';
import RegisterBanner from '../../components/auth/RegisterBanner';
import Logo from '../../components/common/Logo';
import loginImage from '../../assets/images/login-image.jpg'; // Sử dụng cùng hình ảnh với trang đăng nhập
import MembershipBenefits from '../../components/auth/MembershipBenefits';

const RegisterPage = () => {
	return (
		<div className="min-h-screen flex flex-col md:flex-row">
			{/* Phần banner bên trái */}
			<RegisterBanner image={loginImage} />

			{/* Phần form đăng ký - có thể cuộn */}
			<div className="w-full md:w-1/2 bg-white flex flex-col h-screen">
				<div className="flex-1 custom-scrollbar overflow-y-auto px-6 py-12">
					<div className="w-full max-w-md mx-auto">
						{/* Nội dung bên trên form đăng ký */}
						<div className="flex flex-col items-center mb-10">
							<div className="mb-6 flex justify-center">
								<Logo size="large" animated={true} />
							</div>
							<h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
								Tham gia ngay hôm nay!
							</h2>
							<p className="text-gray-600 text-center">
								Đăng ký để bắt đầu hành trình thể thao của bạn
								với Sportiverse
							</p>
						</div>

						{/* Form đăng ký */}
						<RegisterForm />

						{/* Thêm nội dung mới ở cuối */}
						<MembershipBenefits />
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
