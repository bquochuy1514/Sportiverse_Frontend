// src/components/common/NavItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({
	to,
	icon,
	label,
	badge,
	onClick,
	className = '',
	hidden = false,
}) => {
	const baseClasses = `flex flex-col items-center text-xs text-gray-700 hover:text-blue-600 ${className}`;
	const visibilityClasses = hidden ? 'hidden md:flex' : 'flex';

	const content = (
		<>
			<div className="relative">
				{icon}
				{badge && (
					<span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
						{badge}
					</span>
				)}
			</div>
			<span className="mt-1">{label}</span>
		</>
	);

	if (onClick) {
		return (
			<button
				onClick={onClick}
				className={`${baseClasses} ${visibilityClasses}`}
			>
				{content}
			</button>
		);
	}

	return (
		<Link to={to} className={`${baseClasses} ${visibilityClasses}`}>
			{content}
		</Link>
	);
};

export default NavItem;
