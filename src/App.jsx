// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
import LoginPage from './pages/auth/LoginPage';
// Layouts
import MainLayout from './components/layout/MainLayout';
import AuthCallback from './pages/auth/AuthCallback';

// Placeholder component cho các trang chưa tạo
const Placeholder = ({ pageName }) => (
	<div className="flex flex-col items-center justify-center py-12">
		<h1 className="text-3xl font-bold mb-4">{pageName}</h1>
		<p className="text-gray-600">Trang này đang được phát triển</p>
	</div>
);

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="login" element={<LoginPage />} />
					<Route path="/auth/callback" element={<AuthCallback />} />
					<Route path="/" element={<MainLayout />}>
						{/* <Route path="register" element={<Register />} /> */}
						<Route
							index
							element={<Placeholder pageName="Trang chủ" />}
						/>
						<Route
							path="products"
							element={<Placeholder pageName="Sản phẩm" />}
						/>
						<Route
							path="products/:id"
							element={
								<Placeholder pageName="Chi tiết sản phẩm" />
							}
						/>
						<Route
							path="cart"
							element={<Placeholder pageName="Giỏ hàng" />}
						/>
						<Route
							path="account"
							element={<Placeholder pageName="Tài khoản" />}
						/>

						<Route
							path="*"
							element={
								<Placeholder pageName="404 - Không tìm thấy trang" />
							}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
