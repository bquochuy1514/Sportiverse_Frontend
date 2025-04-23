import React from 'react';
import {
	FiTrash2,
	FiEye,
	FiTag,
	FiPackage,
	FiDollarSign,
	FiEdit,
} from 'react-icons/fi';

// Hàm cắt chữ nếu quá dài
const truncateText = (text, maxLength = 50) => {
	if (!text) return '';
	return text.length > maxLength
		? text.substring(0, maxLength) + '...'
		: text;
};

const ProductTable = ({
	products,
	onViewProduct,
	onConfirmDelete,
	onEditProduct,
}) => {
	return (
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
						{products.map((product) => (
							<tr
								key={product.id}
								className="hover:bg-gray-50 transition-colors"
							>
								<td className="px-6 py-4 whitespace-nowrap">
									<img
										src={product.images[0].image_path}
										alt={product.name}
										className="h-16 w-16 object-cover rounded-lg shadow-sm border border-gray-200"
									/>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm font-medium text-gray-900 max-w-xs hover:text-indigo-600 transition-colors truncate overflow-hidden">
										{truncateText(product.name, 30)}
									</div>
									<div className="text-xs text-gray-500 mt-1 truncate max-w-xs overflow-hidden">
										{truncateText(product.description, 30)}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
										{product.sport?.name &&
										product.category?.name
											? `${product.sport.name} - ${product.category.name}`
											: product.category?.name || 'N/A'}
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
												).format(product.sale_price)}
											</div>
										</div>
									) : (
										<div className="text-sm font-medium text-gray-900">
											{new Intl.NumberFormat('vi-VN', {
												style: 'currency',
												currency: 'VND',
											}).format(product.price)}
										</div>
									)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span
										className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
											product.stock_quantity > 10
												? 'bg-green-100 text-green-800'
												: product.stock_quantity > 0
												? 'bg-yellow-100 text-yellow-800'
												: 'bg-red-100 text-red-800'
										}`}
									>
										{product.stock_quantity} sản phẩm
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
											onClick={() =>
												onViewProduct(product.id)
											}
										>
											<FiEye className="h-5 w-5" />
										</button>
										{/* Edit Product */}
										<button
											onClick={() =>
												onEditProduct(product.id)
											}
											className="text-green-500 hover:text-green-700 transition-colors duration-200"
											title="Chỉnh sửa"
										>
											<FiEdit className="h-5 w-5" />
										</button>
										<button
											className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors"
											title="Xóa sản phẩm"
											onClick={() =>
												onConfirmDelete(product)
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
	);
};

export default ProductTable;
