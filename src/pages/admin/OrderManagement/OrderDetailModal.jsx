// src/pages/admin/orders/components/OrderDetailModal.jsx
import React from 'react';
import {
	FiX,
	FiUser,
	FiMail,
	FiPhone,
	FiMapPin,
	FiPackage,
	FiDollarSign,
	FiCalendar,
} from 'react-icons/fi';

const OrderDetailModal = ({
	order,
	statusOptions,
	onClose,
	onUpdateStatus,
	isUpdating,
}) => {
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
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
			<div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-bold text-gray-900">
						Chi tiết đơn hàng #
						{order.order_id.toString().padStart(6, '0')}
					</h3>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600"
					>
						<FiX className="w-6 h-6" />
					</button>
				</div>

				<div className="space-y-6">
					{/* **Thông tin khách hàng:** */}
					<div className="bg-gray-50 p-4 rounded-lg">
						<h4 className="font-semibold text-gray-800 mb-3 flex items-center">
							<FiUser className="mr-2" />
							Thông tin khách hàng
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
							<div className="flex items-center">
								<FiUser className="mr-2 text-gray-400" />
								<span>{order.user_name}</span>
							</div>
							<div className="flex items-center">
								<FiMail className="mr-2 text-gray-400" />
								<span>{order.user_email}</span>
							</div>
							<div className="flex items-center">
								<FiPhone className="mr-2 text-gray-400" />
								<span>{order.shipping_phone}</span>
							</div>
							<div className="flex items-center">
								<FiCalendar className="mr-2 text-gray-400" />
								<span>{formatDate(order.created_at)}</span>
							</div>
						</div>
					</div>

					{/* **Địa chỉ giao hàng:** */}
					<div className="bg-gray-50 p-4 rounded-lg">
						<h4 className="font-semibold text-gray-800 mb-3 flex items-center">
							<FiMapPin className="mr-2" />
							Địa chỉ giao hàng
						</h4>
						<div className="text-sm">
							<p>
								<strong>Người nhận:</strong>{' '}
								{order.shipping_name}
							</p>
							<p>
								<strong>Địa chỉ:</strong>{' '}
								{order.shipping_address}
							</p>
						</div>
					</div>

					{/* **Sản phẩm trong đơn hàng:** */}
					<div>
						<h4 className="font-semibold text-gray-800 mb-3 flex items-center">
							<FiPackage className="mr-2" />
							Sản phẩm đã đặt
						</h4>
						<div className="space-y-3">
							{order.order_items.map((item, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
								>
									<div className="flex items-center">
										{item.image && (
											<img
												src={item.image}
												alt={item.product_name}
												className="w-12 h-12 object-cover rounded-lg mr-3"
											/>
										)}
										<div>
											<p className="font-medium text-gray-800">
												{item.product_name}
											</p>
											<p className="text-sm text-gray-500">
												{formatCurrency(
													item.unit_price
												)}{' '}
												x {item.quantity}
											</p>
										</div>
									</div>
									<div className="text-right">
										<p className="font-medium text-gray-800">
											{formatCurrency(item.subtotal)}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* **Tổng kết đơn hàng:** */}
					<div className="bg-gray-50 p-4 rounded-lg">
						<h4 className="font-semibold text-gray-800 mb-3 flex items-center">
							<FiDollarSign className="mr-2" />
							Tổng kết
						</h4>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span>Tạm tính:</span>
								<span>
									{formatCurrency(
										parseInt(order.total_amount) +
											parseInt(order.discount_amount)
									)}
								</span>
							</div>
							{order.discount_amount > 0 && (
								<div className="flex justify-between text-green-600">
									<span>Giảm giá ({order.coupon_code}):</span>
									<span>
										-{formatCurrency(order.discount_amount)}
									</span>
								</div>
							)}
							<hr className="my-2" />
							<div className="flex justify-between font-semibold text-lg">
								<span>Tổng cộng:</span>
								<span className="text-indigo-600">
									{formatCurrency(order.total_amount)}
								</span>
							</div>
						</div>
					</div>

					{/* **Cập nhật trạng thái:** */}
					<div className="bg-gray-50 p-4 rounded-lg">
						<h4 className="font-semibold text-gray-800 mb-3">
							Cập nhật trạng thái
						</h4>
						<select
							value={order.status}
							onChange={(e) =>
								onUpdateStatus(order.order_id, e.target.value)
							}
							disabled={isUpdating}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
						>
							{statusOptions.slice(1).map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="mt-6 flex justify-end">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
					>
						Đóng
					</button>
				</div>
			</div>
		</div>
	);
};

export default OrderDetailModal;
