import React, { useState } from 'react';
import {
	FiPackage,
	FiList,
	FiDollarSign,
	FiMenu,
	FiBell,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ProductManagement from './ProductManagement/ProductManagement.jsx';
import CategoryManagement from './CategoryManagement';
import OrderManagement from './OrderManagement';

const AdminPage = () => {
	const [activeSection, setActiveSection] = useState('products');

	const renderContent = () => {
		switch (activeSection) {
			case 'products':
				return <ProductManagement />;
			case 'categories':
				return <CategoryManagement />;
			case 'orders':
				return <OrderManagement />;
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
						onClick={() => setActiveSection('categories')}
						className={`flex items-center py-3 px-6 w-full text-left text-indigo-100 hover:bg-indigo-800 transition-colors ${
							activeSection === 'categories'
								? 'bg-indigo-800'
								: ''
						}`}
					>
						<span className="mr-3">
							<FiList />
						</span>
						<span>Danh Mục</span>
					</button>
					<button
						onClick={() => setActiveSection('orders')}
						className={`flex items-center py-3 px-6 w-full text-left text-indigo-100 hover:bg-indigo-800 transition-colors ${
							activeSection === 'orders' ? 'bg-indigo-800' : ''
						}`}
					>
						<span className="mr-3">
							<FiDollarSign />
						</span>
						<span>Đơn Hàng</span>
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
								{activeSection === 'products' &&
									'Quản Lý Sản Phẩm'}
								{activeSection === 'categories' &&
									'Quản Lý Danh Mục'}
								{activeSection === 'orders' &&
									'Quản Lý Đơn Hàng'}
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
