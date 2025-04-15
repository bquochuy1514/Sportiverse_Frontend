import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiFireLine } from 'react-icons/ri';
import { AiOutlineRight } from 'react-icons/ai';

const FeaturedProducts = ({ categoryId, categorySlug }) => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchFeaturedProducts = async () => {
			if (!categoryId) return;

			setIsLoading(true);
			try {
				const response = await fetch(
					`/api/products?category_id=${categoryId}`
				);
				if (!response.ok)
					throw new Error('Failed to fetch featured products');

				const data = await response.json();
				setProducts(data.data || []);
			} catch (error) {
				console.error('Error fetching featured products:', error);
				setProducts([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchFeaturedProducts();
	}, [categoryId]);

	if (isLoading) {
		return (
			<div>
				<div className="flex items-center mb-4">
					<RiFireLine className="text-orange-500 mr-2 text-xl" />
					<h4 className="text-lg font-bold text-gray-800">
						Sản phẩm nổi bật
					</h4>
				</div>
				<div className="grid grid-cols-4 gap-4">
					{[1, 2, 3, 4].map((item) => (
						<div key={item} className="animate-pulse">
							<div className="bg-gray-200 h-40 rounded-lg mb-2"></div>
							<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
							<div className="h-4 bg-gray-200 rounded w-1/2"></div>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (products.length === 0) {
		return (
			<div>
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center">
						<RiFireLine className="text-orange-500 mr-2 text-xl" />
						<h4 className="text-lg font-bold text-gray-800">
							Sản phẩm nổi bật
						</h4>
					</div>
				</div>
				<div className="flex items-center justify-center h-52 bg-gradient-to-b from-gray-50 to-white rounded-lg border border-dashed border-gray-200 text-gray-400">
					<div className="text-center p-6">
						<div className="w-16 h-16 mb-4 bg-orange-50 rounded-full mx-auto flex items-center justify-center">
							<RiFireLine className="w-8 h-8 text-orange-300" />
						</div>
						<p className="text-sm font-medium">
							Chưa có sản phẩm nổi bật
						</p>
						<p className="text-xs text-gray-500 mt-1">
							Vui lòng quay lại sau
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center">
					<RiFireLine className="text-orange-500 mr-2 text-xl" />
					<h4 className="text-lg font-bold text-gray-800">
						Sản phẩm nổi bật
					</h4>
				</div>
				{categorySlug && (
					<Link
						to={`/category/${categorySlug}?featured=1`}
						className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
					>
						Xem tất cả
						<AiOutlineRight className="w-3 h-3 ml-1" />
					</Link>
				)}
			</div>

			<div className="grid grid-cols-4 gap-4">
				{products.map((product) => (
					<Link
						key={product.id}
						to={`/product/${product.slug}`}
						className="group"
					>
						<div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group-hover:border-blue-100">
							<div className="h-40 overflow-hidden relative">
								<img
									src={product.images[0]?.image_path}
									alt={product.name}
									className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
								/>
								{product.discount_percent > 0 && (
									<div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
										-{product.discount_percent}%
									</div>
								)}
							</div>
							<div className="p-3">
								<h5 className="font-medium text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
									{product.name}
								</h5>
								<div className="flex items-center mt-1">
									<span className="font-bold text-blue-600">
										{new Intl.NumberFormat('vi-VN', {
											style: 'currency',
											currency: 'VND',
										}).format(product.sale_price)}
									</span>
									{product.discount_percent > 0 && (
										<span className="text-xs text-gray-400 line-through ml-2">
											{new Intl.NumberFormat('vi-VN', {
												style: 'currency',
												currency: 'VND',
											}).format(product.price)}
										</span>
									)}
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default FeaturedProducts;
