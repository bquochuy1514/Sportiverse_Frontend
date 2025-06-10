import React, { useState } from 'react';
import {
	FiPlusSquare, // For "Add Product"
	FiPackage, // For "Product Management"
	FiShoppingCart, // For "Orders"
	FiPercent, // For "Coupon Management"
	FiUsers, // For "User Management"
	FiMenu,
	FiBell,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ProductManagement from './ProductManagement/ProductManagement.jsx';
import OrderManagement from './OrderManagement';
import ProductListPage from './ProductManagement/ProductListPage.jsx';
import CouponManagement from './CouponManagement.jsx';
import UserManagement from './UserManagement.jsx';

const AdminPage = () => {
	const [activeSection, setActiveSection] = useState('product/add');

	const renderContent = () => {
		switch (activeSection) {
			case 'product/add':
				return <ProductManagement />;
			case 'products':
				return <ProductListPage />;
			case 'orders':
				return <OrderManagement />;
			case 'coupons':
				return <CouponManagement />;
			case 'users':
				return <UserManagement />;
			default:
				return <ProductManagement />;
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex">
			{/* Sidebar */}
			<div className="hidden lg:flex lg:flex-col w-64 bg-indigo-900 text-white">
				<Link to="/" className="p-6">
					<h1 className="text-2xl font-bold flex items-center">
						<span className="bg-white text-indigo-900 p-1 rounded mr-2">
							S
						</span>
						Sportiverse Admin
					</h1>
				</Link>

				<nav className="mt-6 flex-1">
					<div className="px-4 py-2 text-indigo-300 text-xs font-semibold">
						QUẢN LÝ CHÍNH
					</div>
					<button
						onClick={() => setActiveSection('product/add')}
						className={`flex items-center py-3 px-6 w-full text-left text-indigo-100 hover:bg-indigo-800 transition-colors ${
							activeSection === 'product/add'
								? 'bg-indigo-800'
								: ''
						}`}
					>
						<span className="mr-3">
							<FiPlusSquare />
						</span>
						<span>Thêm sản phẩm</span>
					</button>
					<button
						onClick={() => setActiveSection('products')}
						className={`flex items-center py-3 px-6 w-full text-left text-indigo-100 hover:bg-indigo-800 transition-colors ${
							activeSection === 'products' ? 'bg-indigo-800' : ''
						}`}
					>
						<span className="mr-3">
							<FiPackage />
						</span>
						<span>Quản Lý Sản Phẩm</span>
					</button>
					<button
						onClick={() => setActiveSection('orders')}
						className={`flex items-center py-3 px-6 w-full text-left text-indigo-100 hover:bg-indigo-800 transition-colors ${
							activeSection === 'orders' ? 'bg-indigo-800' : ''
						}`}
					>
						<span className="mr-3">
							<FiShoppingCart />
						</span>
						<span>Đơn Hàng</span>
					</button>
					<button
						onClick={() => setActiveSection('coupons')}
						className={`flex items-center py-3 px-6 w-full text-left text-indigo-100 hover:bg-indigo-800 transition-colors ${
							activeSection === 'coupons' ? 'bg-indigo-800' : ''
						}`}
					>
						<span className="mr-3">
							<FiPercent />
						</span>
						<span>Quản Lý Mã Giảm Giá</span>
					</button>
					<button
						onClick={() => setActiveSection('users')}
						className={`flex items-center py-3 px-6 w-full text-left text-indigo-100 hover:bg-indigo-800 transition-colors ${
							activeSection === 'users' ? 'bg-indigo-800' : ''
						}`}
					>
						<span className="mr-3">
							<FiUsers />
						</span>
						<span>Quản Lý Người Dùng</span>
					</button>
				</nav>

				<div className="p-4 mt-auto">
					<div className="bg-indigo-800 rounded-lg p-3">
						<div className="flex items-center">
							<div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-900 font-bold">
								A
							</div>
							<div className="ml-3">
								<div className="text-sm font-medium">
									Admin User
								</div>
								<div className="text-xs text-indigo-300">
									Quản trị viên
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Header */}
				<header className="bg-white shadow-sm border-b border-gray-200">
					<div className="flex items-center justify-between p-4">
						<div className="flex items-center space-x-3">
							<button className="lg:hidden text-gray-500 hover:text-gray-700">
								<FiMenu className="h-6 w-6" />
							</button>
							<h2 className="text-xl font-bold text-gray-800">
								{activeSection === 'product/add' &&
									'Thêm Sản Phẩm'}
								{activeSection === 'products' &&
									'Quản Lý Sản Phẩm'}
								{activeSection === 'orders' &&
									'Quản Lý Đơn Hàng'}
								{activeSection === 'coupons' &&
									'Quản Lý Mã Giảm Giá'}
								{activeSection === 'users' &&
									'Quản Lý Người Dùng'}
							</h2>
						</div>

						<div className="flex items-center space-x-2">
							<button className="bg-indigo-100 text-indigo-800 p-2 rounded-full hover:bg-indigo-200 transition-colors">
								<FiBell className="h-5 w-5" />
							</button>
							<div className="relative">
								<button className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
									A
								</button>
							</div>
						</div>
					</div>
				</header>

				{/* Content */}
				<main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
					{renderContent()}
				</main>
			</div>
		</div>
	);
};

export default AdminPage;
