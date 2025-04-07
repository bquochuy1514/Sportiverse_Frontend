// src/components/auth/LoginBanner.jsx
import React from 'react';
import HomeButton from '../common/HomeButton';

const LoginBanner = ({ image }) => {
	return (
		<div className="hidden md:block md:w-1/2 relative">
			{/* Ảnh nền lớn */}
			<img
				src={image}
				alt="Thể thao"
				className="absolute inset-0 w-full h-full object-cover"
			/>

			{/* Lớp phủ nhẹ */}
			<div className="absolute inset-0 bg-blue-900 bg-opacity-50"></div>

			{/* Nội dung */}
			<div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-8 text-white">
				<h2 className="text-4xl font-bold mb-6">Sportiverse</h2>
				<p className="text-xl mb-8 text-center max-w-md">
					Tham gia cộng đồng thể thao của chúng tôi và khám phá những
					sản phẩm chất lượng cao dành cho đam mê của bạn
				</p>
				<div className="grid grid-cols-3 gap-4 w-full max-w-md">
					<div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
						<div className="text-center">
							<div className="text-3xl font-bold mb-1">50+</div>
							<div className="text-sm">Môn thể thao</div>
						</div>
					</div>
					<div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
						<div className="text-center">
							<div className="text-3xl font-bold mb-1">5000+</div>
							<div className="text-sm">Sản phẩm</div>
						</div>
					</div>
					<div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
						<div className="text-center">
							<div className="text-3xl font-bold mb-1">100K+</div>
							<div className="text-sm">Khách hàng</div>
						</div>
					</div>
				</div>

				{/* Link về trang chủ */}
				<HomeButton />
			</div>
		</div>
	);
};

export default LoginBanner;
