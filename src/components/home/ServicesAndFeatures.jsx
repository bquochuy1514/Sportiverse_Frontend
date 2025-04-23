import React from 'react';
import { BsArrowRightCircleFill } from 'react-icons/bs';

export default function ServicesAndFeatures() {
	return (
		<>
			{/* Phần dịch vụ và tính năng - tách riêng */}
			<section className="py-12">
				<div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
					{' '}
					{/* Thêm phần CTA */}
					<div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 relative overflow-hidden">
						<div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
						<div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full -ml-20 -mb-20"></div>

						<div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
							<div className="mb-6 md:mb-0 md:mr-8">
								<h3 className="text-white text-2xl font-bold mb-3">
									Bạn là huấn luyện viên hoặc vận động viên?
								</h3>
								<p className="text-blue-100 max-w-xl">
									Đăng ký nhận tư vấn và ưu đãi độc quyền dành
									cho huấn luyện viên và vận động viên chuyên
									nghiệp.
								</p>
							</div>
							<div className="flex items-center cursor-pointer bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 group">
								<span>Đăng ký ngay</span>
								<BsArrowRightCircleFill className="ml-2 group-hover:ml-3 transition-all duration-300" />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
