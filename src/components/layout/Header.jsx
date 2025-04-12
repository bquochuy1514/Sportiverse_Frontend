import React, { useRef, useState, useEffect } from 'react';
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
	const headerRef = useRef(null);
	const sportsCategoriesRef = useRef(null); // Thêm ref cho SportsCategories
	const [headerHeight, setHeaderHeight] = useState(0);

	useEffect(() => {
		if (headerRef.current) {
			setHeaderHeight(headerRef.current.offsetHeight);
		}
		const handleResize = () => {
			if (headerRef.current) {
				setHeaderHeight(headerRef.current.offsetHeight);
			}
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Hàm xử lý khi nhấp vào logo
	const handleLogoClick = () => {
		if (sportsCategoriesRef.current) {
			sportsCategoriesRef.current.closeDropdown(); // Gọi hàm đóng dropdown
		}
	};

	return (
		<header
			ref={headerRef}
			className="fixed top-0 left-0 right-0 bg-blue-50 shadow-sm border-b"
		>
			<div className="container mx-auto px-4 max-w-screen-xl gap-4">
				<div className="flex items-center justify-between h-16 gap-4">
					<div className="flex-shrink-0">
						<div onClick={handleLogoClick}>
							{' '}
							{/* Thêm sự kiện onClick */}
							<Logo />
						</div>
					</div>
					<div className="flex-1 max-w-lg mx-2 w-full">
						<SearchBar placeholder="Tìm kiếm sản phẩm, môn thể thao..." />
					</div>
					<div className="flex items-center gap-6 shrink-0">
						<NavItem
							to="/stores"
							icon={<LocationIcon />}
							label="Địa điểm"
							hidden={true}
						/>
						<NavItem
							to="/support"
							icon={<SupportIcon />}
							label="Hỗ trợ"
							hidden={true}
						/>
						{isAuthenticated ? (
							<UserMenu />
						) : (
							<NavItem
								to="/login"
								icon={<UserIcon />}
								label="Đăng nhập"
							/>
						)}
						<CartIcon count={0} />
					</div>
				</div>
			</div>
			<SportsCategories
				// ref={sportsCategoriesRef}
				headerHeight={headerHeight}
			/>
		</header>
	);
};

export default Header;
