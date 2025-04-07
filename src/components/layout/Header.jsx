// src/components/layout/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

const Header = () => {
	const [searchQuery, setSearchQuery] = useState('');

	return (
		<header className="bg-blue-50 shadow-sm border-b">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="flex-shrink-0">
						<Logo />
					</div>

					{/* Search bar */}
					<div className="flex-1 max-w-2xl mx-4">
						<div className="relative">
							<input
								type="text"
								className="w-full bg-white border border-blue-200 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
								placeholder="Tìm kiếm sản phẩm, môn thể thao"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<svg
									className="h-5 w-5 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									></path>
								</svg>
							</div>
						</div>
					</div>

					{/* Right navigation */}
					<div className="flex items-center space-x-6">
						{/* Địa điểm */}
						<Link
							to="/stores"
							className="hidden md:flex flex-col items-center text-xs text-gray-700 hover:text-blue-600"
						>
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
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								></path>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								></path>
							</svg>
							<span>Địa điểm</span>
						</Link>

						{/* Hỗ trợ */}
						<Link
							to="/support"
							className="hidden md:flex flex-col items-center text-xs text-gray-700 hover:text-blue-600"
						>
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
									d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
							<span>Hỗ trợ</span>
						</Link>

						{/* Đăng nhập */}
						<Link
							to="/login"
							className="flex flex-col items-center text-xs text-gray-700 hover:text-blue-600"
						>
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
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								></path>
							</svg>
							<span>Đăng nhập</span>
						</Link>

						{/* Giỏ hàng */}
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
								<span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
									0
								</span>
							</div>
							<span>Giỏ hàng</span>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
