// src/components/CategoryDropdown.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FiChevronRight } from 'react-icons/fi';
import image from '../assets/images/banner-sport.jpg';

const CategoryDropdown = ({ sportId, children, isOpen, setOpenDropdownId }) => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [sportName, setSportName] = useState('');
	const [activeCategory, setActiveCategory] = useState(null);
	const [subCategories, setSubCategories] = useState([]);
	const [loadingSubCategories, setLoadingSubCategories] = useState(false);
	const dropdownRef = useRef(null);
	const buttonRef = useRef(null);
	const headerHeight = useRef(0);
	const headerRef = useRef(null);

	useEffect(() => {
		// Lấy tham chiếu đến header
		headerRef.current = document.querySelector('header');
		if (headerRef.current) {
			headerHeight.current = headerRef.current.offsetHeight;
		}

		const fetchCategories = async () => {
			setLoading(true);
			try {
				// Fetch categories
				const response = await fetch(
					`/api/categories?sport_id=${sportId}&parent_id=`
				);
				if (!response.ok) {
					throw new Error('Không thể tải danh mục');
				}
				const data = await response.json();
				setCategories(data.data);

				// Fetch sport name
				const sportResponse = await fetch(`/api/sports/${sportId}`);
				if (sportResponse.ok) {
					const sportData = await sportResponse.json();
					setSportName(sportData.data.name);
				}

				setLoading(false);
			} catch (err) {
				setError(err.message || 'Không thể tải danh mục');
				setLoading(false);
			}
		};

		fetchCategories();
	}, [sportId]);

	// Fetch danh mục con khi hover vào danh mục cha
	useEffect(() => {
		if (!activeCategory) {
			setSubCategories([]);
			return;
		}

		const fetchSubCategories = async () => {
			setLoadingSubCategories(true);
			try {
				const response = await fetch(
					`/api/categories?parent_id=${activeCategory.id}`
				);
				if (!response.ok) {
					throw new Error('Không thể tải danh mục con');
				}
				const data = await response.json();
				setSubCategories(data.data || []);
				setLoadingSubCategories(false);
			} catch (err) {
				console.error('Error fetching subcategories:', err);
				setSubCategories([]);
				setLoadingSubCategories(false);
			}
		};

		fetchSubCategories();
	}, [activeCategory]);

	// Đóng dropdown khi nhấp ra ngoài - nhưng không đóng khi click vào header
	useEffect(() => {
		const handleClickOutside = (event) => {
			// Kiểm tra xem click có nằm trong dropdown hoặc trong header không
			const isInDropdown =
				dropdownRef.current &&
				dropdownRef.current.contains(event.target);
			const isInHeader =
				headerRef.current && headerRef.current.contains(event.target);
			const isInSportsNav = event.target.closest('nav'); // Kiểm tra xem click có nằm trong thanh nav sports không

			// Chỉ đóng dropdown nếu click không nằm trong dropdown, không nằm trong header,
			// và không nằm trong thanh nav sports
			if (!isInDropdown && !isInHeader && !isInSportsNav) {
				setOpenDropdownId(null);
			}
		};

		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isOpen, setOpenDropdownId]);

	const toggleDropdown = () => {
		if (isOpen) {
			setOpenDropdownId(null); // Đóng dropdown hiện tại
		} else {
			setOpenDropdownId(sportId); // Mở dropdown của danh mục này
		}
	};

	const handleCategoryHover = (category) => {
		setActiveCategory(category);
	};

	return (
		<div className="relative" ref={dropdownRef}>
			{/* Nút để mở/đóng dropdown */}
			<div ref={buttonRef} onClick={toggleDropdown}>
				{children}
			</div>

			{/* Dropdown */}
			{isOpen && (
				<>
					{/* Overlay nền mờ - chỉ phủ phần dưới header và nav */}
					<div
						className="fixed inset-x-0 bottom-0 bg-black bg-opacity-30 z-30"
						style={{
							top: headerHeight.current,
						}}
						onClick={(e) => {
							e.stopPropagation();
							setOpenDropdownId(null);
						}}
					/>

					{/* Nội dung dropdown */}
					<div
						className="fixed left-1/2 mt-5 transform -translate-x-1/2 w-full max-w-screen-xl bg-white shadow-2xl rounded-3xl z-40 overflow-hidden"
						style={{
							top: buttonRef.current
								? buttonRef.current.getBoundingClientRect()
										.bottom + window.scrollY
								: 0,
						}}
					>
						{/* Tiêu đề và nút xem tất cả */}
						<div className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
							<div className="flex items-center">
								<h3 className="text-xl font-semibold text-gray-800">
									{sportName || 'PHỤ KIỆN THỂ THAO'}
								</h3>
								<span className="mx-3 text-gray-400">|</span>
								<Link
									to={`/sport/${sportId}`}
									className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
									onClick={() => setOpenDropdownId(null)}
								>
									Xem tất cả
									<FiChevronRight className="ml-1" />
								</Link>
							</div>
							<button
								onClick={() => setOpenDropdownId(null)}
								className="text-gray-500 hover:text-gray-700"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									></path>
								</svg>
							</button>
						</div>

						<div className="flex">
							{/* Bên trái: Danh sách danh mục */}
							<div className="w-1/4 bg-gray-50 py-4 min-h-[400px] max-h-[600px] overflow-y-auto">
								{loading ? (
									<div className="px-6 py-4 text-gray-500">
										<div className="animate-pulse flex space-x-4">
											<div className="flex-1 space-y-4 py-1">
												<div className="h-4 bg-gray-200 rounded w-3/4"></div>
												<div className="h-4 bg-gray-200 rounded w-5/6"></div>
												<div className="h-4 bg-gray-200 rounded w-4/6"></div>
											</div>
										</div>
									</div>
								) : error ? (
									<div className="px-6 py-4 text-red-500">
										{error}
									</div>
								) : categories.length === 0 ? (
									<div className="px-6 py-4 text-gray-500">
										Không có danh mục
									</div>
								) : (
									<ul className="space-y-1">
										{categories.map((category) => (
											<li key={category.id}>
												<div
													className={`flex items-center justify-between px-6 py-3 cursor-pointer transition-colors duration-150 ${
														activeCategory?.id ===
														category.id
															? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500 pl-5'
															: 'text-gray-700 hover:bg-gray-100'
													}`}
													onMouseEnter={() =>
														handleCategoryHover(
															category
														)
													}
												>
													<span className="font-medium">
														{category.name}
													</span>
													<MdKeyboardArrowRight
														className={`text-xl ${
															activeCategory?.id ===
															category.id
																? 'text-blue-500'
																: 'text-gray-400'
														}`}
													/>
												</div>
											</li>
										))}
									</ul>
								)}
							</div>

							{/* Giữa: Danh mục con */}
							<div className="w-1/4 border-r border-gray-200 py-4 min-h-[400px] max-h-[600px] overflow-y-auto">
								{!activeCategory ? (
									<div className="px-6 py-8 text-center text-gray-500">
										<svg
											className="w-12 h-12 mx-auto text-gray-300 mb-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M4 6h16M4 12h16M4 18h7"
											></path>
										</svg>
										<p>Vui lòng chọn danh mục</p>
									</div>
								) : loadingSubCategories ? (
									<div className="px-6 py-4">
										<div className="animate-pulse flex space-x-4">
											<div className="flex-1 space-y-4 py-1">
												<div className="h-4 bg-gray-200 rounded w-3/4"></div>
												<div className="h-4 bg-gray-200 rounded w-5/6"></div>
												<div className="h-4 bg-gray-200 rounded w-4/6"></div>
											</div>
										</div>
									</div>
								) : subCategories.length === 0 ? (
									<div className="px-6 py-4 text-gray-500">
										Không có danh mục con
									</div>
								) : (
									<>
										<h4 className="px-6 font-semibold text-gray-800 mb-3">
											{activeCategory.name}
										</h4>
										<ul className="space-y-1">
											{subCategories.map(
												(subCategory) => (
													<li key={subCategory.id}>
														<Link
															to={`/category/${subCategory.slug}`}
															className="block px-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-150"
															onClick={() =>
																setOpenDropdownId(
																	null
																)
															}
														>
															{subCategory.name}
														</Link>
													</li>
												)
											)}
										</ul>
									</>
								)}
							</div>

							{/* Bên phải: Hình ảnh quảng bá */}
							<div className="w-2/4 p-6">
								<div className="grid grid-cols-2 gap-6 h-full">
									{/* Hình ảnh khuyến mãi 1 */}
									<div className="overflow-hidden rounded-lg shadow-md group">
										<div className="relative overflow-hidden">
											<img
												src={image}
												alt="Khuyến mãi"
												className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
											<div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
												<button className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition-colors duration-300">
													Xem ngay
												</button>
											</div>
										</div>
										<div className="p-4 bg-white">
											<h4 className="font-medium text-red-600">
												DEAL HOT
											</h4>
											<p className="text-sm text-gray-600 mt-1">
												Giảm giá lên đến 50%
											</p>
										</div>
									</div>

									{/* Hình ảnh khuyến mãi 2 */}
									<div className="overflow-hidden rounded-lg shadow-md group">
										<div className="relative overflow-hidden">
											<img
												src={image}
												alt="Sản phẩm mới"
												className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
											<div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
												<button className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition-colors duration-300">
													Khám phá
												</button>
											</div>
										</div>
										<div className="p-4 bg-white">
											<h4 className="font-medium text-blue-600">
												SẢN PHẨM MỚI
											</h4>
											<p className="text-sm text-gray-600 mt-1">
												Bộ sưu tập mới nhất
											</p>
										</div>
									</div>

									{/* Hình ảnh khuyến mãi toàn màn hình */}
									<div className="col-span-2 mt-2">
										<div className="overflow-hidden rounded-lg shadow-md">
											<div className="relative">
												<img
													src={image}
													alt="Banner khuyến mãi"
													className="w-full h-32 object-cover"
												/>
												<div className="absolute inset-0 flex items-center">
													<div className="px-6">
														<h3 className="text-white text-xl font-bold mb-2 drop-shadow-md">
															Siêu sale tháng 4
														</h3>
														<button className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-1 rounded-full text-sm font-medium transition-colors duration-300 shadow-md">
															Mua ngay
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default CategoryDropdown;
