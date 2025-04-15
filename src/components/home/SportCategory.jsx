// src/components/home/SportCategory.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
	FaRunning,
	FaBasketballBall,
	FaSwimmer,
	FaBiking,
	FaTableTennis,
	FaGolfBall,
	FaVolleyballBall,
	FaArrowRight,
} from 'react-icons/fa';
import { GiSoccerBall, GiTennisRacket, GiBoxingGlove } from 'react-icons/gi';
import { MdSportsTennis } from 'react-icons/md';

// Map các icon thể thao
const sportIcons = {
	football: <GiSoccerBall className="text-green-600" />,
	basketball: <FaBasketballBall className="text-orange-600" />,
	running: <FaRunning className="text-blue-600" />,
	swimming: <FaSwimmer className="text-cyan-600" />,
	tennis: <MdSportsTennis className="text-yellow-600" />,
	volleyball: <FaVolleyballBall className="text-red-500" />,
	cycling: <FaBiking className="text-purple-600" />,
	boxing: <GiBoxingGlove className="text-red-600" />,
	golf: <FaGolfBall className="text-emerald-600" />,
	tabletennis: <FaTableTennis className="text-pink-600" />,
	badminton: <GiTennisRacket className="text-indigo-600" />,
};

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

	// Skeleton loader với thiết kế mới
	if (isLoading) {
		return (
			<section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
				<div className="container mx-auto px-6">
					<div className="flex justify-between items-center mb-10">
						<div className="animate-pulse bg-gray-200 h-10 w-64 rounded-lg"></div>
						<div className="animate-pulse bg-gray-200 h-8 w-32 rounded-lg"></div>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
						{[...Array(6)].map((_, index) => (
							<div
								key={index}
								className="animate-pulse bg-white rounded-2xl shadow-lg overflow-hidden"
							>
								<div className="bg-gray-200 h-40 w-full"></div>
								<div className="p-4 space-y-3">
									<div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>
									<div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
			<div className="container mx-auto px-6">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
					<div className="mb-4 md:mb-0">
						<h2 className="text-3xl font-bold text-gray-800 relative inline-block">
							<span className="relative z-10">
								Danh mục sản phẩm
							</span>
							<span className="absolute -bottom-1 left-0 w-full h-3 bg-blue-400 opacity-30 rounded-full z-0"></span>
						</h2>
						<p className="text-gray-600 mt-2 max-w-xl">
							Khám phá các môn thể thao và tìm kiếm sản phẩm phù
							hợp với đam mê của bạn
						</p>
					</div>
					<Link
						to="/categories"
						className="group flex items-center bg-white hover:bg-blue-600 text-blue-600 hover:text-white font-medium py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
					>
						<span>Xem tất cả</span>
						<FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
					</Link>
				</div>

				{/* Danh sách thể thao với grid responsive */}
				<motion.div
					className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ staggerChildren: 0.1 }}
				>
					{sports.map((sport, index) => (
						<motion.div
							key={sport.id}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							whileHover={{ y: -8, scale: 1.03 }}
							className="transform transition-all duration-300"
						>
							<Link
								to={`/sport/${sport.slug}`}
								className="block bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden h-full relative group"
							>
								{sport.iconType &&
								sportIcons[sport.iconType] ? (
									<div className="h-40 w-full flex items-center justify-center bg-gray-50 group-hover:bg-blue-50 transition-colors duration-500">
										<div className="text-6xl transform group-hover:scale-125 transition-transform duration-500">
											{sportIcons[sport.iconType]}
										</div>
									</div>
								) : (
									<div className="relative h-40 w-full overflow-hidden">
										<img
											src={sport.icon}
											alt={sport.name}
											className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
									</div>
								)}

								<div className="p-4 text-center relative">
									<h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
										{sport.name}
									</h3>
									<span className="text-sm text-gray-500 mt-1 block group-hover:text-blue-400 transition-colors duration-300">
										Khám phá ngay
									</span>

									{/* Hiệu ứng gạch chân khi hover */}
									<div className="absolute bottom-0 left-0 right-0 mx-auto w-0 group-hover:w-2/3 h-0.5 bg-blue-500 transition-all duration-300"></div>

									{/* Badge số lượng sản phẩm (tùy chọn - nếu API có trả về) */}
									{sport.productCount && (
										<div className="absolute -top-3 -right-3 bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded-full shadow-md transform scale-0 group-hover:scale-100 transition-transform duration-300">
											{sport.productCount}+
										</div>
									)}
								</div>
							</Link>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default SportCategory;
