// src/components/auth/LoginBanner.jsx
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import HomeButton from '../common/HomeButton';
import HuyImage from '../../assets/images/huy-dalat.jpg';

const LoginBanner = ({ image }) => {
	// Animation variants cho container
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2, // Mỗi phần tử con cách nhau 0.2 giây
				delayChildren: 0.3, // Trì hoãn các phần tử con 0.3 giây
			},
		},
	};

	// Animation variants cho các phần tử con
	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.6, ease: 'easeOut' },
		},
	};

	// Tính toán thời gian trì hoãn cho HomeButton
	// Tổng thời gian = delayChildren + (số phần tử con - 1) * staggerChildren + duration
	// Có 4 phần tử con trước HomeButton: h2, p, thống kê, testimonial
	// => Tổng thời gian = 0.3 + (4 - 1) * 0.2 + 0.6 = 0.3 + 0.6 + 0.6 = 1.5 giây
	const homeButtonDelay = 1.5;

	// Animation variants cho container của HomeButton
	const homeButtonContainerVariants = {
		hidden: { visibility: 'hidden' }, // Ẩn hoàn toàn
		visible: {
			visibility: 'visible', // Hiển thị sau khi trì hoãn
			transition: {
				delay: homeButtonDelay, // Trì hoãn hiển thị container
			},
		},
	};

	// Animation variants cho HomeButton
	const homeButtonVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: 'easeOut',
				delay: homeButtonDelay, // Trì hoãn hiệu ứng của HomeButton
			},
		},
	};

	return (
		<div className="hidden md:block md:w-1/2 relative overflow-hidden">
			{/* Ảnh nền với hiệu ứng zoom nhẹ */}
			<div className="absolute inset-0 w-full h-full transform scale-105 animate-slow-zoom">
				<img
					src={image}
					alt="Thể thao"
					className="absolute inset-0 w-full h-full object-cover filter brightness-75"
				/>
			</div>

			{/* Lớp phủ gradient */}
			<div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-70"></div>

			{/* Pattern overlay để tạo hiệu ứng */}
			<div className="absolute inset-0 opacity-10 bg-pattern"></div>

			{/* Nội dung */}
			<motion.div
				className="relative z-10 flex flex-col items-center justify-center w-full h-full px-8 text-white"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.h2
					variants={itemVariants}
					className="text-5xl font-bold mb-4 tracking-tight"
				>
					Sportiverse
				</motion.h2>

				<motion.p
					variants={itemVariants}
					className="text-xl mb-10 text-center max-w-md leading-relaxed text-blue-100"
				>
					Tham gia cộng đồng thể thao của chúng tôi và khám phá những
					sản phẩm chất lượng cao dành cho đam mê của bạn
				</motion.p>

				{/* Thống kê */}
				<motion.div
					variants={itemVariants}
					className="grid grid-cols-3 gap-6 w-full max-w-md mb-12"
				>
					<div className="bg-white bg-opacity-15 p-5 rounded-xl backdrop-blur-sm border border-white border-opacity-20 transform hover:scale-105 transition-transform duration-300 shadow-lg">
						<div className="text-center">
							<div className="text-4xl font-bold mb-2 text-white">
								50+
							</div>
							<div className="text-sm text-blue-100 uppercase tracking-wider font-medium">
								Môn thể thao
							</div>
						</div>
					</div>
					<div className="bg-white bg-opacity-15 p-5 rounded-xl backdrop-blur-sm border border-white border-opacity-20 transform hover:scale-105 transition-transform duration-300 shadow-lg">
						<div className="text-center">
							<div className="text-4xl font-bold mb-2 text-white">
								5000+
							</div>
							<div className="text-sm text-blue-100 uppercase tracking-wider font-medium">
								Sản phẩm
							</div>
						</div>
					</div>
					<div className="bg-white bg-opacity-15 p-5 rounded-xl backdrop-blur-sm border border-white border-opacity-20 transform hover:scale-105 transition-transform duration-300 shadow-lg">
						<div className="text-center">
							<div className="text-4xl font-bold mb-2 text-white">
								100K+
							</div>
							<div className="text-sm text-blue-100 uppercase tracking-wider font-medium">
								Khách hàng
							</div>
						</div>
					</div>
				</motion.div>

				{/* Testimonial */}
				<motion.div
					variants={itemVariants}
					className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm border border-white border-opacity-20 max-w-md mb-8"
				>
					<div className="flex items-center mb-4">
						<div className="w-12 h-12 flex items-center justify-center mr-4">
							<img
								className="rounded-full"
								src={HuyImage}
								alt="Bùi Quốc Huy"
							/>
						</div>
						<div>
							<div className="font-medium text-white">
								Bùi Quốc Huy
							</div>
							<div className="text-sm text-blue-200">
								Vận động viên chuyên nghiệp
							</div>
						</div>
					</div>
					<p className="italic text-blue-100">
						"Sportiverse đã thay đổi cách tôi mua sắm thiết bị thể
						thao. Sản phẩm chất lượng cao và dịch vụ khách hàng
						tuyệt vời!"
					</p>
				</motion.div>

				{/* Container ẩn HomeButton */}
				<motion.div
					className="absolute top-6 left-6" // Đặt vị trí cố định cho HomeButton
					variants={homeButtonContainerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.div
						variants={homeButtonVariants}
						initial="hidden"
						animate="visible"
					>
						<HomeButton className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm transition-all duration-300 py-2 px-4 whitespace-nowrap rounded-lg text-white border border-white border-opacity-30" />
					</motion.div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default LoginBanner;
