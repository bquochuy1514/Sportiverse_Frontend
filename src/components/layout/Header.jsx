// src/components/layout/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import SearchBar from '../common/SearchBar';
import UserMenu from '../common/UserMenu';
import NavItem from '../common/NavItem';
import CartIcon from '../common/icons/CartIcon';
import LocationIcon from '../common/icons/LocationIcon';
import SupportIcon from '../common/icons/SupportIcon';
import UserIcon from '../common/icons/UserIcon';
import SportsCategories from '../SportsCategories';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
	const { isAuthenticated } = useAuth();

	return (
		<header className="bg-blue-50 shadow-sm border-b">
			<div className="container mx-auto px-4 max-w-screen-xl gap-4">
				<div className="flex items-center justify-between h-16 gap-4">
					{/* Logo */}
					<div className="flex-shrink-0">
						<Logo />
					</div>

					{/* Search bar */}
					<div className="flex-1 max-w-lg mx-2 w-full">
						<SearchBar placeholder="Tìm kiếm sản phẩm, môn thể thao..." />
					</div>

					{/* Right navigation */}
					<div className="flex items-center gap-6 shrink-0">
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
			{/* phần danh mục sports */}
			<SportsCategories />
		</header>
	);
};

export default Header;
