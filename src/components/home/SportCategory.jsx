// src/components/home/SportCategory.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const SportCategory = () => {
	const [sports, setSports] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchSports = async () => {
			setIsLoading(true);
			try {
				const response = await fetch('/api/sports');
				const data = await response.json();
				setSports(data.data);
			} catch (error) {
				console.error('Error fetching sports:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchSports();
	}, []);

	// Compact Skeleton loader
	if (isLoading) {
		return (
			<section className="py-12">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
						{[...Array(6)].map((_, index) => (
							<div
								key={index}
								className="animate-pulse bg-white rounded-xl shadow-md overflow-hidden"
							>
								<div className="bg-blue-100 h-28 w-full"></div>
								<div className="p-3 space-y-2">
									<div className="h-4 bg-blue-50 rounded w-3/4 mx-auto"></div>
									<div className="h-3 bg-blue-50 rounded w-1/2 mx-auto"></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	return (
		<>
			{/* Phần danh mục thể thao */}
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
										Danh mục thể thao
									</span>
									<span className="absolute -bottom-1 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-70 rounded-full z-0 transform transition-all duration-300"></span>
								</h2>
							</div>
							<p className="text-sm text-gray-600 mt-2 max-w-xl pl-3.5 border-l-2 border-blue-100">
								Khám phá các môn thể thao và tìm kiếm sản phẩm
								phù hợp với đam mê của bạn
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

					{/* Danh sách thể thao với grid responsive */}
					<motion.div
						className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ staggerChildren: 0.1 }}
					>
						{sports.map((sport, index) => (
							<motion.div
								key={sport.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.4,
									delay: index * 0.1,
								}}
								whileHover={{ y: -6, scale: 1.05 }}
								className="transform transition-all duration-300"
							>
								<Link
									to={`/sports/${sport.slug}`}
									className="block bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden relative group"
								>
									<div className="relative h-40 w-full overflow-hidden">
										<img
											src={sport.icon}
											alt={sport.name}
											className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
									</div>

									<div className="p-3 text-center relative">
										<h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
											{sport.name}
										</h3>
										<span className="text-xs text-gray-500 mt-0.5 block group-hover:text-blue-400 transition-colors duration-300">
											Khám phá ngay
										</span>

										{/* Hiệu ứng gạch chân khi hover */}
										<div className="absolute bottom-1 left-0 right-0 mx-auto w-0 group-hover:w-2/3 h-0.5 bg-blue-500 transition-all duration-300"></div>
									</div>

									{/* Hover effect overlay */}
									<div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-xl pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
								</Link>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>
		</>
	);
};

export default SportCategory;
