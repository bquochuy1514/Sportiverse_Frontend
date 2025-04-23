// src/components/products/ProductList.jsx
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ProductCard from '../../components/common/products/ProductCard';

const ProductList = ({ products, isLoading }) => {
	// Product skeleton loader
	if (isLoading) {
		return (
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{[...Array(10)].map((_, index) => (
					<div
						key={index}
						className="animate-pulse bg-white rounded-lg shadow-sm overflow-hidden"
					>
						<div className="bg-gray-200 h-40 w-full"></div>
						<div className="p-3 space-y-2">
							<div className="h-3 bg-gray-200 rounded w-3/4"></div>
							<div className="h-4 bg-gray-200 rounded w-1/2"></div>
							<div className="h-3 bg-gray-200 rounded w-full"></div>
							<div className="h-8 bg-gray-200 rounded"></div>
						</div>
					</div>
				))}
			</div>
		);
	}

	return (
		<motion.div
			className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ staggerChildren: 0.1 }}
		>
			{products.map((product, index) => (
				<ProductCard key={product.id} product={product} index={index} />
			))}
		</motion.div>
	);
};

export default ProductList;
