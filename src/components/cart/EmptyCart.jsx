// src/pages/Cart/EmptyCart.jsx
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaShoppingCart, FaBoxOpen, FaArrowRight } from 'react-icons/fa';

const EmptyCart = ({ onContinueShopping }) => {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6 }}
			className="py-12 mt-7 bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 min-h-96 flex items-center justify-center"
		>
			<div className="max-w-md w-full mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.5 }}
					className="bg-white p-8 rounded-xl shadow-md text-center"
				>
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{
							type: 'spring',
							stiffness: 260,
							damping: 20,
							delay: 0.5,
						}}
						className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
					>
						<FaShoppingCart className="text-blue-600 text-4xl" />
					</motion.div>

					<h2 className="text-2xl font-bold text-gray-800 mb-4">
						Giỏ hàng trống
					</h2>

					<p className="text-gray-600 mb-8">
						Có vẻ như bạn chưa thêm bất kỳ sản phẩm nào vào giỏ
						hàng. Hãy khám phá các sản phẩm của chúng tôi và tìm
						thấy những món đồ yêu thích!
					</p>

					<div className="flex items-center justify-center space-x-3 mb-6">
						<FaBoxOpen className="text-blue-600" size={18} />
						<span className="text-sm text-gray-500">
							Miễn phí vận chuyển cho đơn hàng trên 500.000đ
						</span>
					</div>

					<motion.button
						whileHover={{
							scale: 1.05,
							boxShadow:
								'0 10px 25px -5px rgba(59, 130, 246, 0.5)',
						}}
						whileTap={{ scale: 0.95 }}
						onClick={onContinueShopping}
						className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium shadow-md flex items-center justify-center"
					>
						Tiếp tục mua sắm
						<motion.span
							initial={{ x: 0 }}
							whileHover={{ x: 4 }}
							className="ml-2"
						>
							<FaArrowRight size={14} />
						</motion.span>
					</motion.button>

					<div className="mt-6 grid grid-cols-3 gap-2 text-center">
						<div className="flex flex-col items-center">
							<span className="text-xs text-gray-500">
								Sản phẩm chất lượng
							</span>
						</div>
						<div className="flex flex-col items-center">
							<span className="text-xs text-gray-500">
								Giao hàng nhanh chóng
							</span>
						</div>
						<div className="flex flex-col items-center">
							<span className="text-xs text-gray-500">
								Đổi trả dễ dàng
							</span>
						</div>
					</div>
				</motion.div>
			</div>
		</motion.section>
	);
};

export default EmptyCart;
