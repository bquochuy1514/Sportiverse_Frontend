import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrderSummary = ({ cartItems }) => {
	const navigate = useNavigate();
	const [summaryData, setSummaryData] = useState({
		originalTotal: 0,
		finalTotal: 0,
		productDiscount: 0,
	});

	// Cập nhật giá khi cartItems thay đổi
	useEffect(() => {
		// Tính tổng giá gốc
		const originalTotal = cartItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);

		// Tính tổng giá sau khi giảm giá sản phẩm
		const finalTotal = cartItems.reduce((total, item) => {
			const itemPrice =
				item.product.sale_price > 0
					? item.product.sale_price
					: item.price;
			return total + itemPrice * item.quantity;
		}, 0);

		// Tính số tiền giảm giá sản phẩm
		const productDiscount = originalTotal - finalTotal;

		setSummaryData({
			originalTotal,
			finalTotal,
			productDiscount,
		});
	}, [cartItems]);

	// Format tiền tệ VND
	const formatPrice = (price) => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price);
	};

	const shippingFee = 0; // Phí vận chuyển
	const total = summaryData.finalTotal + shippingFee;

	const handleContinueShopping = () => {
		navigate('/products');
	};

	const handleCheckout = () => {
		navigate('/checkout');
	};

	const handleCopyVoucher = () => {
		navigator.clipboard.writeText('SUMMER2025');
		toast.success('Đã sao chép mã giảm giá');
	};

	return (
		<div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
			<h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-3">
				Tóm tắt đơn hàng
			</h2>

			<div className="space-y-3">
				<div className="flex justify-between items-center">
					<span className="text-gray-600">Tạm tính</span>
					<span className="font-medium">
						{formatPrice(summaryData.originalTotal)}
					</span>
				</div>

				{summaryData.productDiscount > 0 && (
					<div className="flex justify-between items-center text-green-600">
						<span>Giảm giá sản phẩm</span>
						<span>-{formatPrice(summaryData.productDiscount)}</span>
					</div>
				)}

				<div className="flex justify-between items-center">
					<span className="text-gray-600">Giao hàng</span>
					<span>
						{shippingFee === 0
							? 'Tính khi thanh toán'
							: formatPrice(shippingFee)}
					</span>
				</div>

				<div className="border-t border-gray-200 pt-3 mt-3">
					<div className="flex justify-between items-center font-bold text-lg">
						<span>Tổng</span>
						<span>{formatPrice(total)}</span>
					</div>
				</div>
			</div>

			{/* Phần khuyến mãi */}
			<div className="mt-6 bg-yellow-100 p-4 rounded-lg">
				<div className="flex items-start mb-2">
					<div className="mr-3">
						<svg
							className="h-6 w-6"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M19 14C20.6569 14 22 12.6569 22 11C22 9.34315 20.6569 8 19 8C17.3431 8 16 9.34315 16 11C16 12.6569 17.3431 14 19 14Z"
								stroke="#FF9800"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M5 14C6.65685 14 8 12.6569 8 11C8 9.34315 6.65685 8 5 8C3.34315 8 2 9.34315 2 11C2 12.6569 3.34315 14 5 14Z"
								stroke="#FF9800"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M19 14V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V14"
								stroke="#FF9800"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M19 8V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V8"
								stroke="#FF9800"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<div>
						<h3 className="font-bold text-gray-800">
							CHẮNG LO UV, THỂ THAO HẾT Ý
						</h3>
						<p className="text-sm mt-1">
							Nhập mã{' '}
							<span className="font-semibold text-blue-600">
								SUMMER2025
							</span>{' '}
							giảm ngay 20% + freeship đơn hàng từ 100K!
						</p>
					</div>
				</div>
				<button
					onClick={handleCopyVoucher}
					className="bg-blue-600 text-white text-sm uppercase py-1 px-3 rounded hover:bg-blue-700 transition-colors"
				>
					SAO CHÉP
				</button>
			</div>

			{/* Các nút hành động */}
			<div className="mt-6 space-y-3">
				<button
					onClick={handleCheckout}
					className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-medium"
				>
					THANH TOÁN
				</button>
				<button
					onClick={handleContinueShopping}
					className="w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50 transition-colors font-medium"
				>
					MUA THÊM
				</button>
			</div>
		</div>
	);
};

export default OrderSummary;
