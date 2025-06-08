import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { FaShoppingCart } from 'react-icons/fa';
import UserInfoSection from '../../components/checkout/UserInfoSection';
import CartItemsSection from '../../components/checkout/CartItemsSection';
import CouponSection from '../../components/checkout/CouponSection';
import OrderSummarySection from '../../components/checkout/OrderSummarySection';

const CheckOutPage = () => {
	const { token, user } = useAuth();
	const [totalAmount, setTotalAmount] = useState(0);
	const [couponCode, setCouponCode] = useState('');
	const [discountAmount, setDiscountAmount] = useState(0);
	const [finalAmount, setFinalAmount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [userInfo, setUserInfo] = useState(null);

	// Lấy thông tin người dùng
	useEffect(() => {
		const fetchUserInfo = async () => {
			if (!token) return;

			try {
				const response = await fetch('/api/user/profile', {
					headers: {
						Authorization: `Bearer ${token}`,
						'ngrok-skip-browser-warning': 'true',
					},
				});
				const result = await response.json();
				if (result.success) {
					setUserInfo(result.data);
				}
			} catch (err) {
				console.error('Error fetching user info:', err);
			}
		};

		if (user) {
			setUserInfo(user);
		} else {
			fetchUserInfo();
		}
	}, [token, user]);

	// Lấy thông tin giỏ hàng
	useEffect(() => {
		const fetchCart = async () => {
			if (!token) {
				setTotalAmount(0);
				setCartItems([]);
				return;
			}

			try {
				const response = await fetch('/api/my-cart', {
					headers: {
						Authorization: `Bearer ${token}`,
						'ngrok-skip-browser-warning': 'true',
					},
				});
				const result = await response.json();
				console.log(result);

				if (result.success) {
					setCartItems(result.data.items || []);
				} else {
					toast.error(result.message || 'Không thể tải giỏ hàng');
				}
			} catch (err) {
				console.error('Error fetching cart:', err);
				toast.error('Có lỗi khi tải giỏ hàng');
			}
		};

		fetchCart();
	}, [token]);

	useEffect(() => {
		// Tính tổng giá sau khi giảm giá sản phẩm
		const finalTotal = cartItems.reduce((total, item) => {
			const itemPrice =
				item.product.sale_price > 0
					? item.product.sale_price
					: item.price;
			return total + itemPrice * item.quantity;
		}, 0);
		setTotalAmount(finalTotal || 0);
		setFinalAmount(finalTotal || 0);
	}, [cartItems]);

	// Xử lý áp dụng mã giảm giá
	const handleApplyCoupon = async () => {
		if (!couponCode) {
			toast.error('Vui lòng nhập mã giảm giá!');
			return;
		}

		setLoading(true);

		try {
			const response = await fetch('/api/coupons/apply', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'ngrok-skip-browser-warning': 'true',
				},
				body: JSON.stringify({
					code: couponCode,
					total_amount: totalAmount,
				}),
			});

			const result = await response.json();

			if (result.success) {
				setDiscountAmount(result.data.discount_amount);
				setFinalAmount(totalAmount - result.data.discount_amount);
				toast.success(result.message);
			} else {
				toast.error(result.message);
			}
		} catch (err) {
			console.error('Error applying coupon:', err);
			toast.error('Có lỗi khi áp dụng mã giảm giá');
		} finally {
			setLoading(false);
		}
	};

	// Xử lý xóa mã giảm giá
	const handleRemoveCoupon = () => {
		setCouponCode('');
		setDiscountAmount(0);
		setFinalAmount(totalAmount);
		toast.info('Đã xóa mã giảm giá');
	};

	// Xử lý đặt hàng
	const handlePlaceOrder = async () => {
		if (!userInfo) {
			toast.error('Vui lòng đăng nhập để đặt hàng!');
			return;
		}

		if (!userInfo.phone) {
			toast.error('Vui lòng cập nhật số điện thoại!');
			return;
		}

		if (!userInfo.address) {
			toast.error('Vui lòng cập nhật địa chỉ!');
			return;
		}

		setLoading(true);

		try {
			const response = await fetch('/api/orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'ngrok-skip-browser-warning': 'true',
				},
				body: JSON.stringify({
					shipping_name:
						userInfo.name || userInfo.full_name || 'Khách hàng',
					shipping_phone: userInfo.phone,
					shipping_address: userInfo.address,
					coupon_code: couponCode || null,
				}),
			});

			const result = await response.json();

			if (result.success) {
				toast.success('Đặt hàng thành công!');
				setCartItems([]);
				setTotalAmount(0);
				setFinalAmount(0);
				setCouponCode('');
				setDiscountAmount(0);
			} else {
				toast.error(result.message || 'Có lỗi khi đặt hàng');
			}
		} catch (err) {
			console.error('Error placing order:', err);
			toast.error('Có lỗi khi đặt hàng');
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 mt-4">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-4">
					<h1 className="text-lg font-bold text-gray-800 flex items-center justify-start gap-3">
						<div className="p-3 bg-blue-600 rounded-full text-white">
							<FaShoppingCart className="text-sm" />
						</div>
						Thanh toán đơn hàng
					</h1>
				</div>
				<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
					<div className="xl:col-span-2 space-y-6">
						<UserInfoSection userInfo={userInfo} />
						<CartItemsSection cartItems={cartItems} />
						<CouponSection
							couponCode={couponCode}
							setCouponCode={setCouponCode}
							discountAmount={discountAmount}
							handleApplyCoupon={handleApplyCoupon}
							handleRemoveCoupon={handleRemoveCoupon}
							loading={loading}
							token={token}
						/>
					</div>
					<OrderSummarySection
						totalAmount={totalAmount}
						discountAmount={discountAmount}
						finalAmount={finalAmount}
						handlePlaceOrder={handlePlaceOrder}
						token={token}
						cartItems={cartItems}
						loading={loading}
					/>
				</div>
			</div>
		</section>
	);
};

export default CheckOutPage;
