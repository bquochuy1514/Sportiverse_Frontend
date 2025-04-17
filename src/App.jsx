import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import MainLayout from './components/layout/MainLayout';
import AuthCallback from './pages/auth/AuthCallback';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountPage from './pages/account/AccountPage';
import ChangePassowrd from './pages/account/changePassword';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import AdminPage from './pages/admin/AdminPage';
import ProductDetailManagement from './pages/admin/ProductManagement/ProductDetailManagement';
import HomePage from './pages/Home/HomePage'; // Import trang chủ mới
import ProductDetail from './components/home/products/product-detail/ProductDetail';
import ScrollToTop from './components/ScrollToTop';
import ProductsBySport from './components/home/sports/ProductsBySport';

// Placeholder component cho các trang chưa tạo
const Placeholder = ({ pageName }) => (
	<div className="flex flex-col items-center justify-center py-12 mt-28">
		<h1 className="text-3xl font-bold mb-4">{pageName}</h1>
		<p className="text-gray-600">Trang này đang được phát triển</p>
		<div className="h-72"></div>
	</div>
);

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<ScrollToTop />
				<Routes>
					<Route
						path="admin"
						element={
							<ProtectedAdminRoute>
								<AdminPage />
							</ProtectedAdminRoute>
						}
					/>
					<Route
						path="admin/product/:productId"
						element={
							<ProtectedAdminRoute>
								<ProductDetailManagement />
							</ProtectedAdminRoute>
						}
					/>
					<Route
						path="login"
						element={
							<ProtectedRoute redirectIfAuthenticated={true}>
								<LoginPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="register"
						element={
							<ProtectedRoute redirectIfAuthenticated={true}>
								<RegisterPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="account"
						element={
							<ProtectedRoute>
								<AccountPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="change-password"
						element={
							<ProtectedRoute>
								<ChangePassowrd />
							</ProtectedRoute>
						}
					/>
					<Route path="/auth/callback" element={<AuthCallback />} />
					<Route path="/" element={<MainLayout />}>
						<Route index element={<HomePage />} />{' '}
						<Route
							path="product/:slug"
							element={<ProductDetail />}
						/>
						<Route
							path="sports/:slug"
							element={<ProductsBySport />}
						/>
						<Route
							path="*"
							element={
								<Placeholder pageName="404 - Không tìm thấy trang" />
							}
						/>
					</Route>
				</Routes>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
