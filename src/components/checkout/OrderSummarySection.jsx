import { FaCreditCard, FaSpinner } from 'react-icons/fa';

const OrderSummarySection = ({
	totalAmount,
	discountAmount,
	finalAmount,
	handlePlaceOrder,
	token,
	cartItems,
	loading,
}) => {
	return (
		<div className="xl:col-span-1">
			<div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-8">
				<div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
					<h2 className="text-xl font-semibold text-white">
						Tổng kết đơn hàng
					</h2>
				</div>
				<div className="p-6 space-y-6">
					<div className="space-y-4">
						<div className="flex justify-between items-center py-2">
							<span className="text-gray-600 font-medium">
								Tổng tiền hàng:
							</span>
							<span className="font-semibold text-gray-800">
								{totalAmount.toLocaleString('vi-VN')} đ
							</span>
						</div>
						<div className="flex justify-between items-center py-2">
							<span className="text-gray-600 font-medium">
								Phí vận chuyển:
							</span>
							<span className="font-semibold text-green-600">
								Miễn phí
							</span>
						</div>
						{discountAmount > 0 && (
							<div className="flex justify-between items-center py-2 bg-green-50 px-3 rounded-lg">
								<span className="text-green-700 font-medium">
									Giảm giá:
								</span>
								<span className="text-green-700 font-bold">
									-
									{parseInt(discountAmount).toLocaleString(
										'vi-VN'
									)}{' '}
									đ
								</span>
							</div>
						)}
						<div className="border-t border-gray-200 pt-4">
							<div className="flex justify-between items-center">
								<span className="text-lg font-bold text-gray-800">
									Tổng thanh toán:
								</span>
								<span className="text-2xl font-bold text-green-600">
									{finalAmount.toLocaleString('vi-VN')} đ
								</span>
							</div>
						</div>
					</div>
					<button
						className={`w-full py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl flex items-center justify-center gap-3 font-semibold text-lg transition-all transform hover:scale-105 hover:shadow-lg ${
							!token || cartItems.length === 0 || loading
								? 'opacity-50 cursor-not-allowed hover:scale-100'
								: ''
						}`}
						disabled={!token || cartItems.length === 0 || loading}
						onClick={handlePlaceOrder}
					>
						{loading ? (
							<>
								<FaSpinner className="animate-spin" />
								Đang xử lý...
							</>
						) : (
							<>
								<FaCreditCard className="text-xl" />
								Đặt hàng
							</>
						)}
					</button>
					<div className="text-center text-sm text-gray-500 space-y-2">
						<p className="flex items-center justify-center gap-2">
							🔒 Thanh toán an toàn & bảo mật
						</p>
						<p>Thông tin của bạn được mã hóa SSL</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderSummarySection;
