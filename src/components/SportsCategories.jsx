import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import {
	FaFire,
	FaRunning,
	FaBasketballBall,
	FaFootballBall,
	FaSwimmer,
	FaBiking,
	FaStore,
} from 'react-icons/fa';
import SportsCategoryDropdown from './SportsCategoryDropdown';
import { Link } from 'react-router-dom';

// Array of sport icons to display
const sportIcons = {
	running: FaRunning,
	basketball: FaBasketballBall,
	football: FaFootballBall,
	swimming: FaSwimmer,
	cycling: FaBiking,
};

// Sử dụng forwardRef để nhận ref từ component cha
const SportsCategories = forwardRef(({ headerHeight }, ref) => {
	const [sports, setSports] = useState([]);
	const [categories, setCategories] = useState([]);
	const [activeSportId, setActiveSportId] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingCategories, setIsLoadingCategories] = useState(false);
	const [error, setError] = useState(null);

	const navRef = useRef(null);
	const activeSport = sports.find((sport) => sport.id === activeSportId);

	// Expose hàm handleCloseDropdown qua ref
	const closeDropdown = () => {
		setActiveSportId(null);
	};

	// Truyền phương thức closeDropdown ra ngoài thông qua ref
	// để component cha có thể đóng dropdown khi cần
	useEffect(() => {
		if (ref) {
			// Kiểm tra xem ref có tồn tại không
			if (typeof ref === 'function') {
				ref({ closeDropdown });
			} else {
				ref.current = { closeDropdown };
			}
		}
	}, [ref]);

	useEffect(() => {
		const fetchSports = async () => {
			try {
				setIsLoading(true);
				const response = await fetch('/api/sports');
				if (!response.ok) throw new Error('Failed to fetch sports');
				const data = await response.json();
				setSports(data.data || []);
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};
		fetchSports();
	}, []);

	useEffect(() => {
		if (!activeSportId) return;
		const fetchCategories = async () => {
			try {
				setIsLoadingCategories(true);
				const response = await fetch(
					`/api/categories?sport_id=${activeSportId}&parent_id=`
				);
				if (!response.ok) throw new Error('Failed to fetch categories');
				const data = await response.json();
				setCategories(data.data || []);
			} catch (err) {
				console.error('Error fetching categories:', err);
				setCategories([]);
			} finally {
				setIsLoadingCategories(false);
			}
		};
		fetchCategories();
	}, [activeSportId]);

	const handleSportClick = (sportId) => {
		setActiveSportId(sportId === activeSportId ? null : sportId);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				activeSportId &&
				!event.target.closest('.sports-navbar') &&
				!event.target.closest('.dropdown-content') &&
				!event.target.closest('header')
			) {
				setActiveSportId(null);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, [activeSportId]);

	// Function to get sport icon
	const getSportIcon = (sportName) => {
		const sportKey = sportName.toLowerCase();
		for (const [key, Icon] of Object.entries(sportIcons)) {
			if (sportKey.includes(key)) {
				return Icon;
			}
		}
		return null;
	};

	if (isLoading) {
		return (
			<div className="border-t border-b border-gray-200 bg-white shadow-sm">
				<div className="container mx-auto">
					<div className="flex justify-center py-3">
						<div className="animate-pulse flex space-x-8">
							{[1, 2, 3, 4, 5].map((item) => (
								<div
									key={item}
									className="flex items-center space-x-2"
								>
									<div className="rounded-full bg-gray-200 h-6 w-6"></div>
									<div className="h-4 bg-gray-200 rounded w-16"></div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="border-t border-b border-gray-200 bg-white">
				<div className="container mx-auto">
					<div className="text-center py-3 text-red-500">
						Error: {error}
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<nav
				ref={navRef}
				className="border-t border-b border-gray-200 bg-white shadow-sm sticky top-0 z-20 sports-navbar"
			>
				<div className="container mx-auto">
					<ul className="flex items-center justify-center h-12">
						{sports.map((sport) => {
							// Try to get an icon for the sport
							const SportIcon = getSportIcon(sport.name);

							return (
								<li
									key={sport.id}
									className="relative h-full mx-2"
								>
									<div
										className={`group flex items-center h-full cursor-pointer transition-all duration-300 relative px-3`}
										onClick={() =>
											handleSportClick(sport.id)
										}
									>
										{/* Sport item container with styling */}
										<div
											className={`absolute inset-0 rounded-lg ${
												activeSportId === sport.id
													? 'bg-blue-50'
													: 'bg-transparent group-hover:bg-gray-50'
											} transition-colors duration-300`}
										></div>

										{/* Icon */}
										{SportIcon && (
											<SportIcon
												className={`mr-1.5 transition-colors duration-300 ${
													activeSportId === sport.id
														? 'text-blue-600'
														: 'text-gray-500 group-hover:text-blue-500'
												}`}
												size={16}
											/>
										)}

										{/* Name */}
										<span
											className={`text-sm font-medium uppercase tracking-wide relative z-10 ${
												activeSportId === sport.id
													? 'text-blue-600 font-semibold'
													: 'text-gray-700 group-hover:text-blue-600'
											} transition-colors duration-300`}
										>
											{sport.name}
										</span>

										{/* Dropdown icon */}
										<FiChevronDown
											className={`ml-1 -mr-2 transition-all duration-300 ${
												activeSportId === sport.id
													? 'transform rotate-180 text-blue-600'
													: 'text-gray-500 group-hover:text-blue-500'
											}`}
											size={16}
										/>

										{/* Active indicator - Fixed straight line */}
										<div
											className={`absolute bottom-0 left-0 w-full h-[2px] transition-opacity duration-300 ${
												activeSportId === sport.id
													? 'opacity-100 bg-blue-600'
													: 'opacity-0 group-hover:opacity-50 bg-blue-400'
											}`}
										></div>
									</div>
								</li>
							);
						})}

						{/* All products */}
						<li className="relative h-full mx-2">
							<Link to="/products" className="relative h-full">
								<div className="relative flex items-center h-full cursor-pointer px-4">
									{/* Container with hot red background */}
									<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg opacity-10"></div>

									{/* Fire icon */}
									<FaStore
										className="text-blue-600 mr-1.5"
										size={14}
									/>

									{/* Text with fixed styling */}
									<span className="font-bold text-sm text-blue-600 uppercase">
										Tất cả sản phẩm
									</span>

									{/* Animated dot effect */}
									<span className="absolute -top-1 -right-1 flex h-2 w-2">
										<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
										<span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
									</span>
								</div>
							</Link>
						</li>

						{/* HOT SALE item */}
						<li className="relative h-full mx-2">
							<Link to="hot-sale" className="relative h-full">
								<div className="relative flex items-center h-full cursor-pointer px-4">
									{/* Container with hot red background */}
									<div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-lg opacity-10"></div>

									{/* Fire icon */}
									<FaFire
										className="text-red-600 mr-1.5"
										size={14}
									/>

									{/* Text with fixed styling */}
									<span className="font-bold text-sm text-red-600 uppercase">
										HOT SALE
									</span>

									{/* Animated dot effect */}
									<span className="absolute -top-1 -right-1 flex h-2 w-2">
										<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
										<span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
									</span>
								</div>
							</Link>
						</li>
					</ul>
				</div>
			</nav>

			{/* Chỉ render SportsCategoryDropdown khi activeSportId có giá trị */}
			{activeSportId !== null && (
				<div className="dropdown-content">
					<SportsCategoryDropdown
						key={activeSportId}
						activeSport={activeSport}
						categories={categories}
						isLoading={isLoadingCategories}
						headerHeight={headerHeight}
						onClose={closeDropdown}
					/>
				</div>
			)}
		</>
	);
});

export default SportsCategories;
