// src/pages/admin/orders/components/OrderFilters.jsx
import React from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

const OrderFilters = ({
	searchTerm,
	setSearchTerm,
	selectedStatus,
	setSelectedStatus,
	statusOptions,
}) => {
	return (
		<div className="bg-white rounded-xl shadow-lg p-6 mb-6">
			<div className="flex flex-col md:flex-row gap-4">
				<div className="flex-1">
					<div className="relative">
						<FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
						<input
							type="text"
							placeholder="Tìm kiếm theo tên khách hàng, email, số điện thoại..."
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				</div>
				<div className="md:w-64">
					<div className="relative">
						<FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
						<select
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
							value={selectedStatus}
							onChange={(e) => setSelectedStatus(e.target.value)}
						>
							{statusOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderFilters;
