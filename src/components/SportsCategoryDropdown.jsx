import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineRight, AiOutlineClose } from 'react-icons/ai';
import { BsGrid1X2 } from 'react-icons/bs';
import FeaturedProducts from './FeaturedProducts'; // Import the new component

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

	const LoadingSkeleton = () => (
		<div className="animate-pulse space-y-5">
			{[1, 2, 3].map((groupItem) => (
				<div key={groupItem}>
					<div className="h-8 bg-gray-200 rounded w-2/3 mb-3"></div>
					<div className="space-y-2 pl-3">
						{[1, 2, 3, 4].map((item) => (
							<div
								key={item}
								className="h-10 bg-gray-200 rounded-lg"
							></div>
						))}
					</div>
				</div>
			))}
		</div>
	);

	const CategoryDetail = () => (
		<div>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center">
					<div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md flex items-center justify-center mr-3 shadow-md">
						<span className="text-white font-bold text-base">
							{selectedCategory?.name?.charAt(0) || ''}
						</span>
					</div>
					<div>
						<h3 className="text-xl font-bold text-gray-800 tracking-tight">
							Sản phẩm nổi bật của:{' '}
							<span className="text-blue-600">
								{selectedCategory?.name || ''}
							</span>
						</h3>
					</div>
				</div>
				<Link
					to={`/category/${selectedCategory?.slug}`}
					className="inline-flex items-center py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-full hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md transition-all duration-200 text-sm group"
					onClick={onClose}
				>
					Xem tất cả
					<AiOutlineRight className="ml-1.5 group-hover:translate-x-0.5 transition-transform" />
				</Link>
			</div>

			<div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4"></div>

			{/* Sử dụng component FeaturedProducts mới */}
			<FeaturedProducts
				categoryId={selectedCategory?.id}
				categorySlug={selectedCategory?.slug}
			/>
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
				<div className="flex items-center h-14 justify-between p-4 border-b bg-gradient-to-r from-blue-50 via-white to-blue-50">
					<div className="flex items-center">
						<div className="w-9 h-9 mr-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
							<img
								src={activeSport.icon}
								className="w-5 h-5 object-contain filter"
								alt={activeSport.name}
							/>
						</div>
						<h2 className="text-lg font-bold uppercase text-gray-800 tracking-wide">
							{activeSport.name}
						</h2>
					</div>
					<button
						className="text-gray-500 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-full transition-all duration-200"
						onClick={onClose}
					>
						<AiOutlineClose className="h-4 w-4" />
					</button>
				</div>

				{/* Content - Cải thiện bố cục và màu sắc */}
				<div className="flex h-full">
					{/* Sidebar danh mục - Cải thiện màu nền và style */}
					<div className="w-1/4 py-4 px-4 border-r h-[calc(550px-56px)] overflow-y-auto bg-gradient-to-b from-gray-50 to-white custom-scrollbar">
						<div className="flex justify-between items-center mb-3">
							<h3 className="text-sm font-bold uppercase text-gray-700 tracking-wide">
								Danh mục
							</h3>
							<Link
								to={`/sports/${activeSport.slug}`}
								className="text-xs text-blue-600 hover:text-blue-800 uppercase font-medium flex items-center group"
								onClick={onClose}
							>
								Xem tất cả
								<AiOutlineRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
							</Link>
						</div>

						{/* Danh sách danh mục - Cải thiện giao diện */}
						{isLoading || isLoadingChildren ? (
							<LoadingSkeleton />
						) : (
							<div className="space-y-4">
								{parentCategories.length > 0 ? (
									parentCategories.map((parent) => (
										<div key={parent.id} className="mb-3">
											<h4 className="text-xs font-semibold uppercase text-gray-500 tracking-wider py-2 border-b border-gray-100 mb-2">
												{parent.name}
											</h4>
											<ul className="space-y-0.5 pl-1">
												{parentChildMap[parent.id]
													?.length > 0 ? (
													parentChildMap[
														parent.id
													].map((child) => (
														<li key={child.id}>
															<div
																className={`flex items-center py-2 px-3 rounded-md cursor-pointer transition-all duration-200 ${
																	selectedCategory?.id ===
																	child.id
																		? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-sm'
																		: 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
																}`}
																onClick={() =>
																	setSelectedCategory(
																		child
																	)
																}
															>
																<span className="font-medium text-sm">
																	{child.name}
																</span>
															</div>
														</li>
													))
												) : (
													<li className="py-2 px-3 text-gray-400 italic text-xs">
														Không có danh mục con
													</li>
												)}
											</ul>
										</div>
									))
								) : (
									<div className="py-3 px-3 text-gray-500 text-center text-sm">
										Không có danh mục nào
									</div>
								)}
							</div>
						)}
					</div>

					{/* Nội dung bên phải - Cải thiện padding và space */}
					<div className="w-3/4 p-6 h-[calc(550px-56px)] overflow-y-auto custom-scrollbar">
						{selectedCategory ? (
							<CategoryDetail />
						) : (
							<div>
								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<div>
											<h3 className="text-xl font-bold text-gray-800 tracking-tight">
												Sản phẩm nổi bật của:{' '}
												<span className="text-blue-600">
													{activeSport.name}
												</span>
											</h3>
										</div>
									</div>
									<Link
										to={`/sports/${activeSport.slug}`}
										className="inline-flex items-center py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-full hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md transition-all duration-200 text-sm"
										onClick={onClose}
									>
										Xem tất cả
										<AiOutlineRight className="ml-1.5 group-hover:translate-x-0.5 transition-transform" />
									</Link>
								</div>

								<div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>

								{/* Sử dụng component FeaturedProducts với sportId */}
								<FeaturedProducts
									sportId={activeSport.id}
									sportSlug={activeSport.slug}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SportsCategoryDropdown;
