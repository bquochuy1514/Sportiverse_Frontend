import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import {
	FaShoppingBag,
	FaCalendarAlt,
	FaUser,
	FaMapMarkerAlt,
	FaBox,
	FaTag,
} from 'react-icons/fa';

const OrdersPage = () => {
	const { token } = useAuth();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOrders = async () => {
			if (!token) {
				setLoading(false);
				return;
			}

			try {
				const response = await fetch('/api/orders', {
					headers: {
						Authorization: `Bearer ${token}`,
						'ngrok-skip-browser-warning': 'true',
					},
				});
				const result = await response.json();
				if (result.success) {
					setOrders(result.data);
				} else {
					toast.error(
						result.message || 'Không thể tải danh sách đơn hàng'
					);
				}
			} catch (err) {
				console.error('Error fetching orders:', err);
				toast.error('Có lỗi khi tải danh sách đơn hàng');
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, [token]);

	const getStatusConfig = (status) => {
		const configs = {
			pending: {
				bg: 'bg-gradient-to-r from-yellow-100 to-yellow-50',
				text: 'text-yellow-800',
				border: 'border-yellow-200',
				icon: 'bg-yellow-500',
				label: 'Đang chờ xử lý',
			},
			shipped: {
				bg: 'bg-gradient-to-r from-green-100 to-green-50',
				text: 'text-green-800',
				border: 'border-green-200',
				icon: 'bg-green-500',
				label: 'Đã gửi hàng',
			},
			processing: {
				bg: 'bg-gradient-to-r from-blue-100 to-blue-50',
				text: 'text-blue-800',
				border: 'border-blue-200',
				icon: 'bg-blue-500',
				label: 'Đang xử lý',
			},
			delivered: {
				bg: 'bg-gradient-to-r from-purple-100 to-purple-50',
				text: 'text-purple-800',
				border: 'border-purple-200',
				icon: 'bg-purple-500',
				label: 'Đã giao hàng',
			},
			cancelled: {
				bg: 'bg-gradient-to-r from-red-100 to-red-50',
				text: 'text-red-800',
				border: 'border-red-200',
				icon: 'bg-red-500',
				label: 'Đã hủy',
			},
		};
		return configs[status] || configs.pending;
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center">
				<div className="text-center">
					<div className="relative">
						<div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
						<div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-400 animate-ping mx-auto"></div>
					</div>
					<p className="text-gray-600 mt-4 font-medium">
						Đang tải danh sách đơn hàng...
					</p>
				</div>
			</div>
		);
	}

	return (
		<section className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-8 mt-4">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-10">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
						<FaShoppingBag className="text-white text-xl" />
					</div>
					<h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
						Danh sách đơn hàng
					</h1>
					<p className="text-gray-600">
						Quản lý và theo dõi các đơn hàng của bạn
					</p>
				</div>

				{orders.length > 0 ? (
					<div className="space-y-8">
						{orders.map((order, index) => {
							const statusConfig = getStatusConfig(order.status);
							return (
								<div
									key={order.order_id}
									className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
									style={{
										animationDelay: `${index * 100}ms`,
										animation:
											'slideInUp 0.6s ease-out forwards',
									}}
								>
									{/* Gradient Border */}
									<div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
									<div className="relative bg-white m-[1px] rounded-2xl p-6">
										{/* Order Header */}
										<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
											<div className="flex items-center gap-3">
												<div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
													<FaBox className="text-blue-600 text-lg" />
												</div>
												<div>
													<h2 className="text-xl font-bold text-gray-800">
														Đơn hàng #
														{order.order_id}
													</h2>
													<div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
														<FaCalendarAlt className="w-3 h-3" />
														{new Date(
															order.created_at
														).toLocaleString(
															'vi-VN'
														)}
													</div>
												</div>
											</div>

											<div
												className={`px-4 py-2 rounded-xl border-2 ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} font-semibold text-sm shadow-sm`}
											>
												<div className="flex items-center gap-2">
													<div
														className={`w-2 h-2 rounded-full ${statusConfig.icon}`}
													></div>
													{statusConfig.label}
												</div>
											</div>
										</div>

										{/* Order Info */}
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
											<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
												<FaUser className="text-blue-600 text-sm" />
												<div>
													<p className="text-xs text-gray-500 uppercase tracking-wide">
														Người nhận
													</p>
													<p className="font-semibold text-gray-800">
														{order.shipping_name}
													</p>
												</div>
											</div>
											<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
												<FaMapMarkerAlt className="text-red-500 text-sm" />
												<div>
													<p className="text-xs text-gray-500 uppercase tracking-wide">
														Địa chỉ giao hàng
													</p>
													<p className="font-semibold text-gray-800 text-sm">
														{order.shipping_address}
													</p>
												</div>
											</div>
										</div>

										{/* Order Items */}
										<div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 mb-6">
											<h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
												<FaBox className="text-blue-600" />
												Sản phẩm đã đặt
											</h3>
											<div className="space-y-4">
												{order.order_items.map(
													(item) => (
														<div
															key={
																item.product_id
															}
															className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
														>
															<div className="relative group">
																<img
																	src={
																		item.image ||
																		'/api/placeholder/80/80'
																	}
																	alt={
																		item.product_name
																	}
																	className="w-16 h-16 object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300"
																/>
																<div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
																	{
																		item.quantity
																	}
																</div>
															</div>
															<div className="flex-grow">
																<p className="font-semibold text-gray-800 mb-1">
																	{
																		item.product_name
																	}
																</p>
																<div className="flex items-center gap-2 text-sm text-gray-600">
																	<span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg font-medium">
																		{
																			item.quantity
																		}{' '}
																		x{' '}
																		{parseInt(
																			item.unit_price
																		).toLocaleString(
																			'vi-VN'
																		)}
																		đ
																	</span>
																</div>
															</div>
															<div className="text-right">
																<p className="text-lg font-bold text-gray-800">
																	{parseInt(
																		item.subtotal
																	).toLocaleString(
																		'vi-VN'
																	)}
																	đ
																</p>
															</div>
														</div>
													)
												)}
											</div>
										</div>

										{/* Order Summary */}
										<div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4">
											<div className="flex justify-between items-center mb-3">
												<div className="flex items-center gap-2 text-gray-600">
													<FaTag className="text-green-500" />
													<span className="font-medium">
														Giảm giá
													</span>
												</div>
												<span className="text-green-600 font-semibold">
													-
													{parseInt(
														order.discount_amount
													).toLocaleString('vi-VN')}
													đ
												</span>
											</div>
											<div className="border-t border-gray-200 pt-3">
												<div className="flex justify-between items-center">
													<span className="text-lg font-semibold text-gray-700">
														Tổng thanh toán
													</span>
													<span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
														{parseInt(
															order.total_amount
														).toLocaleString(
															'vi-VN'
														)}
														đ
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<div className="text-center py-16">
						<div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full mb-6">
							<FaShoppingBag className="text-gray-400 text-3xl" />
						</div>
						<h3 className="text-xl font-semibold text-gray-700 mb-2">
							Chưa có đơn hàng nào
						</h3>
						<p className="text-gray-500 mb-6">
							Bạn chưa thực hiện đơn hàng nào. Hãy bắt đầu mua sắm
							ngay!
						</p>
						<button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
							Khám phá sản phẩm
						</button>
					</div>
				)}
			</div>

			<style jsx>{`
				@keyframes slideInUp {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</section>
	);
};

export default OrdersPage;
