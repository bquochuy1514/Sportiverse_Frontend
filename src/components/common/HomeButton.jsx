// src/components/common/HomeButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomeButton = ({
	variant = 'light',
	position = 'top-6 left-6',
	className = '',
}) => {
	// variant: 'light' (cho nền tối) hoặc 'dark' (cho nền sáng)
	// position: vị trí của button (classes Tailwind)
	// className: classes bổ sung

	return variant === 'light' ? (
		// Phiên bản cho nền tối (light button)
		<Link
			to="/"
			className={`absolute ${position} group flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-md rounded-xl text-white hover:from-blue-500/30 hover:to-indigo-500/30 transition-all duration-500 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 ${className}`}
		>
			<div className="relative flex items-center justify-center">
				{/* Hiệu ứng hào quang */}
				<div className="absolute -inset-3 bg-blue-400 bg-opacity-0 rounded-full blur-xl group-hover:bg-opacity-20 transition-all duration-700 -z-10 group-hover:scale-110"></div>

				{/* Icon nhà với animation */}
				<div className="relative">
					<svg
						className="h-5 w-5 mr-2.5 transform group-hover:scale-110 transition-transform duration-300"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						{/* Mái nhà */}
						<path
							d="M3 10.182L12 3l9 7.182H3z"
							fill="white"
							fillOpacity="0.3"
							className="group-hover:fill-opacity-50 transition-all duration-300"
						/>
						{/* Thân nhà */}
						<path
							d="M5 21V10h14v11H5z"
							fill="white"
							fillOpacity="0.1"
							className="group-hover:fill-opacity-30 transition-all duration-300"
						/>
						{/* Viền */}
						<path
							d="M12 3L3 10.182V21h6.5v-6h5V21H21V10.182L12 3z"
							stroke="white"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						{/* Cửa */}
						<path
							d="M9.5 21v-6h5v6"
							stroke="white"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						{/* Hiệu ứng ánh sáng */}
						<circle
							cx="12"
							cy="7"
							r="1"
							fill="white"
							className="opacity-0 group-hover:opacity-70 transition-opacity duration-700"
						/>
					</svg>

					{/* Hiệu ứng lấp lánh khi hover */}
					<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
						<div className="absolute h-5 w-0.5 bg-white bg-opacity-70 blur-sm rotate-45 group-hover:scale-x-125 transition-transform duration-700"></div>
						<div className="absolute h-5 w-0.5 bg-white bg-opacity-70 blur-sm -rotate-45 group-hover:scale-x-125 transition-transform duration-700"></div>
					</div>
				</div>
			</div>
			<span className="font-medium text-sm group-hover:text-blue-100 transition-colors duration-300">
				Trang chủ
			</span>

			{/* Viền mờ */}
			<div className="absolute inset-0 border border-white border-opacity-20 rounded-xl group-hover:border-opacity-40 transition-all duration-300 pointer-events-none"></div>

			{/* Hiệu ứng đổ bóng khi hover */}
			<div className="absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-xl"></div>
		</Link>
	) : (
		// Phiên bản cho nền sáng (dark button)
		<Link
			to="/"
			className={`absolute ${position} group flex items-center px-3 py-2 rounded-xl text-blue-600 hover:text-blue-800 transition-colors border border-blue-100 hover:border-blue-200 bg-white shadow-sm hover:shadow-md ${className}`}
		>
			<svg
				className="h-5 w-5 mr-1.5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
				/>
			</svg>
			<span className="text-sm font-medium">Trang chủ</span>
		</Link>
	);
};

export default HomeButton;
