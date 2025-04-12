// src/components/auth/RegisterBanner.jsx
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import HomeButton from '../common/HomeButton';
import AthletesImage from '../../assets/images/login-image.jpg';

const RegisterBanner = ({ image }) => {
	// State để lưu trữ các môn thể thao hiển thị
	const [currentSportIndex, setCurrentSportIndex] = useState(0);
	const sportsList = [
		'Bóng đá',
		'Bơi lội',
		'Chạy bộ',
		'Yoga',
		'Tennis',
		'Đạp xe',
		'Bóng rổ',
		'Cầu lông',
	];

	// Thay đổi môn thể thao hiển thị mỗi 2 giây
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSportIndex((prev) => (prev + 1) % sportsList.length);
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	// Animation variants cho container
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.2,
			},
		},
	};

	// Animation variants cho các phần tử con
	const itemVariants = {
		hidden: { x: -30, opacity: 0 },
		visible: {
			x: 0,
			opacity: 1,
			transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
		},
	};

	// Animation cho vòng tròn
	const circleVariants = {
		hidden: { scale: 0, opacity: 0 },
		visible: {
			scale: 1,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: 'easeOut',
				delay: 0.5,
			},
		},
	};

	// Animation cho danh sách lợi ích
	const benefitVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (index) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: 0.8 + index * 0.1,
				duration: 0.5,
				ease: 'easeOut',
			},
		}),
	};

	// Animation cho HomeButton
	const homeButtonVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delay: 1.8,
				duration: 0.5,
				type: 'spring',
				stiffness: 200,
			},
		},
	};

	// Animation cho môn thể thao
	const sportTextVariants = {
		enter: { y: 20, opacity: 0 },
		center: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.5, ease: 'easeOut' },
		},
		exit: {
			y: -20,
			opacity: 0,
			transition: { duration: 0.5, ease: 'easeIn' },
		},
	};

	// Danh sách lợi ích thành viên
	const benefits = [
		'Giao hàng miễn phí cho đơn trên 500K',
		'Ưu đãi độc quyền mỗi tháng',
		'Tích điểm đổi quà hấp dẫn',
		'Bảo hành sản phẩm dài hạn',
	];

	return (
		<div className="hidden md:block md:w-1/2 h-screen relative overflow-hidden">
			{/* Ảnh nền với hiệu ứng parallax */}
			<div className="absolute inset-0 w-full h-full">
				<img
					src={image}
					alt="Thể thao"
					className="absolute inset-0 w-full h-full object-cover filter brightness-80 transform scale-110 animate-subtle-float"
				/>
			</div>

			{/* Lớp phủ gradient */}
			<div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 opacity-75"></div>

			{/* Pattern overlay */}
			<div className="absolute inset-0 bg-grid-pattern opacity-15"></div>

			{/* Các hình trang trí */}
			<motion.div
				className="absolute top-[20%] right-[15%] w-64 h-64 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-20 blur-2xl"
				variants={circleVariants}
				initial="hidden"
				animate="visible"
			></motion.div>

			<motion.div
				className="absolute bottom-[25%] left-[10%] w-40 h-40 rounded-full bg-gradient-to-r from-blue-400 to-teal-300 opacity-20 blur-xl"
				variants={circleVariants}
				initial="hidden"
				animate="visible"
				transition={{ delay: 0.7 }}
			></motion.div>

			{/* HomeButton - Di chuyển lên trên cùng và tạo background để nổi bật */}
			<motion.div
				// className="absolute top-4 left-4 z-20"
				variants={homeButtonVariants}
				initial="hidden"
				animate="visible"
			>
				<HomeButton className="bg-white/15 hover:bg-white/25 z-20 backdrop-blur-sm transition-all duration-300 py-2 px-4 rounded-lg text-nowrap text-white border border-white/30 shadow-lg" />
			</motion.div>

			{/* Nội dung - Điều chỉnh padding và cấu trúc để ngắn gọn hơn */}
			<motion.div
				className="relative z-10 flex flex-col items-stretch justify-center w-full h-full px-12 py-16 text-white"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.h2
					variants={itemVariants}
					className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight"
				>
					Khám phá thế giới <br />
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
						thể thao không giới hạn
					</span>
				</motion.h2>

				<motion.div
					variants={itemVariants}
					className="flex items-center mb-8 h-10"
				>
					<div className="text-xl font-medium mr-3">
						Dành cho người yêu
					</div>
					<div className="h-10 overflow-hidden">
						<motion.div
							key={currentSportIndex}
							variants={sportTextVariants}
							initial="enter"
							animate="center"
							exit="exit"
							className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
						>
							{sportsList[currentSportIndex]}
						</motion.div>
					</div>
				</motion.div>

				{/* Thống kê người dùng */}
				<motion.div
					variants={itemVariants}
					className="mb-8 flex space-x-6"
				>
					<div className="flex flex-col items-center">
						<div className="text-4xl font-bold mb-1 text-white">
							<span className="inline-block animate-count-up">
								100
							</span>
							K+
						</div>
						<div className="text-sm text-indigo-200">
							Người dùng đã đăng ký
						</div>
					</div>
					<div className="w-px h-16 bg-white opacity-20"></div>
					<div className="flex flex-col items-center">
						<div className="text-4xl font-bold mb-1 text-white">
							<span className="inline-block animate-count-up">
								98
							</span>
							%
						</div>
						<div className="text-sm text-indigo-200">
							Khách hàng hài lòng
						</div>
					</div>
				</motion.div>

				{/* Danh sách lợi ích - Rút gọn khoảng cách */}
				<motion.div variants={itemVariants} className="mb-8">
					<h3 className="text-lg font-semibold mb-3 text-indigo-100">
						Đặc quyền thành viên:
					</h3>
					<ul className="space-y-2">
						{benefits.map((benefit, index) => (
							<motion.li
								key={index}
								custom={index}
								variants={benefitVariants}
								initial="hidden"
								animate="visible"
								className="flex items-center"
							>
								<svg
									className="w-5 h-5 text-green-400 mr-2 flex-shrink-0"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
								<span className="text-indigo-100 text-sm">
									{benefit}
								</span>
							</motion.li>
						))}
					</ul>
				</motion.div>

				{/* Testimonial - Thu gọn và đơn giản hóa */}
				<motion.div
					variants={itemVariants}
					className="bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-sm border border-white border-opacity-20 max-w-lg"
				>
					<div className="flex items-start">
						<div className="flex-shrink-0">
							<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-300 mr-3">
								<img
									className="w-full h-full object-cover"
									src={AthletesImage}
									alt="Đội thể thao"
								/>
							</div>
						</div>
						<div>
							<div className="flex items-center mb-1">
								{[1, 2, 3, 4, 5].map((star) => (
									<svg
										key={star}
										className="w-3 h-3 text-yellow-400"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
								))}
								<span className="ml-2 text-xs text-indigo-200">
									Đội tuyển Olympic Việt Nam
								</span>
							</div>
							<p className="italic text-indigo-100 text-sm">
								"Trang phục và thiết bị từ Sportiverse đã đồng
								hành cùng chúng tôi trong mọi giải đấu. Chất
								lượng và sự thoải mái là điều chúng tôi luôn tin
								tưởng."
							</p>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default RegisterBanner;
