// src/components/products/ProductList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { BiCheckCircle } from 'react-icons/bi';
import { TbTruckDelivery } from 'react-icons/tb';

const ProductList = ({ products, isLoading }) => {
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
		);
	}

	return (
		<motion.div
			className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ staggerChildren: 0.1 }}
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
							product.stock_quantity <= 0 ? 'opacity-75' : ''
						}`}
					>
						{/* Product Image */}
						<div className="relative overflow-hidden">
							<Link
								to={`/product/${product.slug}`}
								className="block"
							>
								<img
									src={product.images[0].image_path}
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
						</div>

						{/* Product Info - Compact */}
						<div className="p-3 flex-grow flex flex-col">
							{/* Category with better style */}
							<div className="flex justify-between items-start">
								<Link to={`/category/${product.category.slug}`}>
									<span className="text-xs text-blue-600 font-medium bg-blue-50 px-1.5 py-0.5 rounded-sm hover:bg-blue-100 transition-colors">
										{`${product.sport.name} - ${product.category.name}`}
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
												{formatPrice(product.price)}
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
										<div className="text-xxs text-gray-500">
											&nbsp;
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
	);
};

export default ProductList;
