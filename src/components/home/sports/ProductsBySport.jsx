// src/components/home/ProductsBySport.jsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaShoppingCart, FaHeart, FaArrowRight, FaStar } from 'react-icons/fa';
import { BiCheckCircle } from 'react-icons/bi';
import { TbTruckDelivery } from 'react-icons/tb';

const ProductsBySport = () => {
	const { slug } = useParams();
	const [products, setProducts] = useState([]);
	const [sport, setSport] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProductsBySport = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await fetch(
					`/api/products-categories/${slug}`
				);
				const data = await response.json();
				console.log(data.products.data[0].sport);
				if (data.success) {
					setProducts(data.products.data || []);
					setSport(data.products.data[0].sport || null);
				} else {
					setError(data.message || 'Không thể tải sản phẩm');
				}
			} catch (error) {
				console.error('Error fetching products by sport:', error);
				setError('Đã xảy ra lỗi khi tải sản phẩm');
			} finally {
				setIsLoading(false);
			}
		};

		if (slug) {
			fetchProductsBySport();
		}
	}, [slug]);

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

	// Product skeleton loader
	if (isLoading) {
		return (
			<section className="py-16 bg-gradient-to-br from-blue-50/50 to-white">
				<div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center mb-8">
						<div className="animate-pulse bg-gray-200 h-8 w-48 rounded-lg"></div>
						<div className="animate-pulse bg-gray-200 h-8 w-28 rounded-lg"></div>
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{[...Array(10)].map((_, index) => (
							<div
								key={index}
								className="animate-pulse bg-white rounded-lg shadow-sm overflow-hidden"
							>
								<div className="bg-gray-200 h-40 w-full"></div>
								<div className="p-3 space-y-2">
									<div className="h-3 bg-gray-200 rounded w-3/4"></div>
									<div className="h-4 bg-gray-200 rounded w-1/2"></div>
									<div className="h-3 bg-gray-200 rounded w-full"></div>
									<div className="h-8 bg-gray-200 rounded"></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	// Error state
	if (error) {
		return (
			<section className="py-16 bg-gradient-to-br from-blue-50/50 to-white">
				<div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="bg-white p-8 rounded-lg shadow-sm">
						<h2 className="text-2xl font-bold text-gray-800 mb-4">
							Không thể tải sản phẩm
						</h2>
						<p className="text-gray-600 mb-6">{error}</p>
						<Link
							to="/products"
							className="inline-flex items-center bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-full shadow-sm hover:bg-blue-600 transition-all duration-300"
						>
							<span>Xem tất cả sản phẩm</span>
							<FaArrowRight className="ml-2 text-xs" />
						</Link>
					</div>
				</div>
			</section>
		);
	}

	// Empty state
	if (products.length === 0) {
		return (
			<section className="py-16 bg-gradient-to-br from-blue-50/50 to-white">
				<div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="bg-white p-8 rounded-lg shadow-sm">
						<h2 className="text-2xl font-bold text-gray-800 mb-4">
							{sport
								? `Không có sản phẩm cho môn ${sport.name}`
								: 'Không có sản phẩm'}
						</h2>
						<p className="text-gray-600 mb-6">
							Hiện tại chưa có sản phẩm nào trong danh mục này.
						</p>
						<Link
							to="/products"
							className="inline-flex items-center bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-full shadow-sm hover:bg-blue-600 transition-all duration-300"
						>
							<span>Xem tất cả sản phẩm</span>
							<FaArrowRight className="ml-2 text-xs" />
						</Link>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-12 relative overflow-hidden">
			<div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
					<div className="mb-4 md:mb-0">
						<h2 className="text-2xl font-bold text-gray-800 relative inline-block">
							<span className="relative z-10">
								{sport
									? `Sản phẩm ${sport.name}`
									: 'Sản phẩm thể thao'}
							</span>
							<span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500 opacity-30 rounded-full z-0"></span>
						</h2>
						<p className="text-sm text-gray-600 mt-2 max-w-xl">
							{sport?.description ||
								'Khám phá những sản phẩm chất lượng cao và được yêu thích nhất của chúng tôi'}
						</p>
					</div>
					<Link
						to="/products"
						className="group flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium py-2 px-4 rounded-full shadow-sm hover:shadow hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
					>
						<span>Xem tất cả sản phẩm</span>
						<FaArrowRight className="ml-2 text-xs group-hover:translate-x-1 transition-transform duration-300" />
					</Link>
				</div>

				{/* Danh sách sản phẩm */}
				<motion.div
					className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					{products.map((product, index) => (
						<motion.div
							key={product.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: index * 0.05 }}
							className="transform transition-all duration-300 hover:-translate-y-1"
						>
							<div
								className={`bg-white rounded-lg shadow-sm hover:shadow overflow-hidden group h-full flex flex-col ${
									product.stock_quantity <= 0
										? 'opacity-75'
										: ''
								}`}
							>
								{/* Product Image */}
								<div className="relative overflow-hidden">
									<Link
										to={`/product/${product.slug}`}
										className="block"
									>
										<img
											src={
												product.images &&
												product.images.length > 0
													? product.images[0]
															.image_path
													: '/images/product-placeholder.jpg'
											}
											alt={product.name}
											className={`w-full h-40 object-contain object-center transform group-hover:scale-110 transition-transform duration-500 ${
												product.stock_quantity <= 0
													? 'grayscale opacity-75'
													: ''
											}`}
										/>
									</Link>

									{/* Badges in top-left */}
									<div className="absolute top-2 left-2 flex flex-col gap-1">
										{product.sale_price > 0 && (
											<div className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-sm inline-flex items-center justify-center">
												Giảm{' '}
												{calculateDiscountPercentage(
													product.price,
													product.sale_price
												)}
												%
											</div>
										)}
										{/* Nổi bật Badge */}
										{product.is_featured && (
											<div className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-sm inline-flex items-center justify-center">
												<FaStar className="mr-0.5 w-2.5 h-2.5" />
												Nổi bật
											</div>
										)}
									</div>

									{/* Heart icon */}
									<button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 text-gray-600 hover:text-red-500 hover:bg-white transition-all z-10 hover:scale-105">
										<FaHeart className="w-3.5 h-3.5" />
									</button>
								</div>

								{/* Product Info - Compact */}
								<div className="p-3 flex-grow flex flex-col">
									{/* Category with better style */}
									<div className="flex justify-between items-start">
										<Link
											to={`/category/${
												product.category?.slug || '#'
											}`}
										>
											<span className="text-xs text-blue-600 font-medium bg-blue-50 px-1.5 py-0.5 rounded-sm hover:bg-blue-100 transition-colors">
												{product.sport?.name &&
												product.category?.name
													? `${product.sport.name} - ${product.category.name}`
													: 'Danh mục'}
											</span>
										</Link>
									</div>

									{/* Title */}
									<Link
										to={`/product/${product.slug}`}
										className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 mt-1.5 mb-auto group-hover:text-blue-600"
									>
										{product.name}
										{product.is_featured && (
											<span className="inline-flex items-center ml-1 text-amber-500">
												<FaStar className="w-2.5 h-2.5" />
											</span>
										)}
									</Link>

									{/* Price */}
									<div className="mt-2">
										<div className="flex items-center">
											{product.sale_price > 0 ? (
												<>
													<span className="text-blue-600 font-bold text-sm">
														{formatPrice(
															product.sale_price
														)}
													</span>
													<span className="ml-1.5 text-gray-400 text-xs line-through">
														{formatPrice(
															product.price
														)}
													</span>
												</>
											) : (
												<span className="text-blue-600 font-bold text-sm">
													{formatPrice(product.price)}
												</span>
											)}
										</div>

										<div className="flex items-center justify-between mt-2">
											{/* Stock status badge */}
											{product.stock_quantity > 0 ? (
												product.stock_quantity < 20 ? (
													<div className="text-xxs text-amber-700 font-medium bg-amber-50 px-1.5 py-0.5 rounded-sm">
														Sắp hết
													</div>
												) : (
													<div className="text-xxs text-green-700 font-medium bg-green-50 px-1.5 py-0.5 rounded-sm flex items-center">
														<BiCheckCircle className="mr-0.5 w-2.5 h-2.5" />
														<span>Còn hàng</span>
													</div>
												)
											) : (
												<div className="text-xxs text-gray-500 font-medium bg-gray-50 px-1.5 py-0.5 rounded-sm">
													Hết hàng
												</div>
											)}

											{/* Free shipping badge */}
											{product.free_shipping && (
												<div className="text-xxs text-blue-700 font-medium bg-blue-50 px-1.5 py-0.5 rounded-sm flex items-center">
													<TbTruckDelivery className="mr-0.5 w-2.5 h-2.5" />
													<span>Free</span>
												</div>
											)}
										</div>

										{/* Add to cart button */}
										{product.stock_quantity > 0 ? (
											<button className="w-full mt-2 py-1.5 px-3 bg-blue-500 text-white text-xs rounded-md font-medium flex items-center justify-center hover:bg-blue-600 transition-colors">
												<FaShoppingCart className="mr-1.5 w-3 h-3" />
												Thêm vào giỏ
											</button>
										) : (
											<div className="w-full mt-2 py-1.5 px-3 bg-gray-100 text-gray-500 text-xs rounded-md font-medium flex items-center justify-center border border-gray-200">
												Tạm hết hàng
											</div>
										)}
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* Background dots pattern with animation */}
				<div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
					<div className="w-3 h-3 rounded-full bg-blue-500 absolute top-20 right-20 animate-pulse"></div>
					<div
						className="w-2 h-2 rounded-full bg-blue-500 absolute top-40 right-40 animate-pulse"
						style={{ animationDelay: '0.5s' }}
					></div>
					<div
						className="w-2.5 h-2.5 rounded-full bg-blue-500 absolute bottom-20 left-20 animate-pulse"
						style={{ animationDelay: '1s' }}
					></div>
					<div
						className="w-1.5 h-1.5 rounded-full bg-blue-500 absolute bottom-40 left-40 animate-pulse"
						style={{ animationDelay: '1.5s' }}
					></div>
				</div>
			</div>
		</section>
	);
};

export default ProductsBySport;
