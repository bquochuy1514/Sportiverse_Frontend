// src/pages/Cart/CartPage.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import cartService from '../../services/CartService';
import { toast } from 'react-toastify';

const CartPage = () => {
	const navigate = useNavigate();
	const [cartItems, setCartItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchCartItems = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await fetch('/api/my-cart', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			const data = await response.json();
			console.log('cart items:', data.data.items);
			if (data.success) {
				setCartItems(data.data.items || []);
			} else {
				setError('Không thể tải giỏ hàng');
			}
		} catch (err) {
			setError('Lỗi khi tải giỏ hàng');
			console.error('Error fetching cart:', err);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchCartItems();
	}, [fetchCartItems]);

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleGoToProducts = () => {
		navigate('/products');
	};

	const handleDeleteCartItem = async (cartItemId) => {
		try {
			const data = await cartService.removeFromCart(cartItemId);
			console.log('Remove response:', data);
			if (data.success) {
				// Cập nhật state cartItems trực tiếp
				setCartItems((prevItems) => {
					return prevItems.filter((item) => item.id !== cartItemId);
				});
				toast.success(data.message);
				setError(null);
			} else {
				setError(
					data.message || 'Không thể xóa sản phẩm khỏi giỏ hàng'
				);
			}
		} catch (err) {
			setError(err.message || 'Lỗi khi xóa sản phẩm khỏi giỏ hàng');
			console.error('Error deleting cart item:', err);
		}
	};

	const handleQuantityChange = (itemId, newQuantity) => {
		// Cập nhật số lượng trong state cartItems
		setCartItems((prevItems) =>
			prevItems.map((item) =>
				item.id === itemId ? { ...item, quantity: newQuantity } : item
			)
		);
	};

	// Loading skeleton component
	if (isLoading) {
		return (
			<div className="max-w-screen-xl mx-auto px-4 py-8">
				<div className="h-8 w-32 bg-gray-200 rounded-md animate-pulse mb-6"></div>
				<div className="grid grid-cols-1 gap-6">
					<div className="space-y-4">
						{[1, 2, 3].map((item) => (
							<div
								key={item}
								className="animate-pulse bg-white p-5 rounded-lg shadow-sm flex"
							>
								<div className="bg-gray-200 h-28 w-28 rounded-lg"></div>
								<div className="ml-5 flex-1 space-y-3">
									<div className="bg-gray-200 h-6 w-3/4 rounded-md"></div>
									<div className="bg-gray-200 h-4 w-1/2 rounded-md"></div>
									<div className="bg-gray-200 h-8 w-32 rounded-md"></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}

	// If cart is empty
	if (cartItems.length === 0 && !isLoading) {
		return <EmptyCart onContinueShopping={handleGoToProducts} />;
	}

	return (
		<section className="py-8 bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 min-h-screen">
			<div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Back button */}
				<button
					onClick={handleGoBack}
					className="group inline-flex items-center mt-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
				>
					<span className="mr-2">
						<FaArrowLeft className="h-4 w-4" />
					</span>
					<span className="font-medium text-lg">Quay lại</span>
				</button>

				{/* Page title */}
				<div className="flex items-center mb-8">
					<div className="bg-blue-100 p-3 rounded-full mr-3">
						<FaShoppingCart className="h-6 w-6 text-blue-600" />
					</div>
					<h1 className="text-2xl font-bold text-gray-800">
						Giỏ hàng của bạn
					</h1>
					<span className="ml-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
						{cartItems.length} sản phẩm
					</span>
				</div>

				{error && (
					<div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 shadow-sm">
						<div className="flex items-center">
							<svg
								className="h-5 w-5 text-red-500 mr-2"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clipRule="evenodd"
								/>
							</svg>
							<p>{error}</p>
						</div>
					</div>
				)}

				{/* Layout với 2 cột */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Cart Items - chiếm 2/3 màn hình trên desktop */}
					<div className="lg:col-span-2 space-y-5">
						{cartItems.map((item) => (
							<CartItem
								key={item.id}
								item={item}
								onDelete={() => handleDeleteCartItem(item.id)}
								onQuantityChange={(newQuantity) =>
									handleQuantityChange(item.id, newQuantity)
								}
							/>
						))}
					</div>

					{/* Order Summary - chiếm 1/3 màn hình trên desktop */}
					<div className="lg:col-span-1">
						<OrderSummary cartItems={cartItems} />
					</div>
				</div>
			</div>

			{/* CSS để ẩn spinner cho input number */}
			<style jsx>{`
				input[type='number']::-webkit-outer-spin-button,
				input[type='number']::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
				input[type='number'] {
					-moz-appearance: textfield;
				}
			`}</style>
		</section>
	);
};

export default CartPage;
