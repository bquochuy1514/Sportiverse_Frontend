import React, { useState, useEffect, forwardRef, useRef } from 'react';
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

const Header = forwardRef((props, ref) => {
	const { isAuthenticated } = useAuth();
	const [headerHeight, setHeaderHeight] = useState(0);
	const sportsCategoriesRef = useRef(null);
	const innerHeaderRef = useRef(null);

	useEffect(() => {
		if (innerHeaderRef.current) {
			setHeaderHeight(innerHeaderRef.current.offsetHeight);
		}

		const handleResize = () => {
			if (innerHeaderRef.current) {
				setHeaderHeight(innerHeaderRef.current.offsetHeight);
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
			ref={ref} // Sử dụng ref từ component cha
			className="fixed top-0 left-0 right-0 bg-blue-50 shadow-sm border-b z-30"
		>
			<div ref={innerHeaderRef} className="w-full">
				<div className="container mx-auto px-4 max-w-screen-xl gap-4">
					<div className="flex items-center justify-between h-14 gap-4">
						<div className="flex-shrink-0">
							<div onClick={handleLogoClick}>
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
					ref={sportsCategoriesRef}
					headerHeight={headerHeight}
				/>
			</div>
		</header>
	);
});

export default Header;
