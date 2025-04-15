import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
	const [headerHeight, setHeaderHeight] = useState(0);
	const headerRef = useRef(null);

	// Tính toán chiều cao của header để áp dụng padding-top cho main content
	useEffect(() => {
		const calculateHeaderHeight = () => {
			if (headerRef.current) {
				// Lấy chiều cao thực của header bao gồm cả thanh điều hướng danh mục
				const height = headerRef.current.offsetHeight;
				setHeaderHeight(height);
			}
		};

		// Tính toán lần đầu
		calculateHeaderHeight();

		// Tính toán lại khi cửa sổ thay đổi kích thước
		window.addEventListener('resize', calculateHeaderHeight);

		// Tính toán lại sau một khoảng thời gian ngắn để đảm bảo các phần tử đã render đầy đủ
		const timer = setTimeout(calculateHeaderHeight, 500);

		return () => {
			window.removeEventListener('resize', calculateHeaderHeight);
			clearTimeout(timer);
		};
	}, []);

	return (
		<div className="flex flex-col min-h-screen">
			<Header ref={headerRef} />
			<main
				className="flex-grow container mx-auto px-4 pb-8"
				style={{ marginTop: `${headerHeight + 10}px` }} // Thêm 20px để có khoảng cách
			>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
