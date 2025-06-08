import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../../../contexts/AuthContext';

const CartIcon = () => {
	const [cartItemsCount, setCartItemsCount] = useState(0);
	const { token } = useAuth();

	useEffect(() => {
		const fetchCartItemsCount = async () => {
			if (!token) {
				setCartItemsCount(0); // Reset về 0 nếu chưa đăng nhập
				return;
			}
			try {
				const response = await fetch('/api/cart/count', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const result = await response.json();
				if (result.success) {
					setCartItemsCount(result.data.item_count);
				}
			} catch (err) {
				console.error('Error fetching cart count:', err);
			}
		};
		fetchCartItemsCount();
	}, [token]); // Gọi lại khi token thay đổi

	return (
		<Link
			to="/cart"
			className="flex flex-col items-center text-xs text-gray-700 hover:text-blue-600"
		>
			<div className="relative">
				<FaShoppingCart className="h-6 w-6" />
				{cartItemsCount == 0 ? (
					<span className="absolute -top-1 -right-2 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
						0
					</span>
				) : (
					<span className="absolute -top-1 -right-2 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
						{cartItemsCount}
					</span>
				)}
			</div>
			<span>Giỏ hàng</span>
		</Link>
	);
};

export default CartIcon;
