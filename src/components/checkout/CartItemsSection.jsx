import { FaShoppingCart } from 'react-icons/fa';

const CartItemsSection = ({ cartItems }) => {
	return (
		<div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
			<div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
				<h2 className="text-xl font-semibold text-white flex items-center gap-3">
					<FaShoppingCart className="text-lg" />
					Sản phẩm trong giỏ hàng ({cartItems.length})
				</h2>
			</div>
			<div className="p-6">
				{cartItems.length > 0 ? (
					<div className="space-y-4">
						{cartItems.map((item, index) => (
							<div
								key={item.id}
								className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:shadow-md ${
									index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
								} border border-gray-100`}
							>
								<div className="flex-shrink-0">
									<img
										src={item.image}
										alt={item.name}
										className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
										onError={(e) => {
											e.target.src =
												'/api/placeholder/80/80';
										}}
									/>
								</div>
								<div className="flex-grow">
									<h3 className="font-semibold text-gray-800 text-lg mb-1">
										{item.name}
									</h3>
									<div className="flex items-center gap-4 text-sm text-gray-600">
										<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
											Số lượng: {item.quantity}
										</span>
										<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
											{(item.sale_price != 0
												? parseInt(item.sale_price)
												: parseInt(item.price)
											).toLocaleString('vi-VN')}
											đ/sản phẩm
										</span>
									</div>
								</div>
								<div className="text-right">
									<p className="text-lg font-bold text-gray-800">
										{(item.sale_price != 0
											? item.sale_price * item.quantity
											: item.price * item.quantity
										).toLocaleString('vi-VN')}
										đ
									</p>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-12">
						<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<FaShoppingCart className="text-4xl text-gray-400" />
						</div>
						<h3 className="text-lg font-semibold text-gray-600 mb-2">
							Giỏ hàng trống
						</h3>
						<p className="text-gray-500">
							Thêm sản phẩm vào giỏ hàng để tiếp tục thanh toán
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default CartItemsSection;
