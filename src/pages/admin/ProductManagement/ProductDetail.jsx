import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiAlertCircle, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ProductDetail = () => {
	const { productId } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null); // State để quản lý ảnh được chọn

	// Hàm lấy ảnh chính
	const getPrimaryImage = (images) => {
		const primary = images?.find((img) => img.is_primary);
		return primary
			? primary.image_path
			: images?.[0]?.image_path || 'https://via.placeholder.com/300';
	};

	// Hàm mở modal ảnh
	const openImageModal = (image) => {
		setSelectedImage(image);
	};

	// Hàm đóng modal
	const closeImageModal = () => {
		setSelectedImage(null);
	};

	// Fetch chi tiết sản phẩm
	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetch(`/api/products/${productId}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
					},
				});

				if (response.ok) {
					const result = await response.json();
					if (result.status && result.data) {
						setProduct(result.data);
					} else {
						throw new Error('Invalid data format');
					}
				} else {
					throw new Error('Failed to fetch product');
				}
			} catch (err) {
				setError(err.message);
				toast.error(
					'Không thể tải thông tin sản phẩm. Vui lòng thử lại.'
				);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [productId]);

	if (loading) {
		return (
			<div className="max-w-6xl mx-auto py-8 text-center">
				<p className="text-gray-500">Đang tải thông tin sản phẩm...</p>
			</div>
		);
	}

	if (error || !product) {
		return (
			<div className="max-w-6xl mx-auto py-8 text-center">
				<FiAlertCircle className="mx-auto h-12 w-12 text-red-500" />
				<p className="mt-4 text-red-500">
					{error || 'Không tìm thấy sản phẩm.'}
				</p>
				<Link
					to="/admin/products"
					className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800"
				>
					<FiArrowLeft className="mr-2" /> Quay lại danh sách sản phẩm
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto py-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-900">
					Chi Tiết Sản Phẩm: {product.name}
				</h1>
				<Link
					to="/admin"
					className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
				>
					<FiArrowLeft className="mr-2" /> Quay lại danh sách
				</Link>
			</div>

			<div className="bg-white rounded-xl shadow-lg overflow-hidden">
				<div className="md:flex">
					{/* Hình ảnh sản phẩm */}
					<div className="md:w-1/3 p-6">
						<h2 className="text-lg font-semibold text-gray-800 mb-4">
							Hình Ảnh Sản Phẩm
						</h2>
						<img
							src={getPrimaryImage(product.images)}
							alt={product.name}
							className="w-full h-64 object-cover rounded-lg shadow-sm border border-gray-200 mb-4 cursor-pointer"
							onClick={() =>
								openImageModal(getPrimaryImage(product.images))
							}
						/>
						{product.images?.length > 1 && (
							<div className="grid grid-cols-3 gap-2">
								{product.images.map((image, index) => (
									<img
										key={index}
										src={image.image_path}
										alt={`Additional ${index}`}
										className="w-full h-20 object-cover rounded-lg border border-gray-200 cursor-pointer"
										onClick={() =>
											openImageModal(image.image_path)
										}
									/>
								))}
							</div>
						)}
					</div>

					{/* Thông tin chi tiết */}
					<div className="md:w-2/3 p-6">
						<div className="mb-6">
							<h2 className="text-lg font-semibold text-gray-800 mb-2">
								Thông Tin Cơ Bản
							</h2>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-sm text-gray-500">
										Tên sản phẩm
									</p>
									<p className="text-gray-900 font-medium">
										{product.name}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">
										Danh mục
									</p>
									<p className="text-gray-900 font-medium">
										{product.category?.name || 'N/A'}
									</p>
								</div>
							</div>
						</div>

						<div className="mb-6">
							<h2 className="text-lg font-semibold text-gray-800 mb-2">
								Giá & Tồn Kho
							</h2>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-sm text-gray-500">
										Giá gốc
									</p>
									<p className="text-gray-900 font-medium">
										{new Intl.NumberFormat('vi-VN', {
											style: 'currency',
											currency: 'VND',
										}).format(product.price)}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">
										Giá khuyến mãi
									</p>
									<p className="text-gray-900 font-medium">
										{product.sale_price > 0
											? new Intl.NumberFormat('vi-VN', {
													style: 'currency',
													currency: 'VND',
											  }).format(product.sale_price)
											: 'Không có'}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">
										Tồn kho
									</p>
									<p className="text-gray-900 font-medium">
										{product.stock_quantity} sản phẩm
									</p>
								</div>
							</div>
						</div>

						<div className="mb-6">
							<h2 className="text-lg font-semibold text-gray-800 mb-2">
								Mô Tả Sản Phẩm
							</h2>
							<p className="text-gray-700">
								{product.description || 'Không có mô tả.'}
							</p>
						</div>

						<div className="mb-6">
							<h2 className="text-lg font-semibold text-gray-800 mb-2">
								Trạng Thái
							</h2>
							<div className="flex space-x-4">
								<span
									className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
										product.is_active
											? 'bg-green-100 text-green-800'
											: 'bg-red-100 text-red-800'
									}`}
								>
									{product.is_active ? 'Kích hoạt' : 'Ẩn'}
								</span>
								{product.is_featured && (
									<span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
										Nổi bật
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Modal hiển thị ảnh phóng to */}
			{selectedImage && (
				<div
					className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ${
						selectedImage
							? 'opacity-100'
							: 'opacity-0 pointer-events-none'
					}`}
					onClick={closeImageModal}
				>
					<div
						className="relative max-w-4xl w-full"
						onClick={(e) => e.stopPropagation()}
					>
						<img
							src={selectedImage}
							alt="Zoomed"
							className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
						/>
						<button
							onClick={closeImageModal}
							className="absolute top-4 right-4 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700"
						>
							<FiX size={24} />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductDetail;
