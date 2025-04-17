import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegLightbulb } from 'react-icons/fa';
import { MdSportsSoccer } from 'react-icons/md';
import { BsArrowRightCircleFill, BsChevronRight } from 'react-icons/bs';
import { IoFitnessOutline } from 'react-icons/io5';
import { RiTeamFill } from 'react-icons/ri';
export default function ServicesAndFeatures() {
	return (
		<>
			{/* Phần dịch vụ và tính năng - tách riêng */}
			<section className="py-12">
				<div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Tiêu đề phần */}
					<div className="text-left mb-12">
						<h2 className="text-2xl font-bold text-gray-800 relative inline-block">
							<span className="relative z-10">
								Dịch vụ thể thao
							</span>
							<span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500 opacity-30 rounded-full z-0"></span>
						</h2>
						<p className="text-gray-600 mt-3 max-w-2xl">
							Chúng tôi cung cấp đa dạng dịch vụ hỗ trợ cho vận
							động viên và người yêu thích thể thao
						</p>
					</div>

					{/* Phần tính năng */}
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{/* Feature 1 */}
						<div className="p-6 group hover:bg-blue-50 transition-colors duration-300 bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100">
							<div className="flex items-center mb-4">
								<div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4 group-hover:bg-blue-200 transition-colors duration-300">
									<IoFitnessOutline className="w-6 h-6" />
								</div>
								<h3 className="font-semibold text-gray-800">
									Trang thiết bị chất lượng
								</h3>
							</div>
							<p className="text-gray-600 text-sm">
								Các sản phẩm thể thao chính hãng với chất lượng
								được đảm bảo
							</p>
							<Link
								to="/quality"
								className="flex items-center mt-3 text-blue-600 text-sm font-medium group-hover:text-blue-700"
							>
								Tìm hiểu thêm
								<BsChevronRight className="ml-1 group-hover:ml-2 transition-all duration-300" />
							</Link>
						</div>

						{/* Feature 2 */}
						<div className="p-6 group hover:bg-blue-50 transition-colors duration-300 bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100">
							<div className="flex items-center mb-4">
								<div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4 group-hover:bg-green-200 transition-colors duration-300">
									<MdSportsSoccer className="w-6 h-6" />
								</div>
								<h3 className="font-semibold text-gray-800">
									Đa dạng môn thể thao
								</h3>
							</div>
							<p className="text-gray-600 text-sm">
								Phục vụ nhu cầu của mọi vận động viên từ chuyên
								nghiệp đến nghiệp dư
							</p>
							<Link
								to="/sports"
								className="flex items-center mt-3 text-green-600 text-sm font-medium group-hover:text-green-700"
							>
								Khám phá ngay
								<BsChevronRight className="ml-1 group-hover:ml-2 transition-all duration-300" />
							</Link>
						</div>

						{/* Feature 3 */}
						<div className="p-6 group hover:bg-blue-50 transition-colors duration-300 bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100">
							<div className="flex items-center mb-4">
								<div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-4 group-hover:bg-orange-200 transition-colors duration-300">
									<FaRegLightbulb className="w-5 h-5" />
								</div>
								<h3 className="font-semibold text-gray-800">
									Tư vấn chuyên nghiệp
								</h3>
							</div>
							<p className="text-gray-600 text-sm">
								Đội ngũ tư vấn giàu kinh nghiệm sẵn sàng hỗ trợ
								bạn lựa chọn sản phẩm
							</p>
							<Link
								to="/consultancy"
								className="flex items-center mt-3 text-orange-600 text-sm font-medium group-hover:text-orange-700"
							>
								Liên hệ ngay
								<BsChevronRight className="ml-1 group-hover:ml-2 transition-all duration-300" />
							</Link>
						</div>

						{/* Feature 4 */}
						<div className="p-6 group hover:bg-blue-50 transition-colors duration-300 bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100">
							<div className="flex items-center mb-4">
								<div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4 group-hover:bg-purple-200 transition-colors duration-300">
									<RiTeamFill className="w-6 h-6" />
								</div>
								<h3 className="font-semibold text-gray-800">
									Đặt hàng theo đội nhóm
								</h3>
							</div>
							<p className="text-gray-600 text-sm">
								Giải pháp đặt hàng số lượng lớn cho câu lạc bộ
								và đội thể thao
							</p>
							<Link
								to="/team-orders"
								className="flex items-center mt-3 text-purple-600 text-sm font-medium group-hover:text-purple-700"
							>
								Đặt hàng theo nhóm
								<BsChevronRight className="ml-1 group-hover:ml-2 transition-all duration-300" />
							</Link>
						</div>
					</div>

					{/* Thêm phần CTA */}
					<div className="mt-14 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 relative overflow-hidden">
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
							<Link
								to="/register-athlete"
								className="flex items-center bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
							>
								<span>Đăng ký ngay</span>
								<BsArrowRightCircleFill className="ml-2 group-hover:ml-3 transition-all duration-300" />
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
