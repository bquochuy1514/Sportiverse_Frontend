// src/components/layout/header/CartIcon.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../../contexts/CartContext';

const CartIcon = () => {
	const { cartItemsCount } = useCart();

	return (
		<Link
			to="/cart"
			className="flex flex-col items-center text-xs text-gray-700 hover:text-blue-600"
		>
			<div className="relative">
				<FaShoppingCart className="h-6 w-6" />
				<span className="absolute -top-1 -right-2 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
					{cartItemsCount}
				</span>
			</div>
			<span>Giỏ hàng</span>
		</Link>
	);
};

export default CartIcon;
