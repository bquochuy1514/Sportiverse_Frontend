// src/components/auth/MembershipBenefits.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MembershipBenefits = () => {
	return (
		<div className="mt-16 border-t border-gray-200 pt-8">
			<div className="bg-blue-50 rounded-lg p-6 shadow-sm">
				<h3 className="text-lg font-semibold text-blue-800 mb-3">
					Lợi ích thành viên Sportiverse
				</h3>
				<ul className="space-y-2 text-sm text-gray-700">
					<li className="flex items-start">
						<svg
							className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>Ưu đãi đặc biệt dành riêng cho thành viên</span>
					</li>
					<li className="flex items-start">
						<svg
							className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>
							Tích điểm với mỗi đơn hàng và đổi quà hấp dẫn
						</span>
					</li>
					<li className="flex items-start">
						<svg
							className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>Cập nhật xu hướng thể thao mới nhất</span>
					</li>
					<li className="flex items-start">
						<svg
							className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>
							Miễn phí vận chuyển cho đơn hàng từ 500.000đ
						</span>
					</li>
				</ul>
			</div>

			<div className="mt-8 text-center">
				<p className="text-xs text-gray-500">
					Bằng cách đăng nhập, bạn đồng ý với{' '}
					<Link to="/terms" className="text-blue-600 hover:underline">
						Điều khoản sử dụng
					</Link>{' '}
					và{' '}
					<Link
						to="/privacy"
						className="text-blue-600 hover:underline"
					>
						Chính sách bảo mật
					</Link>{' '}
					của chúng tôi.
				</p>
				<p className="text-xs text-gray-500 mt-4">
					© {new Date().getFullYear()} Sportiverse. Tất cả các quyền
					được bảo lưu.
				</p>
			</div>
		</div>
	);
};

export default MembershipBenefits;
