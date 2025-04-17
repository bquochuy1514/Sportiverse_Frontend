import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
	FaSwimmer,
	FaBasketballBall,
	FaVolleyballBall,
	FaDumbbell,
	FaArrowRight,
	FaChevronLeft,
	FaChevronRight,
	FaShoppingBag,
	FaStar,
	FaShoppingCart,
} from 'react-icons/fa';
import { GiSoccerBall, GiShuttlecock } from 'react-icons/gi';
import { IoFlash } from 'react-icons/io5';

// Dữ liệu các môn thể thao đã cập nhật
const sportsData = [
	{
		id: '1',
		name: 'Bóng đá',
		icon: <GiSoccerBall />,
		color: 'from-green-500 to-green-600',
		textColor: 'text-green-500',
		bgGradient: 'from-green-500/10 to-green-600/5',
		image: '/images/sports/soccer-banner.jpg',
		title: 'Bộ sưu tập bóng đá chuyên nghiệp',
		description:
			'Trang bị như một nhà vô địch với dòng sản phẩm bóng đá cao cấp, từ giày chiến đấu đến đồng phục đội tuyển chính hãng và phụ kiện bảo vệ chuyên dụng.',
		linkTo: '/sports/bong-da',
	},
	{
		id: '2',
		name: 'Bóng rổ',
		icon: <FaBasketballBall />,
		color: 'from-orange-500 to-orange-600',
		textColor: 'text-orange-500',
		bgGradient: 'from-orange-500/10 to-orange-600/5',
		image: '/images/sports/basketball-banner.jpg',
		title: 'Trang bị bóng rổ đỉnh cao',
		description:
			'Từ giày bóng rổ đến áo đấu NBA chính hãng, nâng cao phong độ với trang bị bóng rổ đẳng cấp thế giới và các phụ kiện được thiết kế cho sân trong nhà và ngoài trời.',
		linkTo: '/sports/bong-ro',
	},
	{
		id: '3',
		name: 'Cầu lông',
		icon: <GiShuttlecock />,
		color: 'from-purple-500 to-purple-600',
		textColor: 'text-purple-500',
		bgGradient: 'from-purple-500/10 to-purple-600/5',
		image: '/images/sports/badminton-banner.jpg',
		title: 'Thiết bị cầu lông chuyên nghiệp',
		description:
			'Nâng cao trình độ với bộ sưu tập vợt cầu lông cao cấp, giày chuyên dụng và phụ kiện đỉnh cao được thiết kế cho cả người mới bắt đầu và vận động viên chuyên nghiệp.',
		linkTo: '/sports/cau-long',
	},
	{
		id: '6',
		name: 'Bóng chuyền',
		icon: <FaVolleyballBall />,
		color: 'from-red-500 to-red-600',
		textColor: 'text-red-500',
		bgGradient: 'from-red-500/10 to-red-600/5',
		image: '/images/sports/volleyball-banner.jpg',
		title: 'Dụng cụ bóng chuyền chuyên nghiệp',
		description:
			'Chinh phục mọi trận đấu với dòng sản phẩm bóng chuyền chuyên nghiệp, từ giày có độ bám tối ưu đến đồng phục và bảo vệ đầu gối chất lượng cao cho cả sân trong nhà và bãi biển.',
		linkTo: '/sports/bong-chuyen',
	},
	{
		id: '5',
		name: 'Bơi lội',
		icon: <FaSwimmer />,
		color: 'from-cyan-500 to-cyan-600',
		textColor: 'text-cyan-500',
		bgGradient: 'from-cyan-500/10 to-cyan-600/5',
		image: '/images/sports/swimming-banner.jpg',
		title: 'Bơi lội chuyên nghiệp',
		description:
			'Trang phục bơi cao cấp với khả năng giảm lực cản nước, kính bơi công nghệ chống mờ và phụ kiện bơi lội đỉnh cao giúp cải thiện thành tích và thoải mái khi tập luyện.',
		linkTo: '/sports/boi-loi',
	},
	{
		id: '4',
		name: 'Gym',
		icon: <FaDumbbell />,
		color: 'from-blue-500 to-blue-600',
		textColor: 'text-blue-500',
		bgGradient: 'from-blue-500/10 to-blue-600/5',
		image: '/images/sports/gym-banner.jpg',
		title: 'Thiết bị tập gym & fitness',
		description:
			'Dụng cụ tập luyện cao cấp từ quần áo thoáng khí đến phụ kiện hỗ trợ nâng tạ, găng tay và thiết bị theo dõi hiệu suất giúp bạn đạt mục tiêu tập luyện một cách hiệu quả.',
		linkTo: '/sports/gym',
	},
];

