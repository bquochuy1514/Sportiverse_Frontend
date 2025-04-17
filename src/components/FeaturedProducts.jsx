import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	AiOutlineArrowRight,
	AiOutlineHeart,
	AiFillHeart,
	AiOutlineShoppingCart,
} from 'react-icons/ai';
import { BiCheckCircle } from 'react-icons/bi';

const FeaturedProducts = ({
	categoryId,
	categorySlug,
	sportId,
	sportSlug,
	onClose,
	limit = 6,
}) => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			try {
				// Xây dựng URL dựa trên params được truyền vào
				let url = '/api/products?';

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

	const formatPrice = (price) => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price);
	};

	const calculateDiscountPercentage = (original, sale) => {
		if (!original || !sale || original <= 0) return 0;
		return Math.round(((original - sale) / original) * 100);
	};

	const toggleFavorite = (e, productId) => {
		e.preventDefault(); // Ngăn chặn chuyển trang
		e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài

		const newFavorites = favorites.includes(productId)
			? favorites.filter((id) => id !== productId)
			: [...favorites, productId];

		setFavorites(newFavorites);
	};

	// Các trạng thái loading và error
	if (isLoading) {
		return (
			<div className="grid grid-cols-3 gap-4">
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
			<div className="grid grid-cols-3 gap-5">
				{products.map((product) => (
					<Link
						key={product.id}
						to={`/product/${product.slug}`}
						onClick={onClose}
						className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
					>
						<div className="relative overflow-hidden bg-gray-50">
							<div className="aspect-[4/3] overflow-hidden">
								<img
									src={product.images[0].image_path}
									alt={product.name}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
								/>
							</div>

							{/* Các badge */}
							<div className="absolute top-0 left-0 p-2 flex flex-col gap-1">
								{product.sale_price > 0 && (
									<div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
										Giảm {''}
										{calculateDiscountPercentage(
											product.price,
											product.sale_price
										)}
										%
									</div>
								)}
								{/* Badge nổi bật mới */}
								{product.is_featured && (
									<div className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm flex items-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-3 w-3 mr-0.5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
										</svg>
										Nổi bật
									</div>
								)}
							</div>

							{/* Nút thêm vào yêu thích */}
							<button
								className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md text-gray-400 hover:text-red-500 transition-colors z-10"
								onClick={(e) => toggleFavorite(e, product.id)}
							>
								{favorites.includes(product.id) ? (
									<AiFillHeart className="w-5 h-5 text-red-500" />
								) : (
									<AiOutlineHeart className="w-5 h-5" />
								)}
							</button>
						</div>

						<div className="p-3 flex flex-col flex-grow">
							<h3 className="font-medium text-gray-800 mb-2 line-clamp-2 text-sm group-hover:text-blue-600 transition-colors">
								{product.name}
							</h3>

							<div className="mt-auto">
								<div className="flex items-center">
									{product.sale_price > 0 ? (
										<>
											<span className="text-blue-600 font-bold text-sm">
												{formatPrice(
													product.sale_price
												)}
											</span>

											<span className="ml-2 text-gray-400 text-xs line-through">
												{formatPrice(product.price)}
											</span>
										</>
									) : (
										<span className="text-blue-600 font-bold text-sm">
											{formatPrice(product.price)}
										</span>
									)}
								</div>

								{/* Trạng thái tồn kho */}
								<div className="flex justify-between items-center mt-2">
									{product.stock_quantity === 0 ? (
										<div className="text-xs text-red-500 font-medium">
											Hết hàng
										</div>
									) : product.stock_quantity &&
									  product.stock_quantity < 20 ? (
										<div className="text-xs text-amber-500 font-medium flex items-center">
											<span>Sắp hết hàng</span>
										</div>
									) : (
										<div className="text-xs text-green-500 font-medium flex items-center">
											<BiCheckCircle className="mr-1" />
											<span>Còn hàng</span>
										</div>
									)}

									{/* Nút thêm vào giỏ hàng */}
									{product.stock_quantity !== 0 && (
										<button className="text-white bg-blue-600 hover:bg-blue-700 rounded-full p-1.5 shadow-sm">
											<AiOutlineShoppingCart className="w-4 h-4" />
										</button>
									)}
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>

			{/* Liên kết xem tất cả */}
			{(categorySlug || sportSlug) && (
				<div className="mt-6 text-center">
					<Link
						to={
							categorySlug
								? `/category/${categorySlug}`
								: `/sports/${sportSlug}`
						}
						className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
					>
						Xem tất cả sản phẩm
						<AiOutlineArrowRight className="ml-2" />
					</Link>
				</div>
			)}
		</>
	);
};

export default FeaturedProducts;
