// src/components/auth/MembershipBenefits.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MembershipBenefits = () => {
	return (
		<div className="mt-12 pt-8 border-t border-gray-200">
			<h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
				Đặc quyền thành viên Sportiverse
			</h3>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="p-4 bg-blue-50 rounded-lg flex items-start">
					<div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
						<svg
							className="w-5 h-5 text-blue-600"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<div>
						<h4 className="text-sm font-medium text-gray-800">
							Ưu đãi độc quyền
						</h4>
						<p className="text-xs text-gray-600 mt-1">
							Tiếp cận các khuyến mãi và sản phẩm đặc biệt dành
							riêng cho thành viên
						</p>
					</div>
				</div>

				<div className="p-4 bg-blue-50 rounded-lg flex items-start">
					<div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
						<svg
							className="w-5 h-5 text-blue-600"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
					</div>
					<div>
						<h4 className="text-sm font-medium text-gray-800">
							Tích điểm thưởng
						</h4>
						<p className="text-xs text-gray-600 mt-1">
							Nhận và đổi điểm thưởng cho mỗi lần mua sắm
						</p>
					</div>
				</div>

				<div className="p-4 bg-blue-50 rounded-lg flex items-start">
					<div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
						<svg
							className="w-5 h-5 text-blue-600"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L15.414 4a1 1 0 11-1.414 1.414L13 4.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707L10.586 2A1 1 0 0112 2zm2 12a1 1 0 110 2h-3a1 1 0 110-2h3z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<div>
						<h4 className="text-sm font-medium text-gray-800">
							Tư vấn chuyên nghiệp
						</h4>
						<p className="text-xs text-gray-600 mt-1">
							Được tư vấn bởi đội ngũ chuyên gia thể thao hàng đầu
						</p>
					</div>
				</div>

				<div className="p-4 bg-blue-50 rounded-lg flex items-start">
					<div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
						<svg
							className="w-5 h-5 text-blue-600"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
							<path d="M16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
						</svg>
					</div>
					<div>
						<h4 className="text-sm font-medium text-gray-800">
							Cộng đồng thể thao
						</h4>
						<p className="text-xs text-gray-600 mt-1">
							Kết nối với cộng đồng người yêu thể thao trên toàn
							quốc
						</p>
					</div>
				</div>
			</div>

			{/* Phần thêm mới ở dưới */}
			<div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white shadow-lg">
				<div className="flex flex-col md:flex-row items-center justify-between">
					<div className="mb-4 md:mb-0">
						<h4 className="text-xl font-bold mb-2">
							Tham gia Sportiverse ngay hôm nay!
						</h4>
						<p className="text-blue-100">
							Khám phá hơn 5000+ sản phẩm thể thao chất lượng cao
							và nhận ưu đãi đặc biệt dành cho thành viên mới.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MembershipBenefits;
