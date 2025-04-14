import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { fetchCurrentUser } from '../../services/authService';
// Import các icon từ react-icons
import {
	FaUser,
	FaShoppingBag,
	FaHeart,
	FaSignOutAlt,
	FaAtom,
} from 'react-icons/fa';

const UserMenu = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const { user, setUser, logout, token } = useAuth();
	const [isAdmin, setIsAdmin] = useState(false);
	const dropdownRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const userData = await fetchCurrentUser(token);
				setUser(userData);
			} catch (error) {
				console.error('Lỗi khi fetch user:', error);
				toast.error(
					'Không thể tải thông tin người dùng. Vui lòng thử lại sau.'
				);
			}
		};

		fetchUserData();
	}, [setUser, token]);

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

	useEffect(() => {
		if (user?.role === 'admin') {
			setIsAdmin(true);
		}
	}, [user]);

	const handleLogout = async () => {
		await logout();
		setDropdownOpen(false);
		toast.success('Đăng xuất thành công!', {
			position: 'top-right',
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		});
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

			<div
				className={`absolute -right-12 w-56 rounded-md shadow-lg py-1 bg-transparent ring-1 ring-black ring-opacity-5 transform transition-all duration-200 ease-in-out ${
					dropdownOpen
						? 'opacity-100 scale-100 translate-y-0 z-50'
						: 'opacity-0 scale-95 -translate-y-2 -z-10'
				}`}
			>
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

				<div className="bg-white py-2 rounded-b-md">
					<Link
						to="/account"
						className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
						onClick={() => setDropdownOpen(false)}
					>
						<FaUser className="h-4 w-4 mr-3 text-gray-400" />
						<span>Tài khoản của tôi</span>
					</Link>

					{isAdmin && (
						<Link
							to="/admin"
							className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
							onClick={() => setDropdownOpen(false)}
						>
							<FaAtom className="h-4 w-4 mr-3 text-gray-400" />
							<span>Trang quản trị website</span>
						</Link>
					)}

					<Link
						to="/orders"
						className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
						onClick={() => setDropdownOpen(false)}
					>
						<FaShoppingBag className="h-4 w-4 mr-3 text-gray-400" />
						<span>Đơn hàng của tôi</span>
					</Link>

					<Link
						to="/wishlist"
						className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
						onClick={() => setDropdownOpen(false)}
					>
						<FaHeart className="h-4 w-4 mr-3 text-gray-400" />
						<span>Danh sách yêu thích</span>
					</Link>

					<div className="border-t border-gray-100 my-1"></div>

					<button
						onClick={handleLogout}
						className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
					>
						<FaSignOutAlt className="h-4 w-4 mr-3 text-red-500" />
						<span>Đăng xuất</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserMenu;
