import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HomeBanner from '../home/HomeBanner';

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
			console.log(headerHeight);
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
				className="w-full flex-grow relative"
				style={{ marginTop: `${headerHeight - 35}px` }}
			>
				{/* Decorative background elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					{/* Gradient base background */}
					<div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-80"></div>

					{/* Top-left decorative circle */}
					<div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-100 rounded-full opacity-30 mix-blend-multiply blur-xl"></div>

					{/* Bottom-right decorative circle */}
					<div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-100 rounded-full opacity-40 mix-blend-multiply blur-xl"></div>

					{/* Floating waves pattern - top */}
					<svg
						className="absolute -top-5 left-0 w-full h-32 text-blue-50 opacity-30"
						viewBox="0 0 1200 120"
						preserveAspectRatio="none"
					>
						<path
							d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
							fill="currentColor"
						></path>
					</svg>

					{/* Floating waves pattern - bottom */}
					<svg
						className="absolute -bottom-5 left-0 w-full h-32 text-indigo-50 opacity-30 transform rotate-180"
						viewBox="0 0 1200 120"
						preserveAspectRatio="none"
					>
						<path
							d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
							fill="currentColor"
						></path>
					</svg>

					{/* Grid pattern overlay */}
					<div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
				</div>

				{/* Main content container with subtle shadow and padding */}
				<div className="relative z-10 w-full">
					<Outlet />
				</div>
			</main>
			<Footer />

			{/* Thêm CSS cho grid pattern */}
			<style jsx>{`
				.bg-grid-pattern {
					background-image: linear-gradient(
							to right,
							rgba(0, 0, 100, 0.05) 1px,
							transparent 1px
						),
						linear-gradient(
							to bottom,
							rgba(0, 0, 100, 0.05) 1px,
							transparent 1px
						);
					background-size: 24px 24px;
				}
			`}</style>
		</div>
	);
};

export default MainLayout;
