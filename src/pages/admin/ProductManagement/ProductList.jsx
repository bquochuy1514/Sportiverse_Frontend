import React, { useState, useEffect } from 'react';
import { FiAlertCircle, FiSearch, FiPackage } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ProductTable from './ProductTable';
import { fetchSpecificSports } from '../../../services/productService';

const ProductList = ({ products, onProductDeleted }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [productToDelete, setProductToDelete] = useState(null);
	const [enrichedProducts, setEnrichedProducts] = useState([]); // Danh sách sản phẩm đã gắn sport
	const navigate = useNavigate();

	// Lấy dữ liệu môn thể thao và gắn vào sản phẩm
	useEffect(() => {
		const enrichProducts = async () => {
			try {
				const sportPromises = products.map(async (product) => {
					const sportData = await fetchSpecificSports(
						product.category.sport_id
					);
					return { ...product, sport: sportData.data }; // Gắn sport vào product
				});
				const enriched = await Promise.all(sportPromises);
				setEnrichedProducts(enriched);
			} catch (error) {
				console.error('Error enriching products with sports:', error);
				setEnrichedProducts(products); // Fallback nếu lỗi
			}
		};

		enrichProducts();
	}, [products]);

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
				if (onProductDeleted) {
					await onProductDeleted();
				}
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

	const handleViewProduct = (productId) => {
		navigate(`/admin/product/${productId}`);
	};

	const filteredProducts = enrichedProducts.filter(
		(product) =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(product.category?.name &&
				product.category.name
					.toLowerCase()
					.includes(searchTerm.toLowerCase())) ||
			(product.sport?.name &&
				product.sport.name
					.toLowerCase()
					.includes(searchTerm.toLowerCase()))
	);

	return (
		<div className="mt-8">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-gray-900">
					Danh Sách Sản Phẩm
				</h2>
				<div className="relative">
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
			</div>

			{products.length === 0 ? (
				<div className="bg-white p-8 rounded-xl shadow-lg text-center">
					<FiPackage className="mx-auto h-12 w-12 text-gray-400" />
					<p className="mt-4 text-gray-500 text-lg">
						Chưa có sản phẩm nào.
					</p>
				</div>
			) : filteredProducts.length === 0 ? (
				<div className="bg-white p-8 rounded-xl shadow-lg text-center">
					<FiAlertCircle className="mx-auto h-12 w-12 text-gray-400" />
					<p className="mt-4 text-gray-500 text-lg">
						Không tìm thấy sản phẩm nào phù hợp.
					</p>
				</div>
			) : (
				<ProductTable
					products={filteredProducts}
					onViewProduct={handleViewProduct}
					onConfirmDelete={confirmDelete}
				/>
			)}

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

export default ProductList;
