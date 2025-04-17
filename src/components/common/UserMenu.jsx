import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { fetchCurrentUser } from '../../services/authService';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
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

	// Hiệu ứng animation cho dropdown
	const dropdownVariants = {
		hidden: {
			opacity: 0,
			scale: 0.95,
			y: -20,
			transformOrigin: 'top right',
		},
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: {
				type: 'spring',
				stiffness: 350,
				damping: 25,
				duration: 0.3,
			},
		},
		exit: {
			opacity: 0,
			scale: 0.95,
			y: -10,
			transition: {
				duration: 0.2,
				ease: 'easeOut',
			},
		},
	};

	// Hiệu ứng cho các mục menu
	const menuItemVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: (i) => ({
			opacity: 1,
			x: 0,
			transition: {
				delay: i * 0.05,
				duration: 0.3,
				ease: 'easeOut',
			},
		}),
	};

	const menuItems = [
		{
			icon: <FaUser className="h-4 w-4 mr-3 text-gray-400" />,
			text: 'Tài khoản của tôi',
			path: '/account',
		},
		...(isAdmin
			? [
					{
						icon: <FaAtom className="h-4 w-4 mr-3 text-gray-400" />,
						text: 'Trang quản trị website',
						path: '/admin',
					},
			  ]
			: []),
		{
			icon: <FaShoppingBag className="h-4 w-4 mr-3 text-gray-400" />,
			text: 'Đơn hàng của tôi',
			path: '/orders',
		},
		{
			icon: <FaHeart className="h-4 w-4 mr-3 text-gray-400" />,
			text: 'Danh sách yêu thích',
			path: '/wishlist',
		},
	];

	return (
		<div className="relative" ref={dropdownRef}>
			<motion.button
				className="flex flex-col items-center text-xs text-gray-700 hover:text-blue-600 focus:outline-none transition duration-150 ease-in-out"
				onClick={() => setDropdownOpen(!dropdownOpen)}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				<div className="relative group">
					<motion.img
						src={user.avatar}
						alt={user.name}
						className="h-7 w-7 rounded-full object-cover border-2 border-blue-200 transition-all duration-200 group-hover:border-blue-400 shadow-sm"
						animate={
							dropdownOpen
								? { borderColor: '#3B82F6', scale: 1.05 }
								: {}
						}
					/>
					<span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white transition-all duration-200 group-hover:bg-green-500"></span>
				</div>
				<span className="mt-1 font-medium">
					{user?.name?.split(' ')[0] || 'Tài khoản'}
				</span>
			</motion.button>

			{/* AnimatePresence cho phép animation khi component được removed khỏi DOM */}
			<AnimatePresence>
				{dropdownOpen && (
					<motion.div
						className="absolute -right-12 w-56 rounded-md shadow-lg py-1 bg-transparent ring-1 ring-black ring-opacity-5 z-50"
						variants={dropdownVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-md"></div>
							<motion.div
								className="relative p-4 text-white"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.1 }}
							>
								<div className="flex items-center">
									<motion.img
										src={user.avatar}
										alt={user.name}
										className="h-10 w-10 rounded-full border-2 border-white shadow-md flex-shrink-0"
										initial={{ scale: 0.8, opacity: 0 }}
										animate={{ scale: 1, opacity: 1 }}
										transition={{
											delay: 0.2,
											type: 'spring',
											stiffness: 260,
											damping: 20,
										}}
									/>
									<motion.div
										className="ml-3 flex-1 min-w-0"
										initial={{ x: -10, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										transition={{ delay: 0.25 }}
									>
										<p className="text-sm font-semibold leading-tight">
											{user?.name}
										</p>
										<p className="text-xs opacity-90 truncate">
											{user?.email}
										</p>
									</motion.div>
								</div>
							</motion.div>
						</div>

						<div className="bg-white py-2 rounded-b-md">
							{menuItems.map((item, index) => (
								<motion.div
									key={item.path}
									custom={index}
									variants={menuItemVariants}
									initial="hidden"
									animate="visible"
								>
									<Link
										to={item.path}
										className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
										onClick={() => setDropdownOpen(false)}
									>
										{item.icon}
										<span>{item.text}</span>
									</Link>
								</motion.div>
							))}

							<motion.div
								className="border-t border-gray-100 my-1"
								initial={{ scaleX: 0 }}
								animate={{ scaleX: 1 }}
								transition={{ delay: 0.3, duration: 0.3 }}
							></motion.div>

							<motion.div
								custom={menuItems.length}
								variants={menuItemVariants}
								initial="hidden"
								animate="visible"
							>
								<button
									onClick={handleLogout}
									className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
								>
									<FaSignOutAlt className="h-4 w-4 mr-3 text-red-500" />
									<span>Đăng xuất</span>
								</button>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default UserMenu;
