// src/components/common/CartIcon.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CartIcon = ({ count = 0 }) => {
	return (
		<Link
			to="/cart"
			className="flex flex-col items-center text-xs text-gray-700 hover:text-blue-600"
		>
			<div className="relative">
				<svg
					className="h-6 w-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
					></path>
				</svg>
				{count > 0 && (
					<span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
						{count > 99 ? '99+' : count}
					</span>
				)}
			</div>
			<span>Giỏ hàng</span>
		</Link>
	);
};

export default CartIcon;
