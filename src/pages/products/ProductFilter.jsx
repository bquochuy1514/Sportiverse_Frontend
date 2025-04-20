import React, { useState } from 'react';
import { FaFilter, FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';

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
		<div className="mb-6 bg-white rounded-lg shadow-sm p-4 sticky top-4 transition-all">
			<div className="flex flex-col space-y-4">
				{/* Heading */}
				<div className="flex items-center justify-between">
					<h3 className="text-sm font-semibold text-gray-700 flex items-center">
						<FaFilter className="mr-2 text-blue-500" size={14} />
						Bộ lọc sản phẩm
					</h3>
					<button
						onClick={handleResetFilters}
						className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
					>
						Đặt lại
					</button>
				</div>

				{/* Bộ lọc danh mục */}
				<div className="border-t border-gray-100 pt-3">
					<div
						className="flex items-center justify-between cursor-pointer mb-2"
						onClick={() => toggleSection('categories')}
					>
						<h4 className="text-xs font-medium text-gray-700">
							Danh mục
						</h4>
						{expandedSections.categories ? (
							<FaChevronUp className="text-gray-500" size={12} />
						) : (
							<FaChevronDown
								className="text-gray-500"
								size={12}
							/>
						)}
					</div>

					{expandedSections.categories && (
						<>
							<div className="relative mb-2">
								<input
									type="text"
									value={categorySearch}
									onChange={(e) =>
										setCategorySearch(e.target.value)
									}
									placeholder="Tìm danh mục..."
									className="w-full p-2 pl-8 text-xs border rounded focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
								/>
								<FaSearch
									className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
									size={12}
								/>
							</div>

							<div className="max-h-40 overflow-y-auto pr-1 custom-scrollbar">
								{filteredCategories.length > 0 ? (
									filteredCategories.map((category) => (
										<div
											key={category.id}
											className="flex items-center mb-2 hover:bg-gray-50 p-1 rounded transition-colors"
										>
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
												className="mr-2 h-3.5 w-3.5 rounded text-blue-600 focus:ring-blue-500"
											/>
											<label
												htmlFor={`category-${category.id}`}
												className="text-sm text-gray-600 cursor-pointer text-xs line-clamp-1"
											>
												<span className="font-medium text-gray-700">
													{category.sport?.name}
												</span>{' '}
												- {category.name}
											</label>
										</div>
									))
								) : (
									<p className="text-xs text-gray-500 italic text-center py-2">
										Không tìm thấy danh mục
									</p>
								)}
							</div>
						</>
					)}
				</div>

				{/* Bộ lọc môn thể thao */}
				<div className="border-t border-gray-100 pt-3">
					<div
						className="flex items-center justify-between cursor-pointer mb-2"
						onClick={() => toggleSection('sports')}
					>
						<h4 className="text-xs font-medium text-gray-700">
							Môn thể thao
						</h4>
						{expandedSections.sports ? (
							<FaChevronUp className="text-gray-500" size={12} />
						) : (
							<FaChevronDown
								className="text-gray-500"
								size={12}
							/>
						)}
					</div>

					{expandedSections.sports && (
						<>
							<div className="relative mb-2">
								<input
									type="text"
									value={sportSearch}
									onChange={(e) =>
										setSportSearch(e.target.value)
									}
									placeholder="Tìm môn thể thao..."
									className="w-full p-2 pl-8 text-xs border rounded focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
								/>
								<FaSearch
									className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
									size={12}
								/>
							</div>

							<div className="max-h-32 overflow-y-auto pr-1 custom-scrollbar">
								{filteredSports.length > 0 ? (
									filteredSports.map((sport) => (
										<div
											key={sport.id}
											className="flex items-center mb-2 hover:bg-gray-50 p-1 rounded transition-colors"
										>
											<input
												type="checkbox"
												id={`sport-${sport.id}`}
												checked={filters.sports.includes(
													sport.id
												)}
												onChange={() =>
													handleSportChange(sport.id)
												}
												className="mr-2 h-3.5 w-3.5 rounded text-blue-600 focus:ring-blue-500"
											/>
											<label
												htmlFor={`sport-${sport.id}`}
												className="text-xs text-gray-600 cursor-pointer line-clamp-1"
											>
												{sport.name}
											</label>
										</div>
									))
								) : (
									<p className="text-xs text-gray-500 italic text-center py-2">
										Không tìm thấy môn thể thao
									</p>
								)}
							</div>
						</>
					)}
				</div>

				{/* Bộ lọc giá */}
				<div className="border-t border-gray-100 pt-3">
					<div
						className="flex items-center justify-between cursor-pointer mb-2"
						onClick={() => toggleSection('price')}
					>
						<h4 className="text-xs font-medium text-gray-700">
							Khoảng giá
						</h4>
						{expandedSections.price ? (
							<FaChevronUp className="text-gray-500" size={12} />
						) : (
							<FaChevronDown
								className="text-gray-500"
								size={12}
							/>
						)}
					</div>

					{expandedSections.price && (
						<div className="flex space-x-2">
							<div className="w-full">
								<input
									type="number"
									name="min_price"
									min={0}
									max={filters.price.max_price}
									value={filters.price.min_price}
									onChange={handlePriceChange}
									placeholder="Tối thiểu"
									className="w-full p-2 border rounded text-xs focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
								/>
								<p className="text-xs text-gray-500 mt-1">
									Tối thiểu
								</p>
							</div>
							<div className="w-full">
								<input
									type="number"
									name="max_price"
									min={filters.price.min_price}
									value={filters.price.max_price}
									onChange={handlePriceChange}
									placeholder="Tối đa"
									className="w-full p-2 border rounded text-xs focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
								/>
								<p className="text-xs text-gray-500 mt-1">
									Tối đa
								</p>
							</div>
						</div>
					)}
				</div>

				{/* Nút áp dụng bộ lọc */}
				<div className="border-t border-gray-100 pt-3 flex justify-center">
					<button
						onClick={() => {
							applyFilters(filters);
							window.scrollTo({ top: 0, behavior: 'smooth' });
						}}
						className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
					>
						Áp dụng bộ lọc
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductFilter;
