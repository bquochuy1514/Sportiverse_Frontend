// src/components/layout/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import SearchBar from '../common/SearchBar';
import UserMenu from '../common/UserMenu';
import NavItem from '../common/NavItem';
import CartIcon from '../common/CartIcon';
import LocationIcon from '../common/icons/LocationIcon';
import SupportIcon from '../common/icons/SupportIcon';
import UserIcon from '../common/icons/UserIcon';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
	const { isAuthenticated } = useAuth();

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
						<SearchBar placeholder="Tìm kiếm sản phẩm, môn thể thao..." />
					</div>

					{/* Right navigation */}
					<div className="flex items-center space-x-6">
						{/* Địa điểm */}
						<NavItem
							to="/stores"
							icon={<LocationIcon />}
							label="Địa điểm"
							hidden={true}
						/>

						{/* Hỗ trợ */}
						<NavItem
							to="/support"
							icon={<SupportIcon />}
							label="Hỗ trợ"
							hidden={true}
						/>

						{/* Tài khoản - Hiển thị avatar nếu đã đăng nhập, nếu không hiển thị nút đăng nhập */}
						{isAuthenticated ? (
							<UserMenu />
						) : (
							<NavItem
								to="/login"
								icon={<UserIcon />}
								label="Đăng nhập"
							/>
						)}

						{/* Giỏ hàng */}
						<CartIcon count={0} />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
