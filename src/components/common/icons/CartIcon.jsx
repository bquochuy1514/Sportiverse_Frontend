// src/components/common/icons/CartIcon.jsx
import React from 'react';

const CartIconSvg = ({ className = 'h-6 w-6' }) => {
	return (
		<svg
			className={className}
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
	);
};

export default CartIconSvg;
