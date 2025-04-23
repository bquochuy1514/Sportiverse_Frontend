import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import ProductCard from './common/products/ProductCard';

const FeaturedProducts = ({
	categoryId,
	categorySlug,
	sportId,
	sportSlug,
	onClose,
	limit = 8,
}) => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			try {
				// Xây dựng URL dựa trên params được truyền vào
				let url = '/api/featured-products?';

				if (categoryId) {
					url += `category_id=${categoryId}&`;
				} else if (sportId) {
					url += `sport_id=${sportId}&`;
				}

				url += `limit=${limit}`;

				const response = await fetch(url);
				if (!response.ok) throw new Error('Failed to fetch products');

				const result = await response.json();
				setProducts(result.data || []);
			} catch (err) {
				console.error('Error fetching products:', err);
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		// Tự động fetch products khi component được render
		fetchProducts();
	}, [categoryId, sportId, limit]);

	// Các trạng thái loading và error
	if (isLoading) {
		return (
			<div className="grid grid-cols-4 gap-4">
				{Array(limit)
					.fill(0)
					.map((_, index) => (
						<div key={index} className="animate-pulse">
							<div className="bg-gray-200 rounded-lg aspect-square mb-2"></div>
							<div className="h-5 bg-gray-200 rounded w-3/4 mb-1"></div>
							<div className="h-4 bg-gray-200 rounded w-1/2"></div>
						</div>
					))}
			</div>
		);
	}

	if (error) {
		return <div className="text-red-500 p-4">Error: {error}</div>;
	}

	if (products.length === 0) {
		return (
			<div className="text-center py-8">
				<div className="text-gray-400 mb-2">Chưa có sản phẩm nào</div>
				<p className="text-sm text-gray-500">
					Vui lòng quay lại sau, chúng tôi sẽ cập nhật sớm.
				</p>
			</div>
		);
	}

	// Mặc định hiển thị grid dạng đầy đủ
	return (
		<>
			<div className="grid grid-cols-4 gap-5">
				{products.map((product, index) => (
					<Link
						key={product.id}
						to={`/product/${product.slug}`}
						onClick={onClose}
						className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
					>
						<ProductCard
							key={product.id}
							product={product}
							index={index}
						/>
					</Link>
				))}
			</div>

			{/* Liên kết xem tất cả */}
			{(categorySlug || sportSlug) && (
				<Link
					to={
						categorySlug
							? `/sports/${sportSlug}`
							: `/sports/${sportSlug}`
					}
					className="mt-6 inline-block text-center bg-blue-600 w-full py-2 rounded-md font-semibold shadow-md hover:bg-blue-700 transition-colors duration-200"
					onClick={onClose}
				>
					<div className="inline-flex items-center text-white font-medium">
						Xem tất cả sản phẩm
						<AiOutlineArrowRight className="ml-2" />
					</div>
				</Link>
			)}
		</>
	);
};

export default FeaturedProducts;
