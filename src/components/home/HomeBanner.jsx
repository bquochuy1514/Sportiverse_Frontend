import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Dữ liệu banner
const bannerData = [
	{
		id: 1,
		image_url: 'images/banner-1.jpg',
		title: 'Bộ sưu tập thể thao mùa hè',
		description: 'Giảm đến 30% cho tất cả sản phẩm mới',
		link_to: '/collections/summer',
		button_text: 'Khám phá ngay',
		text_color: 'white',
		overlay_style: 'gradient',
	},
	{
		id: 2,
		image_url: 'images/banner-2.jpg',
		title: 'Thiết bị thể thao chuyên nghiệp',
		description: 'Nâng cao hiệu suất với thiết bị cao cấp',
		link_to: '/category/professional-gear',
		button_text: 'Xem thiết bị',
		text_color: 'white',
		overlay_style: 'dark',
	},
	{
		id: 3,
		image_url: 'images/banner-3.jpg',
		title: 'Giày thể thao chính hãng',
		description: 'Bộ sưu tập mới nhất với nhiều mẫu độc quyền',
		link_to: '/category/shoes',
		button_text: 'Mua ngay',
		text_color: 'white',
		overlay_style: 'light',
	},
	{
		id: 4,
		image_url: 'images/banner-4.jpg',
		title: 'Giày thể thao chính hãng',
		description: 'Bộ sưu tập mới nhất với nhiều mẫu độc quyền',
		link_to: '/category/shoes',
		button_text: 'Mua ngay',
		text_color: 'white',
		overlay_style: 'light',
	},
];

const HomeBanner = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [loadedImages, setLoadedImages] = useState({});
	const [activeIndex, setActiveIndex] = useState(0);

	// Giả lập tải dữ liệu
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	// Theo dõi tải hình ảnh
	const handleImageLoad = (bannerId) => {
		setLoadedImages((prev) => ({
			...prev,
			[bannerId]: true,
		}));
	};

	// Cập nhật overlay để giảm độ mờ
	const getOverlayStyle = (style) => {
		switch (style) {
			case 'dark':
				return 'bg-black/30'; // Giảm từ /40 xuống /20
			case 'light':
				return 'bg-white/15'; // Giảm từ /20 xuống /10
			case 'gradient':
				return 'bg-gradient-to-t from-black/60 via-black/20 to-transparent'; // Giảm độ đậm
			case 'none':
				return '';
			default:
				return 'bg-black/30'; // Giảm từ /30 xuống /15
		}
	};

	// Skeleton loader
	const BannerSkeleton = () => (
		<div className="relative rounded-2xl overflow-hidden h-[550px] bg-gradient-to-r from-gray-200 to-gray-300">
			<div className="absolute inset-0 bg-shimmer"></div>
			<div className="h-full w-full flex items-center justify-center">
				<div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
			</div>
		</div>
	);

	return (
		<section className="relative">
			{isLoading ? (
				<BannerSkeleton />
			) : (
				<Swiper
					spaceBetween={0}
					centeredSlides={true}
					effect={'fade'}
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
						dynamicBullets: true,
						renderBullet: function (index, className) {
							return `<span class="${className} w-3 h-3 transition-all duration-300"></span>`;
						},
					}}
					navigation={{
						nextEl: '.swiper-button-next-custom',
						prevEl: '.swiper-button-prev-custom',
					}}
					modules={[Autoplay, Pagination, Navigation, EffectFade]}
					className="rounded-2xl overflow-hidden shadow-2xl banner-swiper"
					onSlideChange={(swiper) =>
						setActiveIndex(swiper.activeIndex)
					}
				>
					{bannerData.map((banner, index) => (
						<SwiperSlide key={banner.id} className="relative">
							<div className="relative h-[550px] overflow-hidden group">
								{/* Hình ảnh banner */}
								<div className="absolute inset-0 w-full h-full transform transition-transform duration-10000 ease-in-out group-hover:scale-105">
									<img
										src={banner.image_url}
										alt={banner.title || 'Banner thể thao'}
										className={`w-full h-full object-cover object-center transition-all duration-1000 ${
											loadedImages[banner.id]
												? 'opacity-100'
												: 'opacity-0 blur-md'
										}`}
										onLoad={() =>
											handleImageLoad(banner.id)
										}
									/>
								</div>

								{/* Overlay */}
								<div
									className={`absolute inset-0 ${getOverlayStyle(
										banner.overlay_style
									)}`}
								></div>

								{/* Nội dung banner */}
								<AnimatePresence>
									{activeIndex === index && (
										<div className="absolute inset-0 flex items-center justify-start px-8 md:px-20">
											<div
												className="max-w-2xl z-10"
												style={{
													color:
														banner.text_color ||
														'white',
												}}
											>
												<motion.h2
													initial={{
														opacity: 0,
														y: 30,
													}}
													animate={{
														opacity: 1,
														y: 0,
													}}
													exit={{
														opacity: 0,
														y: -20,
													}}
													transition={{
														duration: 0.7,
														delay: 0.2,
													}}
													className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-lg"
												>
													{banner.title}
												</motion.h2>

												{banner.description && (
													<motion.p
														initial={{
															opacity: 0,
															y: 30,
														}}
														animate={{
															opacity: 1,
															y: 0,
														}}
														exit={{ opacity: 0 }}
														transition={{
															duration: 0.7,
															delay: 0.4,
														}}
														className="text-xl md:text-2xl opacity-90 mb-10 max-w-xl font-medium drop-shadow-md"
													>
														{banner.description}
													</motion.p>
												)}

												{banner.button_text && (
													<motion.div
														initial={{
															opacity: 0,
															y: 30,
														}}
														animate={{
															opacity: 1,
															y: 0,
														}}
														exit={{ opacity: 0 }}
														transition={{
															duration: 0.7,
															delay: 0.6,
														}}
													>
														<Link
															to={
																banner.link_to ||
																'#'
															}
															className="inline-block bg-blue-600 text-white font-semibold py-4 px-10 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 hover:scale-105 active:scale-95"
														>
															{banner.button_text}
														</Link>
													</motion.div>
												)}
											</div>
										</div>
									)}
								</AnimatePresence>
							</div>
						</SwiperSlide>
					))}

					{/* Custom navigation buttons */}
					<div className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/20 rounded-full cursor-pointer hover:bg-white/40 transition-all duration-300">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-6 h-6 text-white"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 19.5L8.25 12l7.5-7.5"
							/>
						</svg>
					</div>
					<div className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/20 rounded-full cursor-pointer hover:bg-white/40 transition-all duration-300">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-6 h-6 text-white"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.25 4.5l7.5 7.5-7.5 7.5"
							/>
						</svg>
					</div>
				</Swiper>
			)}
		</section>
	);
};

export default HomeBanner;
