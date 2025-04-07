// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

const Footer = () => {
	return (
		<footer className="bg-blue-50 text-gray-700 pt-10 pb-6 border-t">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between mb-8">
					{/* Logo and About */}
					<div className="mb-6 md:mb-0 md:w-1/3">
						<Logo className="mb-4" />
						<p className="text-gray-600 mt-2">
							Cung cấp các sản phẩm thể thao chất lượng cao cho
							người yêu thể thao.
						</p>
						<div className="mt-4 flex space-x-4">
							<a
								href="#"
								className="text-blue-500 hover:text-blue-700"
							>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
								</svg>
							</a>
							<a
								href="#"
								className="text-blue-500 hover:text-blue-700"
							>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.055 10.055 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
								</svg>
							</a>
							<a
								href="#"
								className="text-blue-500 hover:text-blue-700"
							>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.01 14.34c-.4.28-.89.45-1.37.45-.77 0-1.38-.27-1.85-.77l-2.08-2.15-2.08 2.15c-.47.5-1.08.77-1.85.77-.48 0-.97-.17-1.37-.45-.36-.24-.63-.58-.79-.97-.16-.39-.18-.82-.09-1.22.09-.4.29-.76.58-1.04l3.25-3.36-3.25-3.36c-.58-.6-.76-1.48-.48-2.26.28-.78.98-1.29 1.79-1.29.77 0 1.38.27 1.85.77l2.08 2.15 2.08-2.15c.47-.5 1.08-.77 1.85-.77.81 0 1.51.51 1.79 1.29.28.78.1 1.66-.48 2.26l-3.25 3.36 3.25 3.36c.29.28.49.64.58 1.04.09.4.07.83-.09 1.22-.16.39-.43.73-.79.97z" />
								</svg>
							</a>
							<a
								href="#"
								className="text-blue-500 hover:text-blue-700"
							>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
								</svg>
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div className="mb-6 md:mb-0 md:w-1/4">
						<h3 className="text-gray-900 font-semibold text-lg mb-4">
							Liên kết nhanh
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/"
									className="text-gray-600 hover:text-blue-600 transition-colors"
								>
									Trang chủ
								</Link>
							</li>
							<li>
								<Link
									to="/products"
									className="text-gray-600 hover:text-blue-600 transition-colors"
								>
									Sản phẩm
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									className="text-gray-600 hover:text-blue-600 transition-colors"
								>
									Về chúng tôi
								</Link>
							</li>
							<li>
								<Link
									to="/contact"
									className="text-gray-600 hover:text-blue-600 transition-colors"
								>
									Liên hệ
								</Link>
							</li>
						</ul>
					</div>

					{/* Categories */}
					<div className="mb-6 md:mb-0 md:w-1/4">
						<h3 className="text-gray-900 font-semibold text-lg mb-4">
							Danh mục
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/products/category/football"
									className="text-gray-600 hover:text-blue-600 transition-colors"
								>
									Bóng đá
								</Link>
							</li>
							<li>
								<Link
									to="/products/category/basketball"
									className="text-gray-600 hover:text-blue-600 transition-colors"
								>
									Bóng rổ
								</Link>
							</li>
							<li>
								<Link
									to="/products/category/tennis"
									className="text-gray-600 hover:text-blue-600 transition-colors"
								>
									Tennis
								</Link>
							</li>
							<li>
								<Link
									to="/products/category/swimming"
									className="text-gray-600 hover:text-blue-600 transition-colors"
								>
									Bơi lội
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div className="md:w-1/4">
						<h3 className="text-gray-900 font-semibold text-lg mb-4">
							Liên hệ
						</h3>
						<div className="space-y-3 text-gray-600">
							<p className="flex items-center">
								<svg
									className="h-5 w-5 mr-2 text-blue-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									></path>
								</svg>
								23520594@gm.uit.edu.vn
							</p>
							<p className="flex items-center">
								<svg
									className="h-5 w-5 mr-2 text-blue-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
									></path>
								</svg>
								+84 342 637 682
							</p>
							<p className="flex items-center">
								<svg
									className="h-5 w-5 mr-2 text-blue-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									></path>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									></path>
								</svg>
								Kí Túc Xá Khu B - Đại học Quốc Gia TP.HCM
							</p>
						</div>
					</div>
				</div>

				<div className="border-t border-blue-100 mt-8 pt-6 text-center text-gray-500">
					<p>
						&copy; {new Date().getFullYear()} Sportiverse. All
						rights reserved by Bùi Quốc Huy.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
