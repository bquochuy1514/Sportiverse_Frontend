import { FiDollarSign } from 'react-icons/fi';
import React from 'react';

export default function PriceStockSection({ handleInputChange, formData }) {
	return (
		<>
			<h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
				<FiDollarSign className="mr-2 text-indigo-600" /> Thông Tin Giá
				& Kho
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div>
					<label
						htmlFor="price"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Giá Gốc (VNĐ)
					</label>
					<div className="relative rounded-lg shadow-sm">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<span className="text-gray-500 sm:text-sm">₫</span>
						</div>
						<input
							type="number"
							id="price"
							name="price"
							min="0"
							className="block w-full pl-7 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="0"
							value={formData.price}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div>
					<label
						htmlFor="sale_price"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Giá Khuyến Mãi (VNĐ)
					</label>
					<div className="relative rounded-lg shadow-sm">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<span className="text-gray-500 sm:text-sm">₫</span>
						</div>
						<input
							type="number"
							id="sale_price"
							name="sale_price"
							min="0"
							className="block w-full pl-7 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="0"
							value={formData.sale_price}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div>
					<label
						htmlFor="stock_quantity"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Số Lượng Tồn Kho
					</label>
					<input
						type="number"
						id="stock_quantity"
						name="stock_quantity"
						min="0"
						className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						placeholder="0"
						value={formData.stock_quantity}
						onChange={handleInputChange}
					/>
				</div>
			</div>
		</>
	);
}
