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

	// Nếu không có activeSport, không render gì cả
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

	const EmptySelection = () => (
		<div className="flex flex-col items-center justify-center h-full text-gray-400">
			<div className="w-24 h-24 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
				<BsGrid1X2 className="w-12 h-12 text-gray-300" />
			</div>
			<p className="text-lg font-medium mb-2">
				Chọn một danh mục để xem chi tiết
			</p>
			<p className="text-sm text-gray-500 text-center max-w-md">
				Khám phá các sản phẩm, giải đấu và thông tin mới nhất trong danh
				mục bạn quan tâm
			</p>
		</div>
	);

	const CategoryDetail = () => (
		<div>
			<div className="flex items-center justify-between mb-5">
				<div className="flex items-center">
					<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
						<span className="text-white font-bold text-lg">
							{selectedCategory?.name?.charAt(0) || ''}
						</span>
					</div>
					<div>
						<h3 className="text-2xl font-extrabold text-gray-800 tracking-tight">
							{selectedCategory?.name || ''}
						</h3>
						{selectedCategory?.description && (
							<p className="text-gray-500 mt-1 text-sm">
								{selectedCategory.description}
							</p>
						)}
					</div>
				</div>
				<Link
					to={`/category/${selectedCategory?.slug}`}
					className="inline-flex items-center py-2.5 px-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-full hover:from-blue-700 hover:to-blue-800 shadow-sm hover:shadow transition-all"
					onClick={onClose}
				>
					Xem tất cả
					<AiOutlineRight className="ml-2" />
				</Link>
			</div>

			<div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>

			{/* Sử dụng component FeaturedProducts mới */}
			<FeaturedProducts
				categoryId={selectedCategory?.id}
				categorySlug={selectedCategory?.slug}
			/>
		</div>
	);

	return (
		<div className="relative">
			<div
				className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-20"
				style={{ top: `${headerHeight}px` }}
				onClick={onClose}
			/>

			<div className="absolute top-2 left-16 right-16 h-[550px] bg-white shadow-2xl border border-gray-100 rounded-2xl overflow-hidden animate-fadeIn z-30">
				{/* Header */}
				<div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-blue-50 to-white">
					<div className="flex items-center">
						<div className="w-10 h-10 mr-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
							<img
								src={activeSport.icon}
								className="w-6 h-6 object-contain invert"
								alt={activeSport.name}
							/>
						</div>
						<h2 className="text-xl font-extrabold uppercase text-gray-800 tracking-wide">
							{activeSport.name}
						</h2>
					</div>
					<button
						className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
						onClick={onClose}
					>
						<AiOutlineClose className="h-5 w-5" />
					</button>
				</div>

				{/* Content */}
				<div className="flex h-full">
					{/* Sidebar danh mục */}
					<div className="w-1/4 py-5 px-5 border-r h-[calc(550px-70px)] overflow-y-auto bg-gradient-to-b from-gray-50 to-white custom-scrollbar">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-base font-bold uppercase text-gray-700 tracking-wide">
								Danh mục
							</h3>
							<Link
								to={`/sports/${activeSport.slug}`}
								className="text-xs text-blue-600 hover:text-blue-800 uppercase font-medium flex items-center"
								onClick={onClose}
							>
								Xem tất cả
								<AiOutlineRight className="w-3 h-3 ml-1" />
							</Link>
						</div>

						{/* Danh sách tất cả danh mục */}
						{isLoading || isLoadingChildren ? (
							<LoadingSkeleton />
						) : (
							<div className="space-y-6">
								{parentCategories.length > 0 ? (
									parentCategories.map((parent) => (
										<div key={parent.id} className="mb-4">
											<h4 className="text-sm font-semibold uppercase text-gray-500 tracking-wider py-2 border-b border-gray-100 mb-2">
												{parent.name}
											</h4>
											<ul className="space-y-1 pl-2">
												{parentChildMap[parent.id]
													?.length > 0 ? (
													parentChildMap[
														parent.id
													].map((child) => (
														<li key={child.id}>
															<div
																className={`flex items-center py-3 px-4 rounded-lg cursor-pointer transition-all ${
																	selectedCategory?.id ===
																	child.id
																		? 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-semibold shadow-sm'
																		: 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
																}`}
																onClick={() =>
																	setSelectedCategory(
																		child
																	)
																}
															>
																<span className="font-medium text-md">
																	{child.name}
																</span>
															</div>
														</li>
													))
												) : (
													<li className="py-2 px-4 text-gray-400 italic text-sm">
														Không có danh mục con
													</li>
												)}
											</ul>
										</div>
									))
								) : (
									<div className="py-4 px-4 text-gray-500 text-center">
										Không có danh mục nào
									</div>
								)}
							</div>
						)}
					</div>

					{/* Nội dung bên phải */}
					<div className="w-3/4 p-7 h-[calc(550px-70px)] overflow-y-auto custom-scrollbar">
						{selectedCategory ? (
							<CategoryDetail />
						) : (
							<EmptySelection />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SportsCategoryDropdown;
