// src/pages/admin/orders/components/OrderTable.jsx
import React from 'react';
import {
	FiEye,
	FiEdit3,
	FiPackage,
	FiTruck,
	FiCheck,
	FiX,
	FiClock,
	FiUser,
} from 'react-icons/fi';

const OrderTable = ({
	orders,
	loading,
	statusOptions,
	onOrderDetail,
	onUpdateStatus,
	isUpdating,
}) => {
	const getStatusIcon = (status) => {
		switch (status) {
			case 'pending':
				return <FiClock className="w-4 h-4" />;
			case 'processing':
				return <FiEdit3 className="w-4 h-4" />;
			case 'shipped':
				return <FiTruck className="w-4 h-4" />;
			case 'delivered':
				return <FiCheck className="w-4 h-4" />;
			case 'cancelled':
				return <FiX className="w-4 h-4" />;
			default:
				return <FiPackage className="w-4 h-4" />;
		}
	};

	const getStatusColor = (status) => {
		const statusConfig = statusOptions.find((opt) => opt.value === status);
		return statusConfig ? statusConfig.color : 'gray';
	};

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(amount);
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleString('vi-VN', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return (
		<div className="bg-white rounded-xl shadow-lg overflow-hidden">
			{loading ? (
				<div className="flex justify-center items-center py-12">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
					<span className="ml-2 text-gray-600">Đang tải...</span>
				</div>
			) : orders.length === 0 ? (
				<div className="text-center py-12">
					<FiPackage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
					<p className="text-gray-500">Không có đơn hàng nào</p>
				</div>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Mã đơn hàng
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Khách hàng
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Trạng thái
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Tổng tiền
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Ngày đặt
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Thao tác
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{orders.map((order) => (
								<tr
									key={order.order_id}
									className="hover:bg-gray-50"
								>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm font-medium text-gray-900">
											#
											{order.order_id
												.toString()
												.padStart(6, '0')}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<div className="rounded-full mr-3 border border-gray-400">
												<img
													src={order.user_avatar}
													alt=""
													className="w-8 h-8 rounded-full object-cover"
												/>
											</div>
											<div>
												<div className="text-sm font-medium text-gray-900">
													{order.user_name}
												</div>
												<div className="text-sm text-gray-500">
													{order.user_email}
												</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getStatusColor(
												order.status
											)}-100 text-${getStatusColor(
												order.status
											)}-800`}
										>
											{getStatusIcon(order.status)}
											<span className="ml-1">
												{
													statusOptions.find(
														(opt) =>
															opt.value ===
															order.status
													)?.label
												}
											</span>
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm font-medium text-gray-900">
											{formatCurrency(order.total_amount)}
										</div>
										{order.discount_amount > 0 && (
											<div className="text-xs text-green-600">
												Giảm:{' '}
												{formatCurrency(
													order.discount_amount
												)}
											</div>
										)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{formatDate(order.created_at)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
										<button
											onClick={() => onOrderDetail(order)}
											className="text-indigo-600 hover:text-indigo-900 mr-3"
										>
											<FiEye className="w-4 h-4" />
										</button>
										<select
											value={order.status}
											onChange={(e) =>
												onUpdateStatus(
													order.order_id,
													e.target.value
												)
											}
											disabled={isUpdating}
											className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
										>
											{statusOptions
												.slice(1)
												.map((option) => (
													<option
														key={option.value}
														value={option.value}
													>
														{option.label}
													</option>
												))}
										</select>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default OrderTable;
