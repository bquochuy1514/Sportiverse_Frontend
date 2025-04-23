// src/pages/AllProducts.jsx
import React, { useEffect, useState, useRef } from 'react';
import { FaThLarge } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import ProductList from '../products/ProductList';
import ProductFilter from '../products/ProductFilter';
import SortDropdown from './SortDropdown';

const AllProducts = () => {
	const [products, setProducts] = useState([]);
	const [originalFilteredProducts, setOriginalFilteredProducts] = useState(
		[]
	);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [categories, setCategories] = useState([]);
	const [sports, setSports] = useState([]);

	// State cho việc sắp xếp
	const [sortOption, setSortOption] = useState('default');
	const [sortMenuOpen, setSortMenuOpen] = useState(false);

	// State cho phân trang
	const [currentPage, setCurrentPage] = useState(0); // React-paginate sử dụng chỉ số 0 cho trang đầu tiên
	const [productsPerPage] = useState(15); // Số sản phẩm trên mỗi trang

	// Ref cho dropdown
	const sortDropdownRef = useRef(null);

	// Chuẩn bị cho việc triển khai filter
	const [filters, setFilters] = useState({
		categories: [],
		sports: [],
		price: { min_price: 0, max_price: 10000000 },
	});

	// Đóng dropdown khi click bên ngoài
	useEffect(() => {
		function handleClickOutside(event) {
			if (
				sortDropdownRef.current &&
				!sortDropdownRef.current.contains(event.target)
			) {
				setSortMenuOpen(false);
			}
		}

		// Thêm event listener khi menu mở
		if (sortMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		// Cleanup
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [sortMenuOpen]);

	// Fetch all necessary data
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				// Fetch products
				const productsResponse = await fetch('/api/products-sale');
				const productsData = await productsResponse.json();
				setProducts(productsData.data);
				setFilteredProducts(productsData.data);
				setOriginalFilteredProducts(productsData.data);

				const categoriesResponse = await fetch('api/sub-categories');
				const categoriesData = await categoriesResponse.json();
				setCategories(categoriesData.data);

				// Fetch sports
				const sportsResponse = await fetch('/api/sports');
				const sportsData = await sportsResponse.json();
				setSports(sportsData.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	// Xử lý sắp xếp sản phẩm
	const sortProducts = (products, option) => {
		const productsCopy = [...products];

		switch (option) {
			case 'price_asc':
				return productsCopy.sort((a, b) => a.price - b.price);
			case 'price_desc':
				return productsCopy.sort((a, b) => b.price - a.price);
			case 'newest':
				return productsCopy.sort(
					(a, b) => new Date(b.created_at) - new Date(a.created_at)
				);
			default:
				return productsCopy; // Mặc định không sắp xếp
		}
	};

	const applyFilters = async () => {
		setIsLoading(true);
		setCurrentPage(0); // Reset về trang đầu tiên khi áp dụng bộ lọc mới
		try {
			const queryParts = [];

			if (filters.categories.length > 0) {
				queryParts.push(`category_id=${filters.categories.join(',')}`);
			}

			if (filters.sports.length > 0) {
				queryParts.push(`sport_id=${filters.sports.join(',')}`);
			}

			if (filters.price.min_price > 0) {
				queryParts.push(`min_price=${filters.price.min_price}`);
			}

			if (filters.price.max_price < 10000000) {
				queryParts.push(`max_price=${filters.price.max_price}`);
			}

			const queryString =
				queryParts.length > 0 ? `?${queryParts.join('&')}` : '';

			const response = await fetch(`/api/products-sale${queryString}`);
			if (!response.ok) {
				throw new Error('Failed to fetch filtered products');
			}
			const data = await response.json();

			setOriginalFilteredProducts(data.data);

			// Áp dụng sắp xếp cho kết quả lọc
			const sortedProducts = sortProducts(data.data, sortOption);
			setFilteredProducts(sortedProducts);
		} catch (error) {
			console.error('Error applying filters:', error);
			setFilteredProducts(products);
			setOriginalFilteredProducts(products);
		} finally {
			setIsLoading(false);
		}
	};

	// Sửa lại useEffect xử lý sắp xếp
	useEffect(() => {
		if (filteredProducts.length > 0) {
			if (sortOption === 'default') {
				// Sử dụng danh sách gốc khi chọn "default"
				setFilteredProducts([...originalFilteredProducts]);
			} else {
				// Áp dụng sắp xếp cho các tùy chọn khác
				const sortedProducts = sortProducts(
					originalFilteredProducts,
					sortOption
				);
				setFilteredProducts(sortedProducts);
			}
		}
	}, [sortOption, originalFilteredProducts]);

	// Xử lý thay đổi sắp xếp
	const handleSortChange = (option) => {
		setSortOption(option);
		setSortMenuOpen(false);
		setCurrentPage(0); // Reset về trang đầu tiên khi thay đổi sắp xếp
	};

	// Xử lý thay đổi trang với ReactPaginate
	const handlePageClick = (event) => {
		setCurrentPage(event.selected);
		window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang khi chuyển trang
	};

	// Tính toán các thông số phân trang
	const offset = currentPage * productsPerPage;
	const currentProducts = filteredProducts.slice(
		offset,
		offset + productsPerPage
	);
	const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

	// Tính toán khoảng sản phẩm đang hiển thị
	const startItem = offset + 1;
	const endItem = Math.min(offset + productsPerPage, filteredProducts.length);

	return (
		<section className="py-8 mt-4 relative overflow-hidden">
			<div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 relative">
					{/* Thêm decoration background */}
					<div className="absolute -left-6 top-0 w-16 h-16 bg-blue-100 rounded-full opacity-50 blur-2xl"></div>
					<div className="absolute right-20 bottom-0 w-12 h-12 bg-indigo-100 rounded-full opacity-40 blur-xl"></div>

					<div className="mb-4 md:mb-0 relative z-10">
						<div className="flex items-center mb-2">
							<div className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-2"></div>
							<h2 className="text-2xl font-bold text-gray-800 relative">
								<span className="relative z-10 bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
									Sản phẩm được giảm giá
								</span>
								<span className="absolute -bottom-1 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-70 rounded-full z-0 transform transition-all duration-300"></span>
							</h2>
							<FaThLarge
								className="text-blue-600 ml-2"
								size={16}
							/>
						</div>
						<p className="text-sm text-gray-600 mt-2 max-w-xl pl-3.5 border-l-2 border-blue-100">
							Khám phá những sản phẩm chất lượng cao và được yêu
							thích nhất của chúng tôi
						</p>
					</div>
				</div>

				<div className="flex flex-col lg:flex-row gap-6">
					{/* Sidebar with filters */}
					<div className="w-full lg:w-1/4">
						<ProductFilter
							filters={filters}
							setFilters={setFilters}
							categories={categories}
							sports={sports}
							applyFilters={applyFilters} // Truyền applyFilters
						/>
					</div>

					{/* Main content - Product list */}
					<div className="w-full lg:w-3/4">
						{/* Filter summary và Sort options */}
						<div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
							<div>
								<span className="text-sm text-gray-700">
									Hiển thị{' '}
									<span className="font-semibold text-blue-600">
										{filteredProducts.length > 0
											? `${startItem}-${endItem} của ${filteredProducts.length}`
											: '0'}
									</span>{' '}
									sản phẩm
								</span>
							</div>

							{/* Dropdown sắp xếp */}
							<SortDropdown
								sortOption={sortOption}
								sortMenuOpen={sortMenuOpen}
								sortDropdownRef={sortDropdownRef}
								handleSortChange={handleSortChange}
								setSortMenuOpen={setSortMenuOpen}
							/>
						</div>

						{/* Product grid - sử dụng currentProducts */}
						<ProductList
							products={currentProducts}
							isLoading={isLoading}
						/>

						{/* ReactPaginate component */}
						{!isLoading &&
							filteredProducts.length > 0 &&
							pageCount > 1 && (
								<div className="mt-8">
									<ReactPaginate
										previousLabel={
											<span className="flex items-center justify-center">
												←
											</span>
										}
										nextLabel={
											<span className="flex items-center justify-center">
												→
											</span>
										}
										breakLabel={'...'}
										pageCount={pageCount}
										marginPagesDisplayed={1}
										pageRangeDisplayed={3}
										onPageChange={handlePageClick}
										containerClassName={
											'flex justify-center items-center gap-2'
										}
										pageClassName={
											'w-8 h-8 flex items-center justify-center rounded-md text-sm text-gray-700 hover:bg-gray-100'
										}
										pageLinkClassName={
											'w-full h-full flex items-center justify-center'
										}
										previousClassName={
											'w-8 h-8 flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-100'
										}
										nextClassName={
											'w-8 h-8 flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-100'
										}
										breakClassName={
											'w-8 h-8 flex items-center justify-center text-gray-500'
										}
										activeClassName={
											'bg-blue-600 text-white hover:bg-blue-600'
										}
										activeLinkClassName={'text-white'}
										disabledClassName={
											'text-gray-400 cursor-not-allowed hover:bg-transparent'
										}
										forcePage={currentPage}
									/>
								</div>
							)}

						{/* Empty state */}
						{!isLoading && filteredProducts.length === 0 && (
							<div className="bg-white rounded-lg shadow-sm p-8 text-center">
								<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-8 w-8 text-blue-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<h3 className="text-lg font-semibold text-gray-800 mb-2">
									Không tìm thấy sản phẩm phù hợp
								</h3>
								<p className="text-gray-600 mb-4">
									Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm để
									có kết quả tốt hơn.
								</p>
								<button
									onClick={() => {
										setFilters({
											categories: [],
											sports: [],
											price: {
												min_price: 0,
												max_price: 10000000,
											},
										});
										setSortOption('default');
										setCurrentPage(0);
										applyFilters();
									}}
									className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
								>
									Xóa tất cả bộ lọc
								</button>
							</div>
						)}
					</div>
				</div>

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

export default AllProducts;
