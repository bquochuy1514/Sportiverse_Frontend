import { FaGift, FaTag, FaTrash, FaSpinner } from 'react-icons/fa';

const CouponSection = ({
	couponCode,
	setCouponCode,
	discountAmount,
	handleApplyCoupon,
	handleRemoveCoupon,
	loading,
	token,
}) => {
	return (
		<div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
			<div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
				<h2 className="text-xl font-semibold text-white flex items-center gap-3">
					<FaGift className="text-lg" />
					Mã giảm giá
				</h2>
			</div>
			<div className="p-6">
				<div className="flex flex-col sm:flex-row gap-3">
					<div className="flex-grow">
						<input
							type="text"
							value={couponCode}
							onChange={(e) =>
								setCouponCode(e.target.value.toUpperCase())
							}
							placeholder="Nhập mã giảm giá (VD: SAVE20)"
							className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-700 font-medium"
						/>
					</div>
					<button
						onClick={handleApplyCoupon}
						disabled={loading || !token}
						className={`px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl flex items-center justify-center gap-2 font-semibold transition-all transform hover:scale-105 ${
							loading || !token
								? 'opacity-50 cursor-not-allowed hover:scale-100'
								: 'hover:shadow-lg'
						}`}
					>
						{loading ? (
							<>
								<FaSpinner className="animate-spin" />
								Đang áp dụng...
							</>
						) : (
							<>
								<FaTag />
								Áp dụng
							</>
						)}
					</button>
				</div>
				{discountAmount > 0 && (
					<div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
						<div className="flex justify-between items-center">
							<div className="flex items-center gap-2">
								<div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
									<FaGift className="text-white text-sm" />
								</div>
								<div>
									<p className="font-semibold text-green-700">
										Mã giảm giá đã được áp dụng!
									</p>
									<p className="text-sm text-green-600">
										Mã:{' '}
										<span className="font-mono font-bold">
											{couponCode}
										</span>
									</p>
								</div>
							</div>
							<button
								onClick={handleRemoveCoupon}
								className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
								title="Xóa mã giảm giá"
							>
								<FaTrash />
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CouponSection;
