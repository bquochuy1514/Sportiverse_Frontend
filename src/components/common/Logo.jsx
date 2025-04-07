// src/components/common/Logo/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = '' }) => {
	return (
		<Link to="/" className={`flex items-center ${className}`}>
			<div className="flex items-center">
				<svg
					width="40"
					height="40"
					viewBox="0 0 36 36"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="mr-2"
				>
					<path
						d="M18 3.375C9.92 3.375 3.375 9.92 3.375 18C3.375 26.08 9.92 32.625 18 32.625C26.08 32.625 32.625 26.08 32.625 18C32.625 9.92 26.08 3.375 18 3.375Z"
						fill="#2563EB"
					/>
					<path
						d="M23.625 13.5C24.8676 13.5 25.875 12.4926 25.875 11.25C25.875 10.0074 24.8676 9 23.625 9C22.3824 9 21.375 10.0074 21.375 11.25C21.375 12.4926 22.3824 13.5 23.625 13.5Z"
						fill="white"
					/>
					<path
						d="M14.625 18C15.8676 18 16.875 16.9926 16.875 15.75C16.875 14.5074 15.8676 13.5 14.625 13.5C13.3824 13.5 12.375 14.5074 12.375 15.75C12.375 16.9926 13.3824 18 14.625 18Z"
						fill="white"
					/>
					<path
						d="M21.375 22.5C22.6176 22.5 23.625 21.4926 23.625 20.25C23.625 19.0074 22.6176 18 21.375 18C20.1324 18 19.125 19.0074 19.125 20.25C19.125 21.4926 20.1324 22.5 21.375 22.5Z"
						fill="white"
					/>
					<path
						d="M12.375 27C13.6176 27 14.625 25.9926 14.625 24.75C14.625 23.5074 13.6176 22.5 12.375 22.5C11.1324 22.5 10.125 23.5074 10.125 24.75C10.125 25.9926 11.1324 27 12.375 27Z"
						fill="white"
					/>
					<path
						d="M23.625 9C22.95 9 22.275 9.225 21.825 9.675L14.625 16.875L12.375 22.5L18 20.25L25.2 13.05C26.1 12.15 26.1 10.8 25.2 9.9C24.75 9.225 24.3 9 23.625 9Z"
						fillOpacity="0.3"
						fill="white"
					/>
				</svg>
				<div className="flex flex-col">
					<span className="text-blue-700 font-bold text-xl leading-none">
						SPORTIVERSE
					</span>
					<span className="text-blue-600 text-xs leading-none mt-1">
						Sports Equipment Store
					</span>
				</div>
			</div>
		</Link>
	);
};

export default Logo;
