import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDescription from '../../../../pages/admin/ProductManagement/ProductDescription';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
	FaShoppingCart,
	FaTruck,
	FaBoxOpen,
	FaWarehouse,
	FaArrowLeft,
	FaHeart,
	FaShareAlt,
	FaStar,
	FaRegStar,
	FaChevronLeft,
	FaChevronRight,
} from 'react-icons/fa';
import { MdLocalOffer, MdSecurity } from 'react-icons/md';
import { TbTruckReturn } from 'react-icons/tb';
import { RiShieldCheckLine } from 'react-icons/ri';
import ProductImageGallery from './ProductImageGallery';

const ProductDetail = () => {
	const { slug } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [isWishlist, setIsWishlist] = useState(false);

	useEffect(() => {
		const fetchProduct = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(`/api/products/${slug}`);
				const data = await response.json();
				if (data.status) {
					setProduct(data.data);
				} else {
					setError('Sản phẩm không tồn tại');
				}
			} catch (err) {
				setError('Lỗi khi tải sản phẩm');
				console.error('Error fetching product:', err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProduct();
	}, [slug]);

	const formatPrice = (price) => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price);
	};

	const calculateDiscountPercentage = (original, sale) => {
		if (!original || !sale || original <= 0) return 0;
		return Math.round(((original - sale) / original) * 100);
	};

	const handleIncreaseQuantity = () => {
		if (product && quantity < product.stock_quantity) {
			setQuantity(quantity + 1);
		}
	};

	const handleDecreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	const toggleWishlist = () => {
		setIsWishlist(!isWishlist);
	};

	// Skeleton loading component
	if (isLoading) {
		return (
			<div className="max-w-screen-xl mx-auto px-4 py-8">
				<div className="h-8 w-32 bg-gray-200 rounded-md animate-pulse mb-6"></div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="animate-pulse bg-gray-200 h-80 w-full rounded-lg"></div>
					<div className="space-y-4">
						<div className="animate-pulse bg-gray-200 h-10 w-3/4 rounded-md"></div>
						<div className="flex gap-3">
							<div className="animate-pulse bg-gray-200 h-6 w-20 rounded-full"></div>
							<div className="animate-pulse bg-gray-200 h-6 w-20 rounded-full"></div>
						</div>
						<div className="animate-pulse bg-gray-200 h-8 w-32 rounded-md"></div>
						<div className="animate-pulse bg-gray-200 h-6 w-full rounded-md"></div>
						<div className="animate-pulse bg-gray-200 h-10 w-40 rounded-md"></div>
						<div className="animate-pulse bg-gray-200 h-10 w-56 rounded-lg"></div>
					</div>
				</div>
			</div>
		);
	}

	// Error state
	if (error || !product) {
		return (
			<div className="max-w-screen-xl mx-auto px-4 py-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="bg-white p-6 rounded-xl shadow-md text-center max-w-md mx-auto"
				>
					<div className="text-red-500 text-4xl mb-3 flex justify-center">
						<FaBoxOpen />
					</div>
					<h2 className="text-xl font-bold text-gray-800 mb-3">
						{error || 'Sản phẩm không tồn tại'}
					</h2>
					<p className="text-gray-600 mb-4">
						Rất tiếc, chúng tôi không thể tìm thấy sản phẩm mà bạn
						đang tìm kiếm.
					</p>
					<button
						onClick={handleGoBack}
						className="px-4 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center mx-auto"
					>
						<FaArrowLeft className="mr-2" /> Quay lại
					</button>
				</motion.div>
			</div>
		);
	}

	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6 }}
			className="py-8 bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 min-h-screen"
		>
			<div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Back button with animation */}
				<motion.button
					onClick={handleGoBack}
					whileHover={{ x: -5 }}
					whileTap={{ scale: 0.95 }}
					className="group inline-flex items-center text-blue-600 hover:text-blue-800 my-4 transition-colors"
				>
					<motion.span
						initial={{ x: 0 }}
						whileHover={{ x: -4 }}
						className="mr-2"
					>
						<FaArrowLeft className="h-5 w-5" />
					</motion.span>
					<span className="font-medium text-xl">Quay lại</span>
				</motion.button>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Hình ảnh sản phẩm */}
					<ProductImageGallery
						images={product.images}
						productName={product.name}
						discountPercentage={calculateDiscountPercentage(
							product.price,
							product.sale_price
						)}
						hasDiscount={product.sale_price > 0}
					/>

					{/* Thông tin sản phẩm - Đã thêm nền và cải thiện CSS (nhỏ gọn hơn) */}
					<motion.div
						initial={{ x: 30, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="flex flex-col gap-4 bg-white rounded-xl shadow-md p-5 border border-blue-100"
					>
						{/* Product name with wishlist button */}
						<div className="flex justify-between items-start bg-blue-50 p-3 rounded-lg">
							<h1 className="text-2xl font-bold text-gray-800 leading-tight">
								{product.name}
							</h1>
							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={toggleWishlist}
								className={`p-2 rounded-full ${
									isWishlist
										? 'bg-red-100 text-red-500'
										: 'bg-white text-gray-500'
								} shadow-sm`}
							>
								<FaHeart
									className={isWishlist ? 'fill-current' : ''}
									size={18}
								/>
							</motion.button>
						</div>

						{/* Đánh giá và danh mục trên cùng một hàng - ĐIỀU CHỈNH THÀNH BOX LIỀN NHAU */}
						<div className="bg-blue-50 p-2 rounded-lg">
							<div className="flex flex-wrap items-center">
								{/* Rating */}
								<div className="flex items-center mr-4 bg-white px-2 py-1 rounded-lg shadow-sm">
									<div className="flex text-yellow-400">
										{[1, 2, 3, 4, 5].map((star) =>
											star <= 4 ? (
												<FaStar key={star} size={14} />
											) : (
												<FaRegStar
													key={star}
													size={14}
												/>
											)
										)}
									</div>
									<span className="text-xs text-gray-500 ml-1 font-medium">
										(120)
									</span>
								</div>

								{/* Danh mục */}
								<div className="flex flex-wrap space-x-2">
									<span className="text-xs text-blue-700 font-medium bg-white px-2 py-1 rounded-full shadow-sm">
										{product.sport.name}
									</span>
									<span className="text-xs text-indigo-700 font-medium bg-white px-2 py-1 rounded-full shadow-sm">
										{product.category.name}
									</span>
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="text-gray-600 bg-white p-1 rounded-full shadow-sm ml-auto"
									>
										<FaShareAlt size={12} />
									</motion.button>
								</div>
							</div>
						</div>

						{/* Giá với animation và background - ĐIỀU CHỈNH KHOẢNG CÁCH */}
						<div className="bg-blue-50 p-3 rounded-lg">
							<div className="flex items-center gap-2">
								{product.sale_price > 0 ? (
									<>
										<span className="text-2xl font-bold text-blue-700 bg-white px-3 py-1.5 rounded-lg shadow-sm">
											{formatPrice(product.sale_price)}
										</span>
										<span className="text-sm text-gray-500 line-through bg-white px-2 py-1 rounded-lg">
											{formatPrice(product.price)}
										</span>
										<span className="ml-auto text-white bg-red-500 px-2 py-1 rounded-full text-xs font-bold shadow-sm flex items-center">
											<MdLocalOffer
												className="mr-1"
												size={12}
											/>
											{calculateDiscountPercentage(
												product.price,
												product.sale_price
											)}
											%
										</span>
									</>
								) : (
									<span className="text-2xl font-bold text-blue-700 bg-white px-3 py-1.5 rounded-lg shadow-sm">
										{formatPrice(product.price)}
									</span>
								)}
							</div>
						</div>

						{/* Trạng thái tồn kho và shipping trong một hàng */}
						<div className="grid grid-cols-2 gap-3">
							<div className="bg-gray-50 p-2.5 rounded-lg flex items-center">
								{product.stock_quantity > 0 ? (
									product.stock_quantity < 20 ? (
										<motion.span
											whileHover={{ scale: 1.05 }}
											className="text-xs text-amber-700 font-medium bg-amber-100 px-2 py-1 rounded-full flex items-center shadow-sm"
										>
											<FaBoxOpen
												className="mr-1"
												size={10}
											/>{' '}
											Sắp hết ({product.stock_quantity})
										</motion.span>
									) : (
										<motion.span
											whileHover={{ scale: 1.05 }}
											className="text-xs text-green-700 font-medium bg-green-100 px-2 py-1 rounded-full flex items-center shadow-sm"
										>
											<FaWarehouse
												className="mr-1"
												size={10}
											/>{' '}
											Còn hàng
										</motion.span>
									)
								) : (
									<motion.span
										whileHover={{ scale: 1.05 }}
										className="text-xs text-gray-600 font-medium bg-gray-200 px-2 py-1 rounded-full flex items-center shadow-sm"
									>
										<FaBoxOpen className="mr-1" size={10} />{' '}
										Tạm hết hàng
									</motion.span>
								)}
							</div>

							{product.free_shipping && (
								<div className="bg-gray-50 p-2.5 rounded-lg flex items-center">
									<motion.span
										whileHover={{ scale: 1.05 }}
										className="text-xs text-blue-700 font-medium bg-blue-100 px-2 py-1 rounded-full flex items-center shadow-sm"
									>
										<FaTruck className="mr-1" size={10} />{' '}
										Miễn phí vận chuyển
									</motion.span>
								</div>
							)}
						</div>

						{/* Shipping & Returns Highlights */}
						<div className="grid grid-cols-2 gap-3">
							<div className="flex items-center gap-1.5 bg-sky-50 p-2.5 rounded-lg border border-sky-100 shadow-sm">
								<TbTruckReturn className="text-blue-600 text-lg" />
								<span className="text-xs text-gray-700 font-medium">
									Đổi trả trong 30 ngày
								</span>
							</div>
							<div className="flex items-center gap-1.5 bg-sky-50 p-2.5 rounded-lg border border-sky-100 shadow-sm">
								<RiShieldCheckLine className="text-blue-600 text-lg" />
								<span className="text-xs text-gray-700 font-medium">
									Bảo hành chính hãng
								</span>
							</div>
						</div>

						{/* Số lượng và nút thêm vào giỏ hàng trên cùng một hàng */}
						{product.stock_quantity > 0 && (
							<div className="grid grid-cols-3 gap-3 mt-1">
								<div className="flex items-center bg-gray-50 p-2.5 rounded-lg col-span-1">
									<div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm w-full">
										<motion.button
											whileHover={{
												backgroundColor: '#e6f5ff',
											}}
											whileTap={{ scale: 0.9 }}
											onClick={handleDecreaseQuantity}
											className="px-2 py-1 bg-blue-50 text-blue-600 font-bold transition-colors"
										>
											-
										</motion.button>
										<span className="px-3 py-1 text-center w-full font-medium bg-white text-sm">
											{quantity}
										</span>
										<motion.button
											whileHover={{
												backgroundColor: '#e6f5ff',
											}}
											whileTap={{ scale: 0.9 }}
											onClick={handleIncreaseQuantity}
											className="px-2 py-1 bg-blue-50 text-blue-600 font-bold transition-colors"
										>
											+
										</motion.button>
									</div>
								</div>

								{product.stock_quantity > 0 ? (
									<motion.button
										whileHover={{
											scale: 1.02,
											boxShadow:
												'0 10px 25px -5px rgba(59, 130, 246, 0.5)',
										}}
										whileTap={{ scale: 0.98 }}
										className="col-span-2 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium flex items-center justify-center shadow-md"
									>
										<motion.span
											animate={{
												scale: [1, 1.2, 1],
												rotate: [0, -5, 5, 0],
												transition: {
													repeat: Infinity,
													repeatDelay: 8,
													duration: 0.5,
												},
											}}
											className="mr-2"
										>
											<FaShoppingCart size={16} />
										</motion.span>
										<span>Thêm vào giỏ hàng</span>
									</motion.button>
								) : (
									<button
										disabled
										className="col-span-2 py-2.5 px-4 bg-gray-200 text-gray-500 rounded-lg font-medium flex items-center justify-center cursor-not-allowed"
									>
										<FaShoppingCart
											className="mr-2"
											size={16}
										/>{' '}
										Tạm hết hàng
									</button>
								)}
							</div>
						)}
					</motion.div>
				</div>

				{/* Mô tả sản phẩm */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.5 }}
					className="mt-8 bg-white rounded-xl shadow-md p-5"
				>
					<h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
						<span className="bg-blue-100 text-blue-600 p-1.5 rounded-md mr-2">
							<FaBoxOpen />
						</span>
						Mô tả sản phẩm
					</h2>
					<div className="prose max-w-none text-gray-600">
						<ProductDescription description={product.description} />
					</div>
				</motion.div>
			</div>
		</motion.section>
	);
};

export default ProductDetail;
