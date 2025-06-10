import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	FaCheckCircle,
	FaShoppingBag,
	FaHome,
	FaReceipt,
	FaPhone,
	FaEnvelope,
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const OrderSuccessPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useAuth();
	const [orderDetails, setOrderDetails] = useState(null);
	const [countdown, setCountdown] = useState(15);

	// Lấy thông tin đơn hàng từ state hoặc localStorage
	useEffect(() => {
		const orderData =
			location.state?.orderData ||
			JSON.parse(localStorage.getItem('lastOrder') || '{}');

		if (orderData && Object.keys(orderData).length > 0) {
			setOrderDetails(orderData);
		}
	}, [location.state]);

	// Countdown để tự động redirect về trang chủ
	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					navigate('/');
					return 0;
				}
				return prev - 1;
			});
		}, 1500);

		return () => clearInterval(timer);
	}, [navigate]);

	const handleContinueShopping = () => {
		navigate('/products');
	};

	const handleViewOrders = () => {
		navigate('/orders');
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
		<section className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100 py-8 mt-8">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Success Animation */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-2 animate-bounce">
						<FaCheckCircle className="text-5xl text-green-600" />
					</div>
					<h1 className="text-4xl font-bold text-gray-800 mb-4">
						Đặt hàng thành công! 🎉
					</h1>
					<p className="text-lg text-gray-600 mb-2">
						Cảm ơn bạn đã tin tưởng và mua sắm tại cửa hàng của
						chúng tôi
					</p>
					<p className="text-lg text-gray-500">
						Trang sẽ tự động chuyển về trang chủ sau{' '}
						<span className="text-blue-500">{countdown}</span> giây
					</p>
				</div>

				{/* Order Details Card */}
				<div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
					<div className="bg-gradient-to-r from-green-500 to-blue-600 px-6 py-4">
						<h2 className="text-2xl font-bold text-white flex items-center gap-3">
							<FaReceipt />
							Thông tin đơn hàng
						</h2>
					</div>

					<div className="p-6 space-y-6">
						{/* Order Info */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-4">
								<div>
									<h3 className="text-lg font-semibold text-gray-800 mb-3">
										Chi tiết đơn hàng
									</h3>
									<div className="space-y-2">
										{orderDetails?.order_id && (
											<p className="text-gray-600">
												<span className="font-medium">
													Mã đơn hàng:
												</span>{' '}
												<span className="text-blue-600 font-mono">
													#{orderDetails.order_id}
												</span>
											</p>
										)}
										<p className="text-gray-600">
											<span className="font-medium">
												Thời gian đặt:
											</span>{' '}
											{orderDetails?.created_at
												? formatDate(
														orderDetails.created_at
												  )
												: formatDate(new Date())}
										</p>
										<p className="text-gray-600">
											<span className="font-medium">
												Trạng thái:
											</span>{' '}
											<span className="inline-flex px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
												Đang xử lý
											</span>
										</p>
									</div>
								</div>
							</div>

							<div className="space-y-4">
								<div>
									<h3 className="text-lg font-semibold text-gray-800 mb-3">
										Thông tin giao hàng
									</h3>
									<div className="space-y-2">
										<p className="text-gray-600">
											<span className="font-medium">
												Người nhận:
											</span>{' '}
											{orderDetails?.shipping_name ||
												user?.name ||
												'Khách hàng'}
										</p>
										<p className="text-gray-600">
											<span className="font-medium">
												Số điện thoại:
											</span>{' '}
											{orderDetails?.shipping_phone ||
												user?.phone}
										</p>
										<p className="text-gray-600">
											<span className="font-medium">
												Địa chỉ:
											</span>{' '}
											{orderDetails?.shipping_address ||
												user?.address}
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Order Summary */}
						{orderDetails && (
							<div className="border-t pt-6">
								<h3 className="text-lg font-semibold text-gray-800 mb-4">
									Tóm tắt đơn hàng
								</h3>
								<div className="bg-gray-50 rounded-lg p-4 space-y-3">
									<div className="flex justify-between">
										<span className="text-gray-600">
											Tổng tiền hàng:
										</span>
										<span className="font-medium">
											{formatCurrency(
												orderDetails.total_amount || 0
											)}
										</span>
									</div>
									{orderDetails.discount_amount > 0 && (
										<div className="flex justify-between text-green-600">
											<span>Giảm giá:</span>
											<span className="font-medium">
												-
												{formatCurrency(
													orderDetails.discount_amount
												)}
											</span>
										</div>
									)}
									<div className="border-t pt-3 flex justify-between text-lg font-bold">
										<span>Tổng thanh toán:</span>
										<span className="text-blue-600">
											{formatCurrency(
												orderDetails.final_amount ||
													orderDetails.total_amount ||
													0
											)}
										</span>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Next Steps */}
				<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
					<h3 className="text-xl font-bold text-gray-800 mb-4">
						Bước tiếp theo
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="text-center p-4 bg-blue-50 rounded-lg">
							<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
								<span className="text-blue-600 font-bold">
									1
								</span>
							</div>
							<h4 className="font-semibold text-gray-800 mb-2">
								Xác nhận đơn hàng
							</h4>
							<p className="text-sm text-gray-600">
								Chúng tôi sẽ xác nhận đơn hàng trong vòng 15-30
								phút
							</p>
						</div>
						<div className="text-center p-4 bg-yellow-50 rounded-lg">
							<div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
								<span className="text-yellow-600 font-bold">
									2
								</span>
							</div>
							<h4 className="font-semibold text-gray-800 mb-2">
								Chuẩn bị hàng
							</h4>
							<p className="text-sm text-gray-600">
								Đóng gói và chuẩn bị hàng trong 1-2 ngày làm
								việc
							</p>
						</div>
						<div className="text-center p-4 bg-green-50 rounded-lg">
							<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
								<span className="text-green-600 font-bold">
									3
								</span>
							</div>
							<h4 className="font-semibold text-gray-800 mb-2">
								Giao hàng
							</h4>
							<p className="text-sm text-gray-600">
								Giao hàng tận nơi trong 3-5 ngày làm việc
							</p>
						</div>
					</div>
				</div>

				{/* Contact Info */}
				<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
					<h3 className="text-xl font-bold text-gray-800 mb-4">
						Cần hỗ trợ?
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
								<FaPhone className="text-blue-600" />
							</div>
							<div>
								<p className="font-medium text-gray-800">
									Hotline
								</p>
								<p className="text-blue-600">1900-xxxx</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
								<FaEnvelope className="text-green-600" />
							</div>
							<div>
								<p className="font-medium text-gray-800">
									Email
								</p>
								<p className="text-green-600">
									support@yourstore.com
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<button
						onClick={handleViewOrders}
						className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
					>
						<FaShoppingBag />
						Xem đơn hàng của tôi
					</button>
					<button
						onClick={handleContinueShopping}
						className="flex items-center justify-center gap-2 px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200"
					>
						<FaHome />
						Tiếp tục mua sắm
					</button>
				</div>
			</div>
		</section>
	);
};

export default OrderSuccessPage;
