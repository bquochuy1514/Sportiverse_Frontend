import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import SportsCategoryDropdown from './SportsCategoryDropdown';

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

	// Thêm ref để export phương thức
	React.useImperativeHandle(ref, () => ({
		closeDropdown,
	}));

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
		if (!activeSportId) {
			setCategories([]);
			return;
		}

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
				className="border-t border-b border-gray-200 bg-white shadow-sm sticky top-0 z-10 sports-navbar"
			>
				<div className="container mx-auto">
					<ul className="flex items-center justify-center h-12">
						{sports.map((sport) => (
							<li key={sport.id} className="relative h-full px-4">
								<div
									className={`flex items-center h-full cursor-pointer ${
										activeSportId === sport.id
											? 'text-blue-600'
											: 'text-gray-700 hover:text-blue-600'
									}`}
									onClick={() => handleSportClick(sport.id)}
								>
									<img
										src={sport.icon}
										className={`w-5 h-5 mr-1.5 transition-all ${
											activeSportId === sport.id
												? 'brightness-110'
												: 'opacity-90'
										}`}
										alt={sport.name}
									/>
									<span
										className={`text-sm font-medium uppercase ${
											activeSportId === sport.id
												? 'font-semibold'
												: ''
										}`}
									>
										{sport.name}
									</span>
									<FiChevronDown
										className={`ml-1 transition-transform ${
											activeSportId === sport.id
												? 'transform rotate-180 text-blue-600'
												: 'text-gray-500'
										}`}
										size={16}
									/>
									<span
										className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transition-transform ${
											activeSportId === sport.id
												? 'scale-x-100'
												: 'scale-x-0'
										}`}
									></span>
								</div>
							</li>
						))}
					</ul>
				</div>
			</nav>
			{/* Sử dụng điều kiện rendering để loại bỏ hoàn toàn khỏi DOM khi không hiển thị */}
			{activeSportId && activeSport ? (
				<SportsCategoryDropdown
					activeSport={activeSport}
					categories={categories}
					isLoading={isLoadingCategories}
					headerHeight={headerHeight}
					onClose={closeDropdown}
				/>
			) : null}
		</>
	);
});

// Thêm displayName để tránh cảnh báo khi sử dụng forwardRef
SportsCategories.displayName = 'SportsCategories';

export default SportsCategories;
