import React, { useState, useEffect } from 'react';
import { FaSpinner, FaBoxOpen } from 'react-icons/fa';
import ProductCard from './ProductCard';

const RelatedProductsSection = ({
	currentProductId,
	categoryId,
	sportId,
	sectionTitle = 'Sản phẩm liên quan',
}) => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchRelatedProducts = async () => {
			setIsLoading(true);
			try {
				// API call để lấy sản phẩm liên quan dựa trên category_id và sport_id
				const response = await fetch(
					`/api/products/?sport_id=${sportId}&limit=10&sort_by=created_at`
				);
				const result = await response.json();
				const data = result.data;

				if (result.status) {
					// Loại bỏ sản phẩm hiện tại và giới hạn 5 sản phẩm
					const newData = data
						.filter((d) => d.id !== currentProductId)
						.slice(0, 5);
					setProducts(newData);
				} else {
					setProducts([]);
				}
			} catch (error) {
				console.error('Error fetching related products:', error);
				setProducts([]);
			} finally {
				setIsLoading(false);
			}
		};

		if (categoryId && sportId && currentProductId) {
			fetchRelatedProducts();
		}
	}, [categoryId, sportId, currentProductId]);

	// Component hiển thị khi đang tải
	if (isLoading) {
		return (
			<div className="mt-10 bg-slate-50 rounded-lg shadow-sm p-5">
				<h2 className="text-base font-medium text-gray-700 mb-4 flex items-center">
					<span className="text-blue-500 mr-2">
						<FaBoxOpen />
					</span>
					{sectionTitle}
				</h2>
				<div className="flex justify-center items-center py-8">
					<FaSpinner className="animate-spin text-blue-500 text-xl" />
					<span className="ml-2 text-gray-600 text-sm">
						Đang tải sản phẩm...
					</span>
				</div>
			</div>
		);
	}

	// Nếu không có sản phẩm liên quan
	if (products.length === 0) {
		return null; // Không hiển thị section nếu không có sản phẩm liên quan
	}

	return (
		<div className="mt-10 bg-slate-50 rounded-lg shadow-sm overflow-hidden">
			{/* Header section */}
			<div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
				<h2 className="text-base font-medium text-gray-700 flex items-center">
					<span className="bg-blue-50 text-blue-500 p-1.5 rounded-md mr-2">
						<FaBoxOpen size={16} />
					</span>
					{sectionTitle}
				</h2>
			</div>

			{/* Product grid */}
			<div className="px-5 py-6 bg-slate-50">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
					{products.map((product, index) => (
						<div key={product.id} className="product-card-wrapper">
							<ProductCard product={product} index={index} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default RelatedProductsSection;
