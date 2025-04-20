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
				className="w-full flex-grow relative overflow-hidden"
				style={{ marginTop: `${headerHeight - 35}px` }}
			>
				{/* Decorative background elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					{/* Gradient base background - Cải thiện với màu thể thao */}
					<div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 opacity-90"></div>

					{/* Dynamic wave patterns */}
					<div className="absolute inset-0 opacity-10">
						<svg
							width="100%"
							height="100%"
							className="absolute inset-0"
						>
							<defs>
								<pattern
									id="sportPattern"
									patternUnits="userSpaceOnUse"
									width="100"
									height="100"
									patternTransform="rotate(10)"
								>
									<circle
										cx="50"
										cy="50"
										r="3"
										fill="#3B82F6"
										opacity="0.3"
									/>
									<circle
										cx="50"
										cy="10"
										r="2"
										fill="#1E40AF"
										opacity="0.4"
									/>
									<circle
										cx="10"
										cy="50"
										r="2"
										fill="#0EA5E9"
										opacity="0.4"
									/>
									<circle
										cx="90"
										cy="50"
										r="2"
										fill="#0EA5E9"
										opacity="0.4"
									/>
									<circle
										cx="50"
										cy="90"
										r="2"
										fill="#1E40AF"
										opacity="0.4"
									/>
								</pattern>
							</defs>
							<rect
								width="100%"
								height="100%"
								fill="url(#sportPattern)"
							/>
						</svg>
					</div>

					{/* Top-left decorative element - sports-themed */}
					<div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400 rounded-full opacity-10 mix-blend-multiply blur-3xl"></div>

					{/* Top-right decorative element */}
					<div className="absolute top-40 -right-32 w-64 h-64 bg-sky-300 rounded-full opacity-10 mix-blend-multiply blur-3xl"></div>

					{/* Bottom-right decorative circle */}
					<div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-400 rounded-full opacity-15 mix-blend-multiply blur-3xl"></div>

					{/* Bottom-left decorative circle */}
					<div className="absolute -bottom-20 -left-40 w-80 h-80 bg-blue-300 rounded-full opacity-10 mix-blend-multiply blur-3xl"></div>

					{/* Animated wave top */}
					<div className="absolute top-0 left-0 w-full">
						<svg
							className="w-full text-blue-100 opacity-30"
							style={{ height: '150px' }}
							viewBox="0 0 1440 320"
							preserveAspectRatio="none"
						>
							<path
								fill="currentColor"
								fillOpacity="1"
								d="M0,128L48,128C96,128,192,128,288,154.7C384,181,480,235,576,245.3C672,256,768,224,864,181.3C960,139,1056,85,1152,80C1248,75,1344,117,1392,138.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
							></path>
						</svg>
					</div>

					{/* Animated wave bottom */}
					<div className="absolute bottom-0 left-0 w-full">
						<svg
							className="w-full text-blue-100 opacity-30"
							style={{ height: '150px' }}
							viewBox="0 0 1440 320"
							preserveAspectRatio="none"
						>
							<path
								fill="currentColor"
								fillOpacity="1"
								d="M0,160L48,181.3C96,203,192,245,288,234.7C384,224,480,160,576,133.3C672,107,768,117,864,144C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
							></path>
						</svg>
					</div>

					{/* Dynamic line design */}
					<div className="absolute inset-0 opacity-10">
						<svg width="100%" height="100%">
							<defs>
								<pattern
									id="diagonalLines"
									patternUnits="userSpaceOnUse"
									width="40"
									height="40"
									patternTransform="rotate(45)"
								>
									<line
										x1="0"
										y1="0"
										x2="0"
										y2="40"
										strokeWidth="1"
										stroke="#3B82F6"
										strokeOpacity="0.3"
									/>
								</pattern>
							</defs>
							<rect
								width="100%"
								height="100%"
								fill="url(#diagonalLines)"
							/>
						</svg>
					</div>

					{/* Sports equipment silhouettes */}
					<div className="absolute right-10 top-1/4 w-16 h-16 opacity-5">
						<svg
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
								fill="#0F172A"
							/>
						</svg>
					</div>

					<div className="absolute left-1/4 bottom-1/3 w-16 h-16 opacity-5">
						<svg
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 2L1 9L5 11V19L12 22L19 19V11L23 9L12 2Z"
								fill="#0F172A"
							/>
						</svg>
					</div>

					{/* Energy lines */}
					<div className="absolute inset-0 overflow-hidden">
						<svg
							width="100%"
							height="100%"
							className="absolute inset-0 opacity-5"
						>
							<line
								x1="0"
								y1="0"
								x2="100%"
								y2="100%"
								stroke="#0284C7"
								strokeWidth="1"
							/>
							<line
								x1="100%"
								y1="0"
								x2="0"
								y2="100%"
								stroke="#0284C7"
								strokeWidth="1"
							/>
						</svg>
					</div>
				</div>

				{/* Main content container with subtle shadow and padding */}
				<div className="relative z-10 w-full">
					<Outlet />
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
