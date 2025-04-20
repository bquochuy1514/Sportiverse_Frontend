import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	AiOutlineRight,
	AiOutlineClose,
	AiOutlineInfoCircle,
} from 'react-icons/ai';
import { BsGrid1X2, BsDatabase } from 'react-icons/bs';
import { FiFolder, FiChevronRight } from 'react-icons/fi';
import FeaturedProducts from './FeaturedProducts';

const SportsCategoryDropdown = ({
	activeSport,
	categories,
	isLoading,
	headerHeight,
	onClose,
}) => {
	const [parentChildMap, setParentChildMap] = useState({});
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [isLoadingChildren, setIsLoadingChildren] = useState(false);

	// Xử lý categories và fetch danh mục con
	useEffect(() => {
		if (categories?.length > 0 && activeSport) {
			const fetchChildCategories = async () => {
				const parents = categories.filter(
					(cat) => cat.parent_id === null
				);
				setIsLoadingChildren(true);

				try {
					const childrenPromises = parents.map(async (parent) => {
						try {
							const response = await fetch(
								`/api/categories?sport_id=${activeSport.id}&parent_id=${parent.id}`
							);
							if (!response.ok) return [parent.id, []];

							const result = await response.json();
							return [parent.id, result.data || []];
						} catch (error) {
							console.error(
								`Error fetching children for parent ${parent.id}:`,
								error
							);
							return [parent.id, []];
						}
					});

					const results = await Promise.all(childrenPromises);
					const newParentChildMap = Object.fromEntries(results);
					setParentChildMap(newParentChildMap);
				} catch (error) {
					console.error('Error fetching children categories:', error);
				} finally {
					setIsLoadingChildren(false);
				}
			};

			fetchChildCategories();
		}
	}, [categories, activeSport]);

	// Nếu không có activeSport thì không render component
	if (!activeSport) return null;

	const parentCategories =
		categories?.filter((cat) => cat.parent_id === null) || [];

	// Cập nhật LoadingSkeleton với React Icons
	const LoadingSkeleton = () => (
		<div className="animate-pulse space-y-5">
			{[1, 2, 3, 4].map((groupItem) => (
				<div key={groupItem} className="mb-4">
					<div className="h-4 bg-gray-200 rounded-full w-28 mb-3"></div>
					<div className="space-y-2 pl-2">
						{[1, 2, 3, 4].map((item) => (
							<div key={item} className="flex items-center">
								<div className="h-3 w-3 rounded-full bg-gray-200 mr-2"></div>
								<div className="h-8 bg-gray-200 rounded-lg w-full"></div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);

	const CategoryDetail = () => (
		<div className="relative">
			{/* Header with category info */}
			<div className="flex items-center mb-5">
				<div className="w-12 h-12 relative mr-4 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md flex items-center justify-center overflow-hidden group">
					{/* Animated background */}
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

					<span className="text-white font-bold text-xl relative z-10">
						{selectedCategory?.name?.charAt(0) || ''}
					</span>
				</div>

				<div className="flex-1">
					<div className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">
						Danh mục sản phẩm
					</div>
					<h3 className="text-xl font-bold text-gray-800 tracking-tight relative inline-block">
						<span className="relative z-10">
							{selectedCategory?.name || ''}
						</span>
						<span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/40 to-indigo-500/40 rounded-full"></span>
					</h3>
				</div>
			</div>

			<div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>

			{/* Product list container */}
			<div className="pb-20">
				<FeaturedProducts
					categoryId={selectedCategory?.id}
					categorySlug={selectedCategory?.slug}
				/>
			</div>
		</div>
	);

	return (
		<div className="relative">
			{/* Nền mờ khi mở dropdown - thêm hiệu ứng transition */}
			<div
				className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-20 transition-opacity duration-300"
				style={{ top: `${headerHeight}px` }}
				onClick={onClose}
			/>

			{/* Nội dung dropdown - Thêm hiệu ứng shadow và animation */}
			<div className="absolute top-2 left-16 right-16 h-[550px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 rounded-xl overflow-hidden animate-fadeIn z-30">
				{/* Header - Làm gradient đẹp hơn */}
				<div className="flex items-center h-16 justify-between px-6 border-b bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/80 backdrop-blur-sm shadow-sm relative overflow-hidden">
					{/* Hiệu ứng nền */}
					<div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
					<div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
					<div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

					{/* Header  */}
					<div className="flex items-center relative z-10">
						{/* Logo container với hiệu ứng glow */}
						<div className="relative group">
							<div className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-0 group-hover:opacity-30 transform scale-110 transition-all duration-300"></div>
							<div className="w-10 h-10 mr-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden">
								{/* Hiệu ứng ánh sáng chuyển động */}
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

								<img
									src={activeSport.icon}
									className="w-6 h-6 object-contain filter transform group-hover:scale-110 transition-transform"
									alt={activeSport.name}
								/>
							</div>
						</div>

						{/* Tiêu đề với hiệu ứng text gradient */}
						<div className="flex flex-col">
							<span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
								Khám phá
							</span>
							<h2 className="text-lg font-extrabold uppercase tracking-wide bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
								{activeSport.name}
							</h2>
						</div>
					</div>

					{/* Nút đóng với hiệu ứng hover nâng cao */}
					<div className="relative">
						<button
							className="group relative p-2.5 rounded-full transition-all duration-300 hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-30"
							onClick={onClose}
							aria-label="Đóng"
						>
							{/* Hiệu ứng ripple khi hover */}
							<span className="absolute inset-0 transform scale-0 rounded-full bg-red-50 group-hover:scale-100 transition-transform duration-300"></span>

							{/* Icon với hiệu ứng xoay */}
							<AiOutlineClose className="h-5 w-5 text-gray-500 group-hover:text-red-500 relative z-10 transform group-hover:rotate-90 transition-all duration-300" />
						</button>
					</div>
				</div>

				{/* Content - Cải thiện bố cục và màu sắc */}
				<div className="flex h-full">
					{/* Sidebar danh mục - Thiết kế nâng cao */}
					<div className="w-1/4 py-4 px-4 border-r h-[calc(550px-56px)] overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-indigo-50 custom-scrollbar">
						{/* Header phần danh mục */}
						<div className="flex justify-between items-center mb-4 px-1">
							<h3 className="text-sm font-bold uppercase text-gray-700 tracking-wide flex items-center">
								<BsGrid1X2 className="mr-2 text-blue-600" />
								Danh mục
							</h3>
							<Link
								to={`/sports/${activeSport.slug}`}
								className="text-xs text-blue-600 hover:text-blue-800 uppercase font-medium flex items-center group transition-all duration-200 hover:font-bold"
								onClick={onClose}
							>
								Xem tất cả
								<AiOutlineRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
							</Link>
						</div>

						{/* Danh sách danh mục - Thiết kế nâng cao */}
						{isLoading || isLoadingChildren ? (
							<LoadingSkeleton />
						) : (
							<div className="space-y-4">
								{parentCategories.length > 0 ? (
									parentCategories.map((parent) => (
										<div key={parent.id} className="mb-5">
											{/* Tiêu đề danh mục cha với hiệu ứng gradient */}
											<h4 className="text-xs font-semibold uppercase text-gray-600 tracking-wider py-2 mb-2 flex items-center relative overflow-hidden group">
												<FiFolder className="mr-2 text-blue-500 group-hover:text-blue-600 transition-colors" />
												<span className="relative z-10 bg-gradient-to-r from-gray-800 to-gray-600 text-transparent bg-clip-text group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
													{parent.name}
												</span>
												<div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
											</h4>

											{/* Danh sách danh mục con với hiệu ứng hover nâng cao */}
											<ul className="space-y-1.5 pl-1">
												{parentChildMap[parent.id]
													?.length > 0 ? (
													parentChildMap[
														parent.id
													].map((child) => (
														<li key={child.id}>
															<div
																className={`flex items-center py-2.5 px-3.5 rounded-lg cursor-pointer transition-all duration-200 relative overflow-hidden group ${
																	selectedCategory?.id ===
																	child.id
																		? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-md transform scale-105'
																		: 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm'
																}`}
																onClick={() =>
																	setSelectedCategory(
																		child
																	)
																}
															>
																{/* Hiệu ứng ripple khi hover */}
																<span
																	className={`absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-200 opacity-0 transform scale-x-0 origin-left transition-transform duration-300 ${
																		selectedCategory?.id !==
																		child.id
																			? 'group-hover:scale-x-100 group-hover:opacity-50'
																			: ''
																	}`}
																></span>

																{/* Icon danh mục */}
																<span
																	className={`mr-2 ${
																		selectedCategory?.id ===
																		child.id
																			? 'text-white'
																			: 'text-blue-500'
																	}`}
																>
																	<FiChevronRight className="w-3.5 h-3.5" />
																</span>

																{/* Tên danh mục */}
																<span className="font-medium text-sm relative z-10">
																	{child.name}
																</span>

																{/* Badge số lượng sản phẩm (tuỳ chọn - cần thêm dữ liệu) */}
																{child.product_count && (
																	<span
																		className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${
																			selectedCategory?.id ===
																			child.id
																				? 'bg-white text-blue-600'
																				: 'bg-gray-100 text-gray-500'
																		}`}
																	>
																		{
																			child.product_count
																		}
																	</span>
																)}

																{/* Hiệu ứng đường viền khi được chọn */}
																{selectedCategory?.id ===
																	child.id && (
																	<span className="absolute inset-0 bg-white opacity-20 animate-pulse-slow"></span>
																)}
															</div>
														</li>
													))
												) : (
													<li className="py-3 px-4 text-gray-400 italic text-xs bg-gray-50 rounded-lg border border-gray-100">
														<div className="flex items-center justify-center">
															<AiOutlineInfoCircle className="w-4 h-4 mr-1.5 text-gray-300" />
															Không có danh mục
															con
														</div>
													</li>
												)}
											</ul>
										</div>
									))
								) : (
									<div className="py-4 px-4 text-gray-500 text-center text-sm bg-gray-50 rounded-lg border border-dashed border-gray-200">
										<BsDatabase className="w-8 h-8 mx-auto mb-2 text-gray-300" />
										Không có danh mục nào
									</div>
								)}
							</div>
						)}
					</div>

					{/* Nội dung bên phải - Enhanced styling */}
					<div className="w-3/4 p-4 h-[calc(550px-56px)] overflow-y-auto custom-scrollbar bg-gradient-to-br from-white via-white to-gray-50">
						{selectedCategory ? (
							<CategoryDetail />
						) : (
							<div className="space-y-4">
								{/* Enhanced header with decorative elements */}
								<div className="relative">
									{/* Decorative background elements */}
									<div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
									<div className="absolute top-10 -left-6 w-16 h-16 bg-indigo-100 rounded-full mix-blend-multiply filter blur-lg opacity-60"></div>

									{/* Header content with enhanced styling */}
									<div className="flex items-center justify-between relative z-10 h-12">
										<div className="flex-1">
											<div className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1 flex items-center">
												<BsGrid1X2 className="mr-2 text-blue-500" />
												Khám phá bộ sưu tập
											</div>
											<h3 className="text-xl font-bold text-gray-800 tracking-tight group">
												Sản phẩm nổi bật của:{' '}
												<span className="relative inline-block">
													<span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
														{activeSport.name}
													</span>
													<span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full transform origin-left transition-transform duration-300"></span>
												</span>
											</h3>
										</div>

										{/* Enhanced CTA button with hover effects */}
										<Link
											to={`/sports/${activeSport.slug}`}
											className="group inline-flex items-center py-2.5 px-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-full hover:from-blue-600 hover:to-indigo-700 shadow-sm hover:shadow-md transition-all duration-300 text-sm relative overflow-hidden"
											onClick={onClose}
										>
											{/* Button shine effect */}
											<span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>

											<span className="relative z-10">
												Xem tất cả
											</span>
											<AiOutlineRight className="ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
										</Link>
									</div>
								</div>

								{/* Enhanced divider with gradient */}
								<div className="w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent my-6"></div>

								{/* Featured products section with enhanced container */}
								<div className="relative">
									{/* Products grid container with subtle shadow and rounded corners */}
									<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300">
										{/* FeaturedProducts component remains unchanged */}
										<FeaturedProducts
											sportId={activeSport.id}
											sportSlug={activeSport.slug}
											onClose={onClose}
										/>
									</div>
								</div>

								{/* Enhanced bottom section with additional info/categories */}
								<div className="mt-8">
									<div className="flex items-center mb-4">
										<div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
											<AiOutlineInfoCircle className="w-4 h-4 text-indigo-600" />
										</div>
										<h4 className="text-base font-semibold text-gray-700">
											Danh mục phổ biến
										</h4>
									</div>

									{/* Phần danh mục phổ biến ở dưới */}
									<div className="flex flex-wrap gap-2">
										{parentCategories
											.slice(0, 5)
											.map((category) => (
												<div
													key={category.id}
													className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full text-sm text-gray-700 font-medium hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 cursor-pointer transition-colors duration-300 flex items-center group border border-gray-200 hover:border-blue-200"
													onClick={() => {
														const firstChild =
															parentChildMap[
																category.id
															]?.[0];
														if (firstChild)
															setSelectedCategory(
																firstChild
															);
													}}
												>
													<FiFolder className="w-3.5 h-3.5 mr-2 text-blue-500 group-hover:text-blue-600" />
													{category.name}
													<FiChevronRight className="ml-1.5 w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
												</div>
											))}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SportsCategoryDropdown;
