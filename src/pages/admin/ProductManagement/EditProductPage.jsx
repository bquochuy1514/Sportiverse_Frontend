/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

const EditProductPage = () => {
	const { productId } = useParams();
	const navigate = useNavigate();

	// State quản lý dữ liệu form
	const [formData, setFormData] = useState({
		sport_id: '',
		category_id: '',
		name: '',
		description: '',
		price: 0,
		sale_price: 0,
		stock_quantity: 0,
		is_featured: false,
		is_active: true,
	});

	// State quản lý các danh sách dropdown
	const [sports, setSports] = useState([]);
	const [categories, setCategories] = useState([]);

	// State quản lý ảnh
	const [existingImages, setExistingImages] = useState([]);

	// State loading
	const [isLoading, setIsLoading] = useState(true);

	// Fetch dữ liệu ban đầu
	useEffect(() => {
		const fetchInitialData = async () => {
			try {
				// Fetch thông tin sản phẩm
				const productResponse = await fetch(
					`/api/products/${productId}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								'token'
							)}`,
						},
					}
				);
				const productData = await productResponse.json();

				// Fetch danh sách môn thể thao
				const sportsResponse = await fetch('/api/sports');
				const sportsData = await sportsResponse.json();

				// Fetch danh mục theo môn thể thao
				const categoriesResponse = await fetch(
					`/api/categories?sport_id=${productData.data.sport_id}`
				);
				const categoriesData = await categoriesResponse.json();

				// Cập nhật state
				setSports(sportsData.data);
				setCategories(categoriesData.data);
				setExistingImages(productData.data.images || []);

				// Thiết lập dữ liệu sản phẩm
				setFormData({
					sport_id: productData.data.sport_id,
					category_id: productData.data.category_id,
					name: productData.data.name,
					description: productData.data.description || '',
					price: productData.data.price,
					sale_price: productData.data.sale_price || 0,
					stock_quantity: productData.data.stock_quantity,
					is_featured: productData.data.is_featured,
					is_active: productData.data.is_active,
				});

				setIsLoading(false);
			} catch (error) {
				toast.error('Không thể tải thông tin sản phẩm');
				setIsLoading(false);
			}
		};

		fetchInitialData();
	}, [productId]);

	// Xử lý thay đổi danh mục khi chọn môn thể thao
	const handleSportChange = async (sportId) => {
		try {
			const response = await fetch(
				`/api/categories?sport_id=${sportId}&has_parent=true`
			);
			const data = await response.json();
			setCategories(data.data);
			setFormData((prev) => ({
				...prev,
				sport_id: sportId,
				category_id: '', // Reset category
			}));
		} catch (error) {
			toast.error('Không thể tải danh mục');
		}
	};

	// Xử lý thay đổi input
	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	// Xử lý submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate
		if (!formData.name.trim()) {
			toast.error('Vui lòng nhập tên sản phẩm');
			return;
		}
		if (!formData.category_id) {
			toast.error('Vui lòng chọn danh mục');
			return;
		}
		if (parseFloat(formData.price) < 0) {
			toast.error('Giá gốc không được âm');
			return;
		}
		if (parseInt(formData.sale_price) < 0) {
			toast.error('Giá khuyến mãi không được âm');
			return;
		}
		if (
			parseInt(formData.sale_price) > 0 &&
			parseFloat(formData.sale_price) >= parseFloat(formData.price)
		) {
			toast.error('Giá khuyến mãi phải nhỏ hơn giá gốc');
			return;
		}
		if (formData.stock_quantity < 0) {
			toast.error('Số lượng tồn kho không được âm');
			return;
		}

		try {
			const response = await fetch(`/api/products/${productId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify({
					sport_id: formData.sport_id,
					category_id: formData.category_id,
					name: formData.name,
					description: formData.description || '',
					price: parseFloat(formData.price),
					sale_price: parseInt(formData.sale_price) || 0,
					stock_quantity: parseInt(formData.stock_quantity) || 0,
					is_featured: formData.is_featured ? 1 : 0,
					is_active: formData.is_active ? 1 : 0,
				}),
			});

			if (response.ok) {
				toast.success('Cập nhật sản phẩm thành công!');
				navigate('/admin');
			} else {
				const errorData = await response.json();
				toast.error(
					`Có lỗi khi cập nhật sản phẩm: ${
						errorData.message || 'Không xác định'
					}`
				);
				if (errorData.errors) {
					Object.values(errorData.errors).forEach((error) => {
						if (Array.isArray(error)) {
							error.forEach((e) => toast.error(e));
						} else {
							toast.error(error);
						}
					});
				}
			}
		} catch (error) {
			console.error('Error updating product:', error);
			toast.error('Có lỗi khi cập nhật sản phẩm. Vui lòng thử lại.');
		}
	};

	// Hiển thị ảnh hiện tại
	const getPrimaryImage = () => {
		const primaryImage = existingImages.find((img) => img.is_primary);
		return primaryImage
			? primaryImage.image_path
			: existingImages[0]?.image_path ||
					'https://via.placeholder.com/300';
	};

	if (isLoading) {
		return (
			<div className="max-w-6xl mx-auto py-8 text-center">
				<p className="text-gray-500">Đang tải thông tin sản phẩm...</p>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto py-8">
			<form onSubmit={handleSubmit}>
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold text-gray-900">
						Chỉnh Sửa Sản Phẩm: {formData.name}
					</h1>
					<button
						type="button"
						onClick={() => navigate('/admin/products')}
						className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
					>
						<FiArrowLeft className="mr-2" /> Quay lại danh sách
					</button>
				</div>

				<div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
					{/* Hình ảnh hiện tại */}
					<div className="mb-6">
						<h2 className="text-lg font-semibold text-gray-800 mb-4">
							Hình Ảnh Sản Phẩm
						</h2>
						<div className="flex flex-wrap gap-4">
							<img
								src={getPrimaryImage()}
								alt={formData.name}
								className="w-64 h-64 object-cover rounded-lg border border-gray-300"
							/>
							{existingImages.length > 1 && (
								<div className="grid grid-cols-3 gap-2">
									{existingImages
										.filter((img) => !img.is_primary)
										.map((image, index) => (
											<img
												key={index}
												src={image.image_path}
												alt={`Ảnh phụ ${index + 1}`}
												className="w-20 h-20 object-cover rounded-lg border border-gray-200"
											/>
										))}
								</div>
							)}
						</div>
						<p className="text-sm text-gray-500 mt-2">
							Để thay đổi ảnh, vui lòng sử dụng chức năng quản lý
							ảnh riêng.
						</p>
					</div>

					{/* Môn thể thao và Danh mục */}
					<div className="grid md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Môn Thể Thao
							</label>
							<select
								name="sport_id"
								value={formData.sport_id}
								onChange={(e) =>
									handleSportChange(e.target.value)
								}
								className="w-full border border-gray-300 rounded-md px-3 py-2"
								required
							>
								<option value="">Chọn môn thể thao</option>
								{sports.map((sport) => (
									<option key={sport.id} value={sport.id}>
										{sport.name}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Danh Mục
							</label>
							<select
								name="category_id"
								value={formData.category_id}
								onChange={handleInputChange}
								className="w-full border border-gray-300 rounded-md px-3 py-2"
								required
								disabled={!formData.sport_id}
							>
								<option value="">Chọn danh mục</option>
								{categories.map((category) => (
									<option
										key={category.id}
										value={category.id}
									>
										{category.name}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Tên sản phẩm */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Tên Sản Phẩm
						</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							className="w-full border border-gray-300 rounded-md px-3 py-2"
							required
						/>
					</div>

					{/* Mô tả */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Mô Tả Sản Phẩm
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleInputChange}
							rows={4}
							className="w-full border border-gray-300 rounded-md px-3 py-2"
						/>
					</div>

					{/* Giá và Tồn kho */}
					<div className="grid md:grid-cols-3 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Giá Gốc
							</label>
							<input
								type="number"
								name="price"
								value={formData.price}
								onChange={handleInputChange}
								min="0"
								className="w-full border border-gray-300 rounded-md px-3 py-2"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Giá Khuyến Mãi
							</label>
							<input
								type="number"
								name="sale_price"
								value={formData.sale_price}
								onChange={handleInputChange}
								min="0"
								className="w-full border border-gray-300 rounded-md px-3 py-2"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Số Lượng Tồn Kho
							</label>
							<input
								type="number"
								name="stock_quantity"
								value={formData.stock_quantity}
								onChange={handleInputChange}
								min="0"
								className="w-full border border-gray-300 rounded-md px-3 py-2"
								required
							/>
						</div>
					</div>

					{/* Trạng thái sản phẩm */}
					<div className="space-y-4">
						<div className="flex items-center">
							<input
								type="checkbox"
								id="is_active"
								name="is_active"
								checked={formData.is_active}
								onChange={handleInputChange}
								className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
							/>
							<label
								htmlFor="is_active"
								className="ml-2 block text-sm text-gray-900"
							>
								Kích hoạt
							</label>
						</div>

						<div className="flex items-center">
							<input
								type="checkbox"
								id="is_featured"
								name="is_featured"
								checked={formData.is_featured}
								onChange={handleInputChange}
								className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
							/>
							<label
								htmlFor="is_featured"
								className="ml-2 block text-sm text-gray-900"
							>
								Sản phẩm nổi bật
							</label>
						</div>
					</div>

					{/* Nút submit */}
					<div className="flex justify-end space-x-4 mt-6">
						<button
							type="button"
							onClick={() => navigate('/admin/products')}
							className="px-4 py-2 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition"
						>
							Hủy
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
						>
							Lưu Thay Đổi
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default EditProductPage;
