// src/components/home/FeaturedProducts.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import ProductCard from '../../components/common/products/ProductCard';

const FeaturedProducts = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchFeaturedProducts = async () => {
			setIsLoading(true);
			try {
				const response = await fetch('/api/featured-products?limit=25');
				const data = await response.json();
				setProducts(data.data);
			} catch (error) {
				console.error('Error fetching featured products:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchFeaturedProducts();
	}, []);

	// Product skeleton loader
	if (isLoading) {
		return (
			<section className="py-16 bg-gradient-to-br from-blue-50/50 to-white">
				<div className="w-fit mx-auto px-4">
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

	return (
		<section className="py-8 relative overflow-hidden">
			<div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 relative">
					{/* Thêm decoration background */}
					<div className="absolute -left-6 top-0 w-16 h-16 bg-blue-100 rounded-full opacity-50 blur-2xl"></div>
					<div className="absolute right-20 bottom-0 w-12 h-12 bg-indigo-100 rounded-full opacity-40 blur-xl"></div>

					<div className="mb-4 md:mb-0 relative z-10">
						<div className="flex items-center mb-2">
							<div className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-2"></div>
							<h2 className="text-2xl font-bold text-gray-800 relative">
								<span className="relative z-10 bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
									Sản phẩm nổi bật
								</span>
								<span className="absolute -bottom-1 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-70 rounded-full z-0 transform transition-all duration-300"></span>
							</h2>
						</div>
						<p className="text-sm text-gray-600 mt-2 max-w-xl pl-3.5 border-l-2 border-blue-100">
							Khám phá những sản phẩm chất lượng cao và được yêu
							thích nhất của chúng tôi
						</p>
					</div>

					<Link
						to="/products"
						className="group relative z-10 flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium py-2.5 px-5 rounded-full shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5"
					>
						<span>Xem tất cả</span>
						<FaArrowRight className="ml-2 text-xs group-hover:translate-x-1.5 transition-transform duration-300" />
						<span className="absolute inset-0 rounded-full bg-white opacity-20 group-hover:opacity-0 transition-opacity duration-300"></span>
					</Link>
				</div>

				{/* Danh sách sản phẩm */}
				<motion.div
					className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ staggerChildren: 0.1 }}
				>
					{products.map((product, index) => (
						<ProductCard
							key={product.id}
							product={product}
							index={index}
						/>
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

export default FeaturedProducts;