const HomeBanner = () => {
	const [activeSport, setActiveSport] = useState(sportsData[0]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [imagesLoaded, setImagesLoaded] = useState({});
	const [isPaused, setIsPaused] = useState(false);
	const [progress, setProgress] = useState(0);
	const [featuredProduct, setFeaturedProduct] = useState(null);
	const [isFetchingProduct, setIsFetchingProduct] = useState(false);
	const bannerRef = useRef(null);
	const contentControls = useAnimation();
	const featuredProductControls = useAnimation();

	// Fetch sản phẩm nổi bật dựa trên sport hiện tại
	const fetchFeaturedProduct = useCallback(async (sportId) => {
		if (!sportId) return;

		setIsFetchingProduct(true);
		try {
			const response = await fetch(
				`/api/featured-products?limit=1&sport_id=${sportId}`
			);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			if (data.data && data.data.length > 0) {
				setFeaturedProduct(data.data[0]);
			} else {
				setFeaturedProduct(null);
			}
		} catch (error) {
			console.error('Error fetching featured product:', error);
			setFeaturedProduct(null);
		} finally {
			setIsFetchingProduct(false);
		}
	}, []);

	// Chức năng chuyển sang sport tiếp theo
	const goToNextSport = useCallback(() => {
		setActiveIndex((prevIndex) => {
			const nextIndex = (prevIndex + 1) % sportsData.length;
			const nextSport = sportsData[nextIndex];
			setActiveSport(nextSport);
			fetchFeaturedProduct(nextSport.id);
			return nextIndex;
		});
		setProgress(0);
	}, [fetchFeaturedProduct]);

	// Chức năng chuyển sang sport trước đó
	const goToPrevSport = useCallback(() => {
		setActiveIndex((prevIndex) => {
			const prevIdx =
				prevIndex === 0 ? sportsData.length - 1 : prevIndex - 1;
			const prevSport = sportsData[prevIdx];
			setActiveSport(prevSport);
			fetchFeaturedProduct(prevSport.id);
			return prevIdx;
		});
		setProgress(0);
	}, [fetchFeaturedProduct]);

	// Giả lập tải dữ liệu và fetch sản phẩm đầu tiên
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
			fetchFeaturedProduct(sportsData[0].id);
		}, 1000);
		return () => clearTimeout(timer);
	}, [fetchFeaturedProduct]);

	// Thiết lập autoplay
	useEffect(() => {
		if (isLoading || isPaused) return;

		const autoplayInterval = 6000; // 6 giây cho mỗi slide
		const progressInterval = 10; // Cập nhật progress bar mỗi 10ms
		const progressIncrement = (progressInterval / autoplayInterval) * 100;

		// Timer cho thanh progress
		const progressTimer = setInterval(() => {
			setProgress((prev) => {
				const newProgress = prev + progressIncrement;
				return newProgress > 100 ? 0 : newProgress;
			});
		}, progressInterval);

		// Timer chính cho autoplay
		const timer = setTimeout(goToNextSport, autoplayInterval);

		return () => {
			clearTimeout(timer);
			clearInterval(progressTimer);
		};
	}, [activeIndex, isLoading, isPaused, goToNextSport]);

	// Chức năng theo dõi tải hình ảnh
	const handleImageLoad = (sportId) => {
		setImagesLoaded((prev) => ({
			...prev,
			[sportId]: true,
		}));
	};

	// Xử lý khi user tương tác với banner
	const handleSportClick = (index) => {
		const selectedSport = sportsData[index];
		setActiveIndex(index);
		setActiveSport(selectedSport);
		fetchFeaturedProduct(selectedSport.id);
		setProgress(0);
	};

	// Format giá cả
	const formatPrice = (price) => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price);
	};

	// Tính % giảm giá
	const calculateDiscountPercentage = (original, sale) => {
		if (!original || !sale || original <= 0) return 0;
		return Math.round(((original - sale) / original) * 100);
	};

	// Animations on sport change
	useEffect(() => {
		const sequence = async () => {
			await contentControls.start({
				opacity: 0,
				y: 20,
				transition: { duration: 0.2 },
			});
			await contentControls.start({
				opacity: 1,
				y: 0,
				transition: { duration: 0.5, staggerChildren: 0.1 },
			});

			await featuredProductControls.start({
				opacity: 0,
				x: 50,
				scale: 0.9,
				transition: { duration: 0.2 },
			});
			await featuredProductControls.start({
				opacity: 1,
				x: 0,
				scale: 1,
				transition: {
					duration: 0.5,
					type: 'spring',
					stiffness: 200,
					damping: 20,
				},
			});
		};

		sequence();
	}, [activeSport, contentControls, featuredProductControls]);

	// Skeleton loader
	const BannerSkeleton = () => (
		<div className="relative rounded-2xl overflow-hidden h-[450px] bg-gradient-to-r from-gray-100 to-gray-200">
			<div className="absolute inset-0 bg-shimmer"></div>
			<div className="h-full w-full flex items-center justify-center">
				<div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
			</div>
		</div>
	);

	// Product showcase skeleton loader
	const ProductSkeleton = () => (
		<div className="hidden lg:block relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl max-w-xs">
			<div className="flex flex-col items-center text-center">
				<div className="bg-white/10 h-4 w-24 rounded-full mb-2"></div>
				<div className="bg-white/10 h-6 w-40 rounded-lg mb-4"></div>

				<div className="h-48 w-48 relative mb-4">
					<div className="absolute inset-0 rounded-full bg-white/5 animate-pulse"></div>
				</div>

				<div className="flex flex-wrap gap-2 justify-center mb-4">
					<div className="bg-white/10 h-4 w-12 rounded-full"></div>
					<div className="bg-white/10 h-4 w-16 rounded-full"></div>
				</div>

				<div className="bg-white/10 h-8 w-full rounded-lg"></div>
			</div>
		</div>
	);

	return (
		<section className="relative">
			{isLoading ? (
				<BannerSkeleton />
			) : (
				<div
					ref={bannerRef}
					className="relative overflow-hidden shadow-xl bg-gradient-to-br from-gray-800 to-gray-700"
					onMouseEnter={() => setIsPaused(true)}
					onMouseLeave={() => setIsPaused(false)}
				>
					{/* Progress bar */}
					<div className="absolute top-0 left-0 right-0 z-30 h-1.5 bg-gray-800/50">
						<motion.div
							className={`h-full ${activeSport.color}`}
							style={{ width: `${progress}%` }}
							transition={{ ease: 'linear' }}
						/>
					</div>

					{/* Sports Navigation Bar */}
					<div className="absolute top-6 left-0 right-0 z-20 px-4 py-3">
						<div className="flex justify-center items-center bg-black/30 backdrop-blur-xl rounded-full p-1.5 max-w-2xl mx-auto shadow-lg border border-white/10">
							{sportsData.map((sport, index) => (
								<motion.button
									key={sport.id}
									onClick={() => handleSportClick(index)}
									className={`relative flex items-center space-x-1.5 px-3 py-2 rounded-full mx-0.5 transition-all ${
										activeIndex === index
											? `bg-gradient-to-r ${sport.color} text-white shadow-lg`
											: 'text-white/80 hover:text-white hover:bg-white/10'
									}`}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<span className="text-lg">
										{sport.icon}
									</span>
									<span className="font-medium text-sm hidden md:block">
										{sport.name}
									</span>

									{activeIndex === index && (
										<motion.div
											className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30 rounded-full mx-2"
											layoutId="sportIndicator"
										/>
									)}
								</motion.button>
							))}
						</div>
					</div>

					{/* Background Images with Transitions */}
					<div
						className="relative overflow-hidden"
						style={{ height: 'calc(100vh - 80px)' }}
					>
						<AnimatePresence mode="wait">
							<motion.div
								key={activeSport.id}
								initial={{ opacity: 0, scale: 1.1 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.7 }}
								className="absolute inset-0 w-full h-full"
							>
								{/* Image background with advanced effects */}
								<div className="absolute inset-0 w-full h-full">
									{/* Overlay gradient - GIẢM ĐỘ MỜ */}
									<div
										className={`absolute inset-0 bg-gradient-to-r ${activeSport.bgGradient} mix-blend-multiply opacity-60`}
									></div>

									{/* Main banner image */}
									<img
										src={activeSport.image}
										alt={activeSport.name}
										className={`w-full h-full object-cover object-bottom transition-all duration-1000 ${
											imagesLoaded[activeSport.id]
												? 'opacity-100 scale-105 brightness-80'
												: 'opacity-0 blur-md'
										}`}
										onLoad={() =>
											handleImageLoad(activeSport.id)
										}
									/>

									{/* Enhanced overlay with radial gradient - GIẢM ĐỘ MỜ */}
									<div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/20"></div>

									{/* Subtle pattern overlay */}
									<div className="absolute inset-0 bg-[url('/images/pattern-dot.png')] opacity-5"></div>

									{/* Light beam effect */}
									<div
										className={`absolute top-0 -right-40 w-96 h-[150%] bg-gradient-to-b ${activeSport.color} opacity-20 rotate-30 transform-gpu blur-3xl`}
									></div>
								</div>

								{/* Main Content Area */}
								<div className="absolute inset-0 flex items-center justify-between px-6 md:px-16 pt-14">
									{/* Left content - text and buttons */}
									<motion.div
										className="max-w-xl z-10 text-white"
										animate={contentControls}
									>
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												duration: 0.5,
												delay: 0.2,
											}}
											className={`inline-flex items-center space-x-1.5 ${activeSport.textColor} bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-5 font-semibold text-sm border border-white/10 shadow-xl`}
										>
											<span className="text-base">
												{activeSport.icon}
											</span>
											<span>{activeSport.name}</span>
										</motion.div>

										<motion.h2
											initial={{ opacity: 0, y: 30 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												duration: 0.6,
												delay: 0.3,
											}}
											className="text-3xl md:text-5xl font-extrabold mb-5 leading-tight tracking-tight drop-shadow-lg"
										>
											{activeSport.title}
										</motion.h2>

										<motion.p
											initial={{ opacity: 0, y: 30 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												duration: 0.6,
												delay: 0.4,
											}}
											className="text-base md:text-lg opacity-90 mb-8 max-w-lg drop-shadow-md line-clamp-3"
										>
											{activeSport.description}
										</motion.p>

										<motion.div
											initial={{ opacity: 0, y: 30 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												duration: 0.6,
												delay: 0.5,
											}}
											className="flex flex-col sm:flex-row sm:items-center gap-4"
										>
											<Link
												to={activeSport.linkTo}
												className={`inline-flex items-center justify-center bg-gradient-to-r ${activeSport.color} text-white font-semibold py-3.5 px-8 rounded-full hover:shadow-lg hover:shadow-${activeSport.id}-500/30 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-sm`}
											>
												Khám phá {activeSport.name}
												<FaArrowRight className="ml-2" />
											</Link>

											<Link
												to={`/product-category/${activeSport.id}`}
												className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white font-semibold py-3.5 px-8 rounded-full hover:bg-white/20 border border-white/10 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-sm"
											>
												<FaShoppingBag className="mr-2" />
												Xem tất cả sản phẩm
											</Link>
										</motion.div>

										{/* Advanced features section */}
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												delay: 0.7,
												duration: 0.5,
											}}
											className="mt-8 grid grid-cols-2 gap-3 max-w-md"
										>
											<div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/5">
												<IoFlash
													className={`text-xl ${activeSport.textColor}`}
												/>
												<span className="text-sm font-medium">
													Giao hàng nhanh 24h
												</span>
											</div>
											<div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/5">
												<FaStar
													className={`text-xl ${activeSport.textColor}`}
												/>
												<span className="text-sm font-medium">
													Bảo hành chính hãng
												</span>
											</div>
										</motion.div>
									</motion.div>

									{/* Right content - Featured product showcase from API */}
									{isFetchingProduct ? (
										<ProductSkeleton />
									) : featuredProduct ? (
										<motion.div
											animate={featuredProductControls}
											className="hidden lg:block relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl max-w-xs"
										>
											{featuredProduct.sale_price > 0 && (
												<div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
													GIẢM{' '}
													{calculateDiscountPercentage(
														featuredProduct.price,
														featuredProduct.sale_price
													)}
													%
												</div>
											)}

											<div className="flex flex-col items-center text-center">
												<div className="text-white/80 text-sm font-medium mb-1">
													Sản phẩm nổi bật
												</div>
												<h3 className="text-white font-bold mb-4">
													{featuredProduct.name}
												</h3>

												<div className="h-48 w-48 relative mb-4">
													<div
														className={`absolute inset-0 rounded-full bg-gradient-to-br ${activeSport.color} opacity-20 blur-xl`}
													></div>
													<img
														src={
															featuredProduct.images &&
															featuredProduct
																.images[0]
																? featuredProduct
																		.images[0]
																		.image_path
																: '/images/placeholder-product.png'
														}
														alt={
															featuredProduct.name
														}
														className="object-contain h-full w-full relative z-10"
													/>
												</div>

												<div className="flex flex-wrap gap-2 justify-center mb-4">
													{featuredProduct.is_featured && (
														<span className="bg-amber-500/80 text-white text-xs px-2 py-1 rounded-full">
															Nổi bật
														</span>
													)}
													{featuredProduct.free_shipping && (
														<span className="bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full">
															Free Ship
														</span>
													)}
													{featuredProduct.stock_quantity &&
														featuredProduct.stock_quantity <
															20 && (
															<span className="bg-red-500/80 text-white text-xs px-2 py-1 rounded-full">
																Sắp hết hàng
															</span>
														)}
												</div>

												<div className="w-full mb-4">
													{featuredProduct.sale_price >
													0 ? (
														<div className="flex items-center justify-center">
															<span className="text-white font-bold text-lg">
																{formatPrice(
																	featuredProduct.sale_price
																)}
															</span>
															<span className="ml-2 text-white/60 line-through text-sm">
																{formatPrice(
																	featuredProduct.price
																)}
															</span>
														</div>
													) : (
														<div className="text-white font-bold text-lg">
															{formatPrice(
																featuredProduct.price
															)}
														</div>
													)}
												</div>

												<div className="flex w-full gap-2">
													<Link
														to={`/product/${featuredProduct.slug}`}
														className={`inline-flex items-center justify-center flex-1 bg-gradient-to-r ${activeSport.color} text-white font-semibold py-2.5 px-4 rounded-lg text-sm hover:shadow-lg transition-all duration-300`}
													>
														Xem chi tiết
													</Link>
												</div>
											</div>
										</motion.div>
									) : (
										<div className="hidden lg:flex items-center justify-center h-64 w-64 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
											<div className="text-white/70 text-center p-6">
												<FaShoppingBag className="text-3xl mx-auto mb-3 opacity-50" />
												<p>
													Chưa có sản phẩm nổi bật cho
													danh mục này
												</p>
											</div>
										</div>
									)}
								</div>
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Navigation Controls - Side arrows */}
					<button
						onClick={goToPrevSport}
						className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 transition-all hover:scale-110"
						aria-label="Previous sport"
					>
						<FaChevronLeft />
					</button>
					<button
						onClick={goToNextSport}
						className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 transition-all hover:scale-110"
						aria-label="Next sport"
					>
						<FaChevronRight />
					</button>

					{/* Bottom Indicators */}
					<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-20">
						{sportsData.map((sport, index) => (
							<button
								key={sport.id}
								onClick={() => handleSportClick(index)}
								className="focus:outline-none"
								aria-label={`Chuyển đến ${sport.name}`}
							>
								<motion.div
									className={`w-2 h-2 rounded-full transition-all duration-300 ${
										activeIndex === index
											? `bg-gradient-to-r ${sport.color} w-8`
											: 'bg-white/30'
									}`}
									animate={{
										scale:
											activeIndex === index
												? [1, 1.2, 1]
												: 1,
									}}
									transition={{
										repeat:
											activeIndex === index
												? Infinity
												: 0,
										duration: 2,
									}}
								/>
							</button>
						))}
					</div>
				</div>
			)}
		</section>
	);
};

export default HomeBanner;
