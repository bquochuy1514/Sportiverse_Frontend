// src/pages/admin/products/ProductListPage.jsx
import React, { useState, useEffect } from 'react';
import { FiAlertCircle, FiSearch, FiPackage, FiFilter } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ProductTable from './ProductTable';
import {
	fetchSports,
	fetchSpecificSports,
} from '../../../services/productService';

const ProductListPage = () => {
	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [productToDelete, setProductToDelete] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [enrichedProducts, setEnrichedProducts] = useState([]);
	const [sports, setSports] = useState([]);
	const [selectedSport, setSelectedSport] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const [productsPerPage] = useState(10);
	const navigate = useNavigate();

	// Fetch products and sports
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				// Fetch sports
				const sportsResult = await fetchSports();
				if (sportsResult.success) {
					setSports(sportsResult.data);
				}

				// Fetch products
				await fetchProducts();
			} catch (error) {
				console.error('Error fetching data:', error);
				toast.error('Không thể tải dữ liệu. Vui lòng thử lại sau.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	const fetchProducts = async () => {
		try {
			const response = await fetch('/api/products');
			if (response.ok) {
				const result = await response.json();
				if (result.status && Array.isArray(result.data)) {
					setProducts(result.data);

					// Phương pháp tối ưu hơn để làm phong phú sản phẩm
					const enrichProducts = async () => {
						try {
							// Lấy danh sách các sport_id duy nhất
							const uniqueSportIds = [
								...new Set(
									result.data
										.map(
											(product) =>
												product.category?.sport_id
										)
										.filter((id) => id) // Lọc các giá trị null/undefined
								),
							];

							// Tạo một map để lưu trữ thông tin thể thao theo id
							const sportsMap = {};

							// Lấy thông tin thể thao từ API cho từng sport_id duy nhất
							await Promise.all(
								uniqueSportIds.map(async (sportId) => {
									try {
										const sportData =
											await fetchSpecificSports(sportId);
										if (sportData.data) {
											sportsMap[sportId] = sportData.data;
										}
									} catch (error) {
										console.error(
											`Lỗi khi lấy thông tin thể thao ID ${sportId}:`,
											error
										);
									}
								})
							);

							// Gán thông tin thể thao vào từng sản phẩm
							const enriched = result.data.map((product) => {
								const sportId = product.category?.sport_id;
								return {
									...product,
									sport: sportId ? sportsMap[sportId] : null,
								};
							});

							setEnrichedProducts(enriched);
						} catch (error) {
							console.error(
								'Lỗi khi làm phong phú sản phẩm với thông tin thể thao:',
								error
							);
							setEnrichedProducts(result.data);
						}
					};

					enrichProducts();
				}
			} else {
				throw new Error('Không thể tải sản phẩm');
			}
		} catch (error) {
			console.error('Không thể tải danh sách sản phẩm:', error);
			toast.error('Không thể tải danh sách sản phẩm. Vui lòng thử lại.');
		}
	};

	const confirmDelete = (product) => {
		setProductToDelete(product);
		setShowDeleteModal(true);
	};

	const handleDeleteProduct = async () => {
		try {
			const response = await fetch(
				`/api/products/${productToDelete.id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
					},
				}
			);

			if (response.ok) {
				toast.success('Xóa sản phẩm thành công!');
				setShowDeleteModal(false);
				await fetchProducts();
			} else {
				const errorData = await response.json();
				toast.error(
					`Lỗi khi xóa sản phẩm: ${
						errorData.message || 'Không xác định'
					}`
				);
			}
		} catch (error) {
			console.error('Error deleting product:', error);
			toast.error('Có lỗi khi xóa sản phẩm. Vui lòng thử lại.');
		}
	};

	const handleEditProduct = (productId) => {
		navigate(`/admin/product/edit/${productId}`);
	};

	const handleViewProduct = (productId) => {
		navigate(`/admin/product/${productId}`);
	};

	const handleSportChange = (e) => {
		setSelectedSport(e.target.value);
		setCurrentPage(1); // Reset về trang đầu khi thay đổi bộ lọc
	};

	// Filter products based on search term and selected sport
	const filteredProducts = enrichedProducts.filter((product) => {
		// Filter by search term
		const matchesSearch =
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(product.category?.name &&
				product.category.name
					.toLowerCase()
					.includes(searchTerm.toLowerCase())) ||
			(product.sport?.name &&
				product.sport.name
					.toLowerCase()
					.includes(searchTerm.toLowerCase()));

		// Filter by sport
		const matchesSport =
			selectedSport === 'all' ||
			(product.sport && product.sport.id.toString() === selectedSport);

		return matchesSearch && matchesSport;
	});

	// Pagination logic
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = filteredProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);
	const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div className="max-w-6xl mx-auto">
			<div className="bg-white rounded-xl shadow p-6 mb-6">
				<div className="flex flex-col md:flex-row justify-between gap-2 mb-6">
					<div className="relative flex-1">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<FiSearch className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type="text"
							className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							placeholder="Tìm kiếm sản phẩm..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>

					<div className="w-full md:w-auto">
						<div className="flex items-center">
							<div className="flex items-center mr-2">
								<FiFilter className="text-gray-500 mr-1" />
								<span className="text-sm text-gray-600">
									Lọc theo:
								</span>
							</div>
							<select
								value={selectedSport}
								onChange={handleSportChange}
								className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
							>
								<option value="all">Tất cả môn thể thao</option>
								{sports.map((sport) => (
									<option key={sport.id} value={sport.id}>
										{sport.name}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{isLoading ? (
					<div className="bg-white p-8 rounded-xl text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
						<p className="mt-4 text-gray-500 text-lg">
							Đang tải dữ liệu...
						</p>
					</div>
				) : filteredProducts.length === 0 ? (
					<div className="bg-white p-8 rounded-xl text-center">
						<FiAlertCircle className="mx-auto h-12 w-12 text-gray-400" />
						<p className="mt-4 text-gray-500 text-lg">
							{products.length === 0
								? 'Chưa có sản phẩm nào.'
								: 'Không tìm thấy sản phẩm nào phù hợp.'}
						</p>
					</div>
				) : (
					<>
						<ProductTable
							products={currentProducts}
							onViewProduct={handleViewProduct}
							onConfirmDelete={confirmDelete}
							onEditProduct={handleEditProduct}
						/>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="flex justify-between items-center mt-4 px-2">
								<p className="text-sm text-gray-700">
									Hiển thị{' '}
									<span className="font-medium">
										{indexOfFirstProduct + 1}
									</span>
									-
									<span className="font-medium">
										{Math.min(
											indexOfLastProduct,
											filteredProducts.length
										)}
									</span>{' '}
									của{' '}
									<span className="font-medium">
										{filteredProducts.length}
									</span>{' '}
									sản phẩm
								</p>

								<div className="flex items-center space-x-1">
									<button
										onClick={() =>
											handlePageChange(currentPage - 1)
										}
										disabled={currentPage === 1}
										className={`px-2 py-1 rounded-md ${
											currentPage === 1
												? 'text-gray-400 cursor-not-allowed'
												: 'text-gray-700 hover:bg-gray-100'
										}`}
									>
										&larr;
									</button>

									{[...Array(totalPages).keys()].map(
										(number) => (
											<button
												key={number + 1}
												onClick={() =>
													handlePageChange(number + 1)
												}
												className={`w-8 h-8 flex items-center justify-center rounded-md text-sm ${
													currentPage === number + 1
														? 'bg-indigo-600 text-white'
														: 'text-gray-700 hover:bg-gray-100'
												}`}
											>
												{number + 1}
											</button>
										)
									)}

									<button
										onClick={() =>
											handlePageChange(currentPage + 1)
										}
										disabled={currentPage === totalPages}
										className={`px-2 py-1 rounded-md ${
											currentPage === totalPages
												? 'text-gray-400 cursor-not-allowed'
												: 'text-gray-700 hover:bg-gray-100'
										}`}
									>
										&rarr;
									</button>
								</div>
							</div>
						)}
					</>
				)}
			</div>

			{/* Delete Confirmation Modal */}
			{showDeleteModal && (
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div
							className="fixed inset-0 transition-opacity"
							aria-hidden="true"
						>
							<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
						</div>
						<span
							className="hidden sm:inline-block sm:align-middle sm:h-screen"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-start">
									<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
										<FiAlertCircle className="h-6 w-6 text-red-600" />
									</div>
									<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
										<h3 className="text-lg leading-6 font-medium text-gray-900">
											Xác nhận xóa sản phẩm
										</h3>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												Bạn có chắc chắn muốn xóa sản
												phẩm "{productToDelete?.name}"?
												Hành động này không thể hoàn
												tác.
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
								<button
									type="button"
									className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
									onClick={handleDeleteProduct}
								>
									Xóa
								</button>
								<button
									type="button"
									className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
									onClick={() => setShowDeleteModal(false)}
								>
									Hủy
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductListPage;
