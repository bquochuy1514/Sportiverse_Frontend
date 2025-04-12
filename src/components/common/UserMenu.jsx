// src/components/common/UserMenu.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify'; // Import toast

const UserMenu = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const { user, logout } = useAuth();
	const dropdownRef = useRef(null);
	const navigate = useNavigate();

	// Xử lý đóng dropdown khi click ra ngoài
	useEffect(() => {
		function handleClickOutside(event) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setDropdownOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dropdownRef]);

	// Hàm xử lý đăng xuất
	const handleLogout = async () => {
		await logout();
		setDropdownOpen(false);
		toast.success('Đăng xuất thành công!', {
			position: 'top-right',
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		}); // Hiển thị thông báo thành công
		navigate('/');
	};

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				className="flex flex-col items-center text-xs text-gray-700 hover:text-blue-600 focus:outline-none transition duration-150 ease-in-out"
				onClick={() => setDropdownOpen(!dropdownOpen)}
			>
				<div className="relative group">
					<img
						src={user.avatar}
						alt={user.name}
						className="h-8 w-8 rounded-full object-cover border-2 border-blue-200 transition-all duration-200 group-hover:border-blue-400 shadow-sm"
					/>
					<span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white transition-all duration-200 group-hover:bg-green-500"></span>
				</div>
				<span className="mt-1 font-medium">
					{user?.name?.split(' ')[0] || 'Tài khoản'}
				</span>
			</button>

			{/* Dropdown menu with animation */}
			<div
				className={`absolute -right-12 w-56 rounded-md shadow-lg py-1 bg-transparent ring-1 ring-black ring-opacity-5 transform transition-all duration-200 ease-in-out ${
					dropdownOpen
						? 'opacity-100 scale-100 translate-y-0 z-50'
						: 'opacity-0 scale-95 -translate-y-2 -z-10'
				}`}
			>
				{/* User info header with gradient background */}
				<div className="relative">
					<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-md"></div>
					<div className="relative p-4 text-white">
						<div className="flex items-center">
							<img
								src={user.avatar}
								alt={user.name}
								className="h-10 w-10 rounded-full border-2 border-white shadow-md flex-shrink-0"
							/>
							<div className="ml-3 flex-1 min-w-0">
								<p className="text-sm font-semibold leading-tight">
									{user?.name}
								</p>
								<p className="text-xs opacity-90 truncate">
									{user?.email}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Menu items with icons */}
				<div className="bg-white py-2 rounded-b-md">
					<Link
						to="/account"
						className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
						onClick={() => setDropdownOpen(false)}
					>
						<svg
							className="h-5 w-5 mr-3 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							></path>
						</svg>
						<span>Tài khoản của tôi</span>
					</Link>

					<Link
						to="/orders"
						className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
						onClick={() => setDropdownOpen(false)}
					>
						<svg
							className="h-5 w-5 mr-3 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
							></path>
						</svg>
						<span>Đơn hàng của tôi</span>
					</Link>

					<Link
						to="/wishlist"
						className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
						onClick={() => setDropdownOpen(false)}
					>
						<svg
							className="h-5 w-5 mr-3 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							></path>
						</svg>
						<span>Danh sách yêu thích</span>
					</Link>

					<div className="border-t border-gray-100 my-1"></div>

					<button
						onClick={handleLogout}
						className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
					>
						<svg
							className="h-5 w-5 mr-3 text-red-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							></path>
						</svg>
						<span>Đăng xuất</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserMenu;
