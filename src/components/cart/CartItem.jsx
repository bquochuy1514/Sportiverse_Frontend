// src/components/Cart/CartItem.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import cartService from '../../services/CartService';
import { toast } from 'react-toastify';

const CartItem = ({ item, onDelete, onQuantityChange }) => {
	const navigate = useNavigate();
	const [quantity, setQuantity] = useState(item.quantity);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const formatPrice = (price) => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price);
	};

	// Tính % giảm giá
	const calculateDiscountPercentage = (original, sale) => {
		if (!original || !sale || original <= 0) return 0;
		return Math.round(((original - sale) / original) * 100);
	};

	const handleQuantityChange = async (newQuantity) => {
		if (newQuantity < 1 || isUpdating) return;
		setIsUpdating(true);

		// Cập nhật UI trước để giao diện phản hồi nhanh
		setQuantity(newQuantity);
		// Thông báo cho component cha biết số lượng đã thay đổi
		if (onQuantityChange) {
			onQuantityChange(newQuantity);
		}

		try {
			const data = await cartService.updateCartItemQuantity(
				item.id,
				newQuantity
			);
			if (data.success) {
				toast.success('Số lượng đã được cập nhật', {
					position: 'bottom-right',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			} else {
				// Nếu API lỗi, khôi phục lại số lượng ban đầu
				setQuantity(item.quantity);
				if (onQuantityChange) {
					onQuantityChange(item.quantity);
				}
				toast.error(data.message);
				throw new Error(data.message || 'Không thể cập nhật số lượng');
			}
		} catch (err) {
			// Nếu có lỗi, khôi phục lại số lượng ban đầu
			setQuantity(item.quantity);
			if (onQuantityChange) {
				onQuantityChange(item.quantity);
			}
			toast.error(err.message || 'Đã xảy ra lỗi khi cập nhật số lượng');
			console.error('Error updating quantity:', err);
		} finally {
			setIsUpdating(false);
		}
	};

	const handleInputChange = (e) => {
		const value = e.target.value;
		if (value === '' || isNaN(value)) return;
		const newQuantity = parseInt(value);
		handleQuantityChange(newQuantity);
	};

	const handleIncrease = () => {
		handleQuantityChange(quantity + 1);
	};

	const handleDecrease = () => {
		handleQuantityChange(quantity - 1);
	};

	const handleDelete = () => {
		// Animation trước khi xóa
		onDelete(item.product.id);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, height: 0, marginBottom: 0 }}
			transition={{ duration: 0.3 }}
			className="mb-4"
		>
			<div
				className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 ${
					isHovered ? 'shadow-md transform -translate-y-1' : ''
				} border border-gray-100`}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div className="p-4 md:p-6 flex flex-col sm:flex-row">
					{/* Product image with hover effects and badge */}
					<div className="flex-shrink-0 mb-4 sm:mb-0 relative">
						<div
							className="w-full sm:w-32 h-32 rounded-lg overflow-hidden group cursor-pointer"
							onClick={() =>
								navigate(`/product/${item.product.slug}`)
							}
						>
							<div className="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 z-10 rounded-lg"></div>
							<img
								src={item.image || '/images/placeholder.png'}
								alt={item.product.name}
								className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>

							{/* Out of stock badge if needed */}
							{item.product.stock_quantity < 1 && (
								<div className="absolute top-2 right-2 bg-red-600 text-white text-xs py-1 px-2 rounded-full z-20">
									Hết hàng
								</div>
							)}
						</div>
					</div>

					{/* Product details */}
					<div className="flex-1 sm:ml-6 flex flex-col">
						<div className="flex justify-between items-start">
							<h3
								className="text-lg md:text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer"
								onClick={() =>
									navigate(`/product/${item.product.slug}`)
								}
							>
								{item.product.name}
							</h3>
							<motion.button
								whileHover={{
									scale: 1.1,
									backgroundColor: '#FEE2E2',
								}}
								whileTap={{ scale: 0.9 }}
								onClick={handleDelete}
								className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
								aria-label="Xóa sản phẩm"
							>
								<FaTrash size={16} />
							</motion.button>
						</div>

						{/* Product meta info with improved styling */}
						<div className="mt-2 mb-3 space-x-2 flex flex-wrap">
							{item.product.category.sport?.name && (
								<span className="inline-block mt-1 text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100">
									{item.product.category.sport.name}
								</span>
							)}
							{item.product.category?.name && (
								<span className="inline-block mt-1 text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-100">
									{item.product.category.name}
								</span>
							)}
						</div>

						{/* Stock status indicator */}
						<div className="mt-1 mb-2">
							{item.product.stock_quantity > 0 ? (
								<div className="flex items-center text-sm">
									<div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
									<span className="text-green-600 font-medium">
										Còn hàng ({item.product.stock_quantity})
									</span>
								</div>
							) : (
								<div className="flex items-center text-sm">
									<div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
									<span className="text-red-600 font-medium">
										Hết hàng
									</span>
								</div>
							)}
						</div>

						{/* Price and quantity with improved layout */}
						<div className="mt-auto pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
							<div className="mb-3 sm:mb-0">
								{item.product.sale_price > 0 ? (
									<div className="flex items-center">
										<span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
											{formatPrice(item.sale_price)}
										</span>
										<span className="text-sm text-gray-500 line-through ml-2">
											{formatPrice(item.price)}
										</span>
										<span className="ml-2 bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-md font-medium">
											{calculateDiscountPercentage(
												item.price,
												item.sale_price
											)}
											% giảm
										</span>
									</div>
								) : (
									<span className="text-xl font-bold text-gray-900">
										{formatPrice(item.price)}
									</span>
								)}
							</div>

							{/* Quantity controls with improved styling */}
							<div className="flex items-center">
								<motion.div
									className="flex items-center border border-gray-200 rounded-lg overflow-hidden shadow-sm"
									whileHover={{
										boxShadow:
											'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
									}}
								>
									<motion.button
										whileHover={{
											backgroundColor: '#F3F4F6',
										}}
										whileTap={{ scale: 0.95 }}
										onClick={handleDecrease}
										disabled={isUpdating || quantity <= 1}
										className={`px-3 py-2 text-gray-700 transition-colors ${
											isUpdating || quantity <= 1
												? 'opacity-50 cursor-not-allowed bg-gray-50'
												: 'hover:bg-gray-100'
										}`}
										aria-label="Giảm số lượng"
									>
										<FaMinus size={12} />
									</motion.button>

									<input
										type="number"
										value={quantity}
										onChange={handleInputChange}
										className="w-16 text-center bg-transparent border-none focus:outline-none focus:ring-0 text-gray-800 font-medium py-2"
										min="1"
										disabled={isUpdating}
									/>

									<motion.button
										whileHover={{
											backgroundColor: '#F3F4F6',
										}}
										whileTap={{ scale: 0.95 }}
										onClick={handleIncrease}
										disabled={
											isUpdating ||
											quantity >=
												item.product.stock_quantity
										}
										className={`px-3 py-2 text-gray-700 transition-colors ${
											isUpdating ||
											quantity >=
												item.product.stock_quantity
												? 'opacity-50 cursor-not-allowed bg-gray-50'
												: 'hover:bg-gray-100'
										}`}
										aria-label="Tăng số lượng"
									>
										<FaPlus size={12} />
									</motion.button>
								</motion.div>
							</div>
						</div>

						{/* Subtotal */}
						<div className="mt-3 pt-3 border-t border-gray-100">
							<div className="flex justify-between items-center">
								<span className="text-gray-500 text-sm">
									Thành tiền:
								</span>
								<span className="font-bold text-lg text-blue-700">
									{formatPrice(
										item.product.sale_price > 0
											? item.product.sale_price * quantity
											: item.price * quantity
									)}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default CartItem;
