// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import MainLayout from './components/layout/MainLayout';
import AuthCallback from './pages/auth/AuthCallback';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS của react-toastify

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
					<Route path="/auth/callback" element={<AuthCallback />} />
					<Route path="/" element={<MainLayout />}>
						<Route
							index
							element={<Placeholder pageName="Trang chủ" />}
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
					position="top-right" // Vị trí của thông báo
					autoClose={5000} // Tự động đóng sau 3 giây
					hideProgressBar={false} // Hiển thị thanh tiến trình
					newestOnTop={false} // Thông báo mới không đè lên thông báo cũ
					closeOnClick // Đóng khi nhấp vào thông báo
					rtl={false} // Không hỗ trợ viết từ phải sang trái
					pauseOnFocusLoss // Tạm dừng khi cửa sổ mất focus
					draggable // Cho phép kéo thông báo
					pauseOnHover // Tạm dừng khi di chuột qua
				/>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
