// src/components/SportsCategories.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';

const SportsCategories = () => {
	// State để lưu danh sách môn thể thao
	const [sports, setSports] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [activeCategory, setActiveCategory] = useState(null);

	// Ref để theo dõi phần tử dropdown
	const dropdownRef = useRef(null);

	// Gọi API để lấy danh sách môn thể thao
	useEffect(() => {
		const fetchSports = async () => {
			try {
				setLoading(true);
				const response = await fetch('/api/sports');
				if (!response.ok) {
					throw new Error('Không thể lấy danh sách môn thể thao');
				}
				const data = await response.json();

				setSports(data.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchSports();
	}, []);

	// Xử lý khi click vào danh mục
	const handleCategoryClick = (sportId) => {
		// Nếu danh mục đã active, click lại sẽ đóng dropdown
		// Nếu không, mở dropdown của danh mục được click
		setActiveCategory(activeCategory === sportId ? null : sportId);
	};

	// Đóng dropdown khi click ra ngoài
	useEffect(() => {
		const handleClickOutside = (event) => {
			console.log(event.target);
			console.log(dropdownRef.current);
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setActiveCategory(null);
			}
		};

		// Thêm sự kiện click vào document
		document.addEventListener('mousedown', handleClickOutside);

		// Cleanup sự kiện khi component unmount
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Xử lý trạng thái loading
	if (loading) {
		return (
			<div className="border-t border-b border-gray-200 bg-white shadow-sm">
				<div className="container mx-auto">
					<div className="flex justify-center py-3">
						<div className="animate-pulse flex space-x-8">
							{[1, 2, 3, 4, 5, 6].map((item) => (
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

	// Xử lý trạng thái lỗi
	if (error) {
		return (
			<div className="border-t border-b border-gray-200 bg-white">
				<div className="container mx-auto">
					<div className="text-center py-3 text-red-500 font-medium">
						Lỗi: {error}
					</div>
				</div>
			</div>
		);
	}

	return (
		<nav
			className="border-t border-b border-gray-200 bg-white shadow-sm sticky top-0 z-40"
			ref={dropdownRef}
		>
			<div className="container mx-auto">
				<ul className="flex items-center justify-center h-14">
					{sports.map((sport) => (
						<li key={sport.id} className="relative h-full px-5">
							<div
								className={`flex items-center h-full transition-all duration-200 cursor-pointer ${
									activeCategory === sport.id
										? 'text-blue-600'
										: 'text-gray-700 hover:text-blue-600'
								}`}
								onClick={() => handleCategoryClick(sport.id)}
							>
								{/* Icon môn thể thao với hiệu ứng */}
								<div className="relative w-6 h-6 mr-2 overflow-hidden">
									<img
										src={sport.icon}
										className={`absolute inset-0 w-full h-full object-contain transition-all duration-300 ${
											activeCategory === sport.id
												? 'opacity-100 transform scale-110 filter brightness-110'
												: 'opacity-90 hover:opacity-100 hover:scale-105'
										}`}
										alt={`${sport.name} icon`}
									/>
								</div>

								{/* Tên thể thao */}
								<span
									className={`font-medium text-sm uppercase tracking-wide transition-all duration-200 ${
										activeCategory === sport.id
											? 'font-semibold'
											: ''
									}`}
								>
									{sport.name}
								</span>

								{/* Icon mũi tên với hiệu ứng */}
								<FiChevronDown
									className={`ml-1.5 transition-transform duration-300 ${
										activeCategory === sport.id
											? 'transform rotate-180 text-blue-600'
											: 'text-gray-500 hover:text-blue-600'
									}`}
									size={16}
								/>

								{/* Đường viền dưới khi active */}
								<span
									className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform transition-transform duration-300 ${
										activeCategory === sport.id
											? 'scale-x-100'
											: 'scale-x-0'
									}`}
								></span>
							</div>

							{/* Dropdown menu */}
							{activeCategory === sport.id && (
								<div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-b-lg border border-gray-200 border-t-0 z-50 animate-fadeIn">
									<ul className="py-2">
										{/* Các mục trong dropdown (dữ liệu mẫu) */}
										<li>
											<Link
												to={`/sports/${sport.slug}/subcategory1`}
												className="block px-5 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-sm font-medium"
												onClick={() =>
													setActiveCategory(null)
												} // Đóng dropdown khi click vào mục
											>
												Danh mục con 1
											</Link>
										</li>
										<li>
											<Link
												to={`/sports/${sport.slug}/subcategory2`}
												className="block px-5 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-sm font-medium"
												onClick={() =>
													setActiveCategory(null)
												} // Đóng dropdown khi click vào mục
											>
												Danh mục con 2
											</Link>
										</li>
										<li>
											<Link
												to={`/sports/${sport.slug}/subcategory3`}
												className="block px-5 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-sm font-medium"
												onClick={() =>
													setActiveCategory(null)
												} // Đóng dropdown khi click vào mục
											>
												Danh mục con 3
											</Link>
										</li>
									</ul>
								</div>
							)}
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default SportsCategories;
