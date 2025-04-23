import React, { useState } from 'react';
import {
	FiFilter,
	FiChevronDown,
	FiChevronUp,
	FiSearch,
	FiTrash2,
	FiCheck,
	FiDollarSign,
	FiLayers,
	FiActivity,
} from 'react-icons/fi';

const ProductFilter = ({
	filters,
	setFilters,
	categories,
	sports,
	applyFilters,
}) => {
	// State cho các phần có thể mở/đóng
	const [expandedSections, setExpandedSections] = useState({
		categories: true,
		sports: true,
		price: true,
	});

	// State cho tìm kiếm danh mục
	const [categorySearch, setCategorySearch] = useState('');
	const [sportSearch, setSportSearch] = useState('');

	// Xử lý toggle section
	const toggleSection = (section) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	// Xử lý thay đổi danh mục
	const handleCategoryChange = (categoryId) => {
		setFilters((prev) => {
			const categories = prev.categories.includes(categoryId)
				? prev.categories.filter((id) => id !== categoryId)
				: [...prev.categories, categoryId];
			return { ...prev, categories };
		});
	};

	// Xử lý thay đổi môn thể thao
	const handleSportChange = (sportId) => {
		setFilters((prev) => {
			const sports = prev.sports.includes(sportId)
				? prev.sports.filter((id) => id !== sportId)
				: [...prev.sports, sportId];
			return { ...prev, sports };
		});
	};

	// Xử lý thay đổi khoảng giá
	const handlePriceChange = (e) => {
		const { name, value } = e.target;
		setFilters((prev) => ({
			...prev,
			price: { ...prev.price, [name]: parseInt(value) || 0 },
		}));
	};

	// Reset bộ lọc
	const handleResetFilters = () => {
		setFilters({
			categories: [],
			sports: [],
			price: { min_price: 0, max_price: 10000000 },
		});
		setCategorySearch('');
		setSportSearch('');
	};

	// Lọc danh mục theo tìm kiếm
	const filteredCategories = categories.filter(
		(category) =>
			category.name
				?.toLowerCase()
				.includes(categorySearch.toLowerCase()) ||
			category.sport?.name
				?.toLowerCase()
				.includes(categorySearch.toLowerCase())
	);

	// Lọc sports theo tìm kiếm
	const filteredSports = sports.filter((sport) =>
		sport.name?.toLowerCase().includes(sportSearch.toLowerCase())
	);

	return (
		<div className="mb-6 bg-white rounded-lg shadow-md p-5 sticky top-4 transition-all duration-300 border border-gray-100 hover:shadow-lg">
			<div className="flex flex-col space-y-5">
				{/* Heading */}
				<div className="flex items-center justify-between pb-2 border-b border-gray-100">
					<h3 className="text-sm font-semibold text-gray-800 flex items-center">
						<FiFilter className="mr-2 text-blue-600" size={16} />
						<span className="tracking-wide">BỘ LỌC SẢN PHẨM</span>
					</h3>
					<button
						onClick={handleResetFilters}
						className="flex items-center text-xs text-rose-600 hover:text-rose-800 transition-colors duration-200 font-medium"
					>
						<FiTrash2 className="mr-1" size={12} />
						Đặt lại
					</button>
				</div>

				{/* Bộ lọc danh mục */}
				<div className="pt-1">
					<div
						className="flex items-center justify-between cursor-pointer mb-3 group"
						onClick={() => toggleSection('categories')}
					>
						<h4 className="text-xs font-medium text-gray-800 flex items-center">
							<FiLayers
								className="mr-2 text-blue-500 group-hover:text-blue-600 transition-colors"
								size={14}
							/>
							Danh mục
						</h4>
						<div className="bg-gray-100 rounded-full p-1 group-hover:bg-blue-50 transition-colors">
							{expandedSections.categories ? (
								<FiChevronUp
									className="text-gray-500 group-hover:text-blue-500"
									size={12}
								/>
							) : (
								<FiChevronDown
									className="text-gray-500 group-hover:text-blue-500"
									size={12}
								/>
							)}
						</div>
					</div>

					{expandedSections.categories && (
						<div className="transition-all duration-300 ease-in-out">
							<div className="relative mb-3">
								<input
									type="text"
									value={categorySearch}
									onChange={(e) =>
										setCategorySearch(e.target.value)
									}
									placeholder="Tìm danh mục..."
									className="w-full p-2 pl-8 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200"
								/>
								<FiSearch
									className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"
									size={14}
								/>
							</div>

							<div className="max-h-44 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50">
								{filteredCategories.length > 0 ? (
									filteredCategories.map((category) => (
										<div
											key={category.id}
											className="flex items-center mb-2 hover:bg-blue-50 p-1.5 rounded-lg transition-colors duration-150"
										>
											<div className="relative flex items-center">
												<input
													type="checkbox"
													id={`category-${category.id}`}
													checked={filters.categories.includes(
														category.id
													)}
													onChange={() =>
														handleCategoryChange(
															category.id
														)
													}
													className="opacity-0 absolute h-4 w-4"
												/>
												<div
													className={`border ${
														filters.categories.includes(
															category.id
														)
															? 'bg-blue-600 border-blue-600'
															: 'border-gray-300 bg-white'
													} rounded w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2 transition-colors duration-200`}
												>
													{filters.categories.includes(
														category.id
													) && (
														<FiCheck
															className="text-white"
															size={10}
														/>
													)}
												</div>
											</div>
											<label
												htmlFor={`category-${category.id}`}
												className="text-xs text-gray-700 cursor-pointer line-clamp-1 flex-1"
											>
												<span className="font-medium text-gray-800">
													{category.sport?.name}
												</span>{' '}
												- {category.name}
											</label>
										</div>
									))
								) : (
									<div className="text-xs text-gray-500 italic text-center py-3 bg-gray-50 rounded-lg">
										Không tìm thấy danh mục
									</div>
								)}
							</div>
						</div>
					)}
				</div>

				{/* Bộ lọc môn thể thao */}
				<div className="pt-1 border-t border-gray-100">
					<div
						className="flex items-center justify-between cursor-pointer mb-3 group"
						onClick={() => toggleSection('sports')}
					>
						<h4 className="text-xs font-medium text-gray-800 flex items-center">
							<FiActivity
								className="mr-2 text-blue-500 group-hover:text-blue-600 transition-colors"
								size={14}
							/>
							Môn thể thao
						</h4>
						<div className="bg-gray-100 rounded-full p-1 group-hover:bg-blue-50 transition-colors">
							{expandedSections.sports ? (
								<FiChevronUp
									className="text-gray-500 group-hover:text-blue-500"
									size={12}
								/>
							) : (
								<FiChevronDown
									className="text-gray-500 group-hover:text-blue-500"
									size={12}
								/>
							)}
						</div>
					</div>

					{expandedSections.sports && (
						<div className="transition-all duration-300 ease-in-out">
							<div className="relative mb-3">
								<input
									type="text"
									value={sportSearch}
									onChange={(e) =>
										setSportSearch(e.target.value)
									}
									placeholder="Tìm môn thể thao..."
									className="w-full p-2 pl-8 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200"
								/>
								<FiSearch
									className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"
									size={14}
								/>
							</div>

							<div className="max-h-40 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50">
								{filteredSports.length > 0 ? (
									filteredSports.map((sport) => (
										<div
											key={sport.id}
											className="flex items-center mb-2 hover:bg-blue-50 p-1.5 rounded-lg transition-colors duration-150"
										>
											<div className="relative flex items-center">
												<input
													type="checkbox"
													id={`sport-${sport.id}`}
													checked={filters.sports.includes(
														sport.id
													)}
													onChange={() =>
														handleSportChange(
															sport.id
														)
													}
													className="opacity-0 absolute h-4 w-4"
												/>
												<div
													className={`border ${
														filters.sports.includes(
															sport.id
														)
															? 'bg-blue-600 border-blue-600'
															: 'border-gray-300 bg-white'
													} rounded w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2 transition-colors duration-200`}
												>
													{filters.sports.includes(
														sport.id
													) && (
														<FiCheck
															className="text-white"
															size={10}
														/>
													)}
												</div>
											</div>
											<label
												htmlFor={`sport-${sport.id}`}
												className="text-xs text-gray-700 cursor-pointer line-clamp-1 flex-1"
											>
												{sport.name}
											</label>
										</div>
									))
								) : (
									<div className="text-xs text-gray-500 italic text-center py-3 bg-gray-50 rounded-lg">
										Không tìm thấy môn thể thao
									</div>
								)}
							</div>
						</div>
					)}
				</div>

				{/* Bộ lọc giá */}
				<div className="pt-1 border-t border-gray-100">
					<div
						className="flex items-center justify-between cursor-pointer mb-3 group"
						onClick={() => toggleSection('price')}
					>
						<h4 className="text-xs font-medium text-gray-800 flex items-center">
							<FiDollarSign
								className="mr-2 text-blue-500 group-hover:text-blue-600 transition-colors"
								size={14}
							/>
							Khoảng giá
						</h4>
						<div className="bg-gray-100 rounded-full p-1 group-hover:bg-blue-50 transition-colors">
							{expandedSections.price ? (
								<FiChevronUp
									className="text-gray-500 group-hover:text-blue-500"
									size={12}
								/>
							) : (
								<FiChevronDown
									className="text-gray-500 group-hover:text-blue-500"
									size={12}
								/>
							)}
						</div>
					</div>

					{expandedSections.price && (
						<div className="transition-all duration-300 ease-in-out">
							<div className="flex space-x-3">
								<div className="w-full">
									<div className="relative">
										<input
											type="number"
											name="min_price"
											min={0}
											max={filters.price.max_price}
											value={filters.price.min_price}
											onChange={handlePriceChange}
											placeholder="Tối thiểu"
											className="w-full p-2 pl-6 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200"
										/>
										<span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
											₫
										</span>
									</div>
									<p className="text-xs text-gray-500 mt-1 ml-1">
										Tối thiểu
									</p>
								</div>
								<div className="w-full">
									<div className="relative">
										<input
											type="number"
											name="max_price"
											min={filters.price.min_price}
											value={filters.price.max_price}
											onChange={handlePriceChange}
											placeholder="Tối đa"
											className="w-full p-2 pl-6 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200"
										/>
										<span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
											₫
										</span>
									</div>
									<p className="text-xs text-gray-500 mt-1 ml-1">
										Tối đa
									</p>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Nút áp dụng bộ lọc */}
				<div className="pt-4 border-t border-gray-100 flex justify-center">
					<button
						onClick={() => {
							applyFilters(filters);
							window.scrollTo({ top: 0, behavior: 'smooth' });
						}}
						className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:-translate-y-0.5 active:translate-y-0 active:bg-blue-800"
					>
						Áp dụng bộ lọc
					</button>
				</div>

				{/* Thông tin lọc đã chọn */}
				{(filters.categories.length > 0 ||
					filters.sports.length > 0 ||
					filters.price.min_price > 0 ||
					filters.price.max_price < 10000000) && (
					<div className="pt-3 border-t border-gray-100">
						<div className="flex flex-wrap gap-2">
							{filters.categories.length > 0 && (
								<div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs flex items-center">
									<span>
										{filters.categories.length} danh mục
									</span>
								</div>
							)}
							{filters.sports.length > 0 && (
								<div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs flex items-center">
									<span>
										{filters.sports.length} môn thể thao
									</span>
								</div>
							)}
							{(filters.price.min_price > 0 ||
								filters.price.max_price < 10000000) && (
								<div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs flex items-center">
									<span>
										Giá:{' '}
										{new Intl.NumberFormat('vi-VN').format(
											filters.price.min_price
										)}
										₫ -{' '}
										{new Intl.NumberFormat('vi-VN').format(
											filters.price.max_price
										)}
										₫
									</span>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductFilter;
