// ProductList.jsx
import React, { useState } from 'react';
import {
	FiTrash2,
	FiEdit,
	FiEye,
	FiTag,
	FiPackage,
	FiDollarSign,
	FiAlertCircle,
	FiSearch,
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const ProductList = ({ products, onProductDeleted }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [productToDelete, setProductToDelete] = useState(null);

	// Get primary image for a product
	const getPrimaryImage = (images) => {
		const primary = images.find((img) => img.is_primary);
		return primary
			? primary.image_path
			: images[0]?.image_path || 'https://via.placeholder.com/100';
	};

	// Handle delete confirmation
	const confirmDelete = (product) => {
		setProductToDelete(product);
		setShowDeleteModal(true);
	};

	// Handle delete product
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
					await onProductDeleted(); // Gọi fetchProducts để lấy danh sách mới
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

	// Filter products based on search term
	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(product.category?.name &&
				product.category.name
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
				<div className="bg-white rounded-xl shadow-lg overflow-hidden">
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										<div className="flex items-center">
											<FiPackage className="mr-2" />
											Ảnh
										</div>
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										<div className="flex items-center">
											<FiTag className="mr-2" />
											Tên Sản Phẩm
										</div>
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Danh Mục
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										<div className="flex items-center">
											<FiDollarSign className="mr-2" />
											Giá
										</div>
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Tồn Kho
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Trạng Thái
									</th>
									<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
										Thao Tác
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{filteredProducts.map((product) => (
									<tr
										key={product.id}
										className="hover:bg-gray-50 transition-colors"
									>
										<td className="px-6 py-4 whitespace-nowrap">
											<img
												src={getPrimaryImage(
													product.images
												)}
												alt={product.name}
												className="h-16 w-16 object-cover rounded-lg shadow-sm border border-gray-200"
											/>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors">
												{product.name}
											</div>
											<div className="text-xs text-gray-500 mt-1 truncate max-w-xs">
												{product.description?.substring(
													0,
													60
												) || 'Không có mô tả'}
												{product.description?.length >
												60
													? '...'
													: ''}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
												{product.category?.name ||
													'N/A'}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{product.sale_price > 0 ? (
												<div>
													<div className="line-through text-xs text-gray-400">
														{new Intl.NumberFormat(
															'vi-VN',
															{
																style: 'currency',
																currency: 'VND',
															}
														).format(product.price)}
													</div>
													<div className="text-sm font-medium text-red-600">
														{new Intl.NumberFormat(
															'vi-VN',
															{
																style: 'currency',
																currency: 'VND',
															}
														).format(
															product.sale_price
														)}
													</div>
												</div>
											) : (
												<div className="text-sm font-medium text-gray-900">
													{new Intl.NumberFormat(
														'vi-VN',
														{
															style: 'currency',
															currency: 'VND',
														}
													).format(product.price)}
												</div>
											)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
													product.stock_quantity > 10
														? 'bg-green-100 text-green-800'
														: product.stock_quantity >
														  0
														? 'bg-yellow-100 text-yellow-800'
														: 'bg-red-100 text-red-800'
												}`}
											>
												{product.stock_quantity} sản
												phẩm
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm">
											<div className="flex flex-col space-y-1">
												<span
													className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
														product.is_active
															? 'bg-green-100 text-green-800'
															: 'bg-red-100 text-red-800'
													}`}
												>
													{product.is_active
														? 'Kích hoạt'
														: 'Ẩn'}
												</span>
												{product.is_featured && (
													<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
														Nổi bật
													</span>
												)}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
											<div className="flex justify-center space-x-2">
												<button
													className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100 transition-colors"
													title="Xem chi tiết"
												>
													<FiEye className="h-5 w-5" />
												</button>
												<button
													className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100 transition-colors"
													title="Chỉnh sửa"
												>
													<FiEdit className="h-5 w-5" />
												</button>
												<button
													className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors"
													title="Xóa sản phẩm"
													onClick={() =>
														confirmDelete(product)
													}
												>
													<FiTrash2 className="h-5 w-5" />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}

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

export default ProductList;
