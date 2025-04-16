// ProductManagement.jsx
import React, { useEffect, useState } from 'react';
import { FiCheck, FiLayers, FiSave, FiStar } from 'react-icons/fi';
import {
	fetchSports,
	fetchParentCategories,
	fetchChildCategories,
} from '../../../services/productService';
import BasicInfoSection from './BasicInfoSection';
import PriceStockSection from './PriceStockSection';
import ImageUploadSection from './ImageUploadSection';
import { toast } from 'react-toastify';
import ProductList from './ProductList';

const ProductManagement = () => {
	const [selectedImages, setSelectedImages] = useState([]);
	const [primaryImage, setPrimaryImage] = useState(null);
	const [sports, setSports] = useState([]);
	const [allCategories, setAllCategories] = useState([]);
	const [filteredParentCategories, setFilteredParentCategories] = useState(
		[]
	);
	const [childCategories, setChildCategories] = useState([]);
	const [selectedSportId, setSelectedSportId] = useState('');
	const [selectedParentId, setSelectedParentId] = useState('');
	const [products, setProducts] = useState([]);
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
		primary_image: null,
		additional_images: [],
	});

	// Hàm fetchProducts được định nghĩa một lần
	const fetchProducts = async () => {
		try {
			const response = await fetch('/api/products', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response.ok) {
				const result = await response.json();
				if (result.status && Array.isArray(result.data)) {
					setProducts(result.data);
				}
			} else {
				throw new Error('Failed to fetch products');
			}
		} catch (error) {
			console.error('Failed to load products:', error);
			toast.error('Không thể tải danh sách sản phẩm. Vui lòng thử lại.');
		}
	};

	// Fetch sports, parent categories, and products from API
	useEffect(() => {
		const getSports = async () => {
			try {
				const result = await fetchSports();
				if (result.success) {
					setSports(result.data);
				}
			} catch (error) {
				console.error('Failed to load sports:', error);
			}
		};

		const getParentCategories = async () => {
			try {
				const result = await fetchParentCategories();
				if (result.success) {
					setAllCategories(result.data);
				}
			} catch (error) {
				console.error('Failed to load parent categories:', error);
			}
		};

		getSports();
		getParentCategories();
		fetchProducts(); // Gọi fetchProducts đã định nghĩa
	}, []); // Xóa formData khỏi dependencies để tránh fetch liên tục

	// Filter parent categories by selected sport
	useEffect(() => {
		if (selectedSportId) {
			const filtered = allCategories.filter(
				(category) =>
					category.sport_id === parseInt(selectedSportId) &&
					category.parent_id === null
			);
			setFilteredParentCategories(filtered);
			setSelectedParentId('');
			setChildCategories([]);
		} else {
			setFilteredParentCategories([]);
			setSelectedParentId('');
			setChildCategories([]);
		}
	}, [selectedSportId, allCategories]);

	// Fetch child categories based on selected parent
	useEffect(() => {
		if (selectedParentId) {
			const getChildCategories = async () => {
				try {
					const result = await fetchChildCategories(selectedParentId);
					if (result.success) {
						setChildCategories(result.data);
					}
				} catch (error) {
					console.error('Failed to load child categories:', error);
				}
			};
			getChildCategories();
		} else {
			setChildCategories([]);
		}
	}, [selectedParentId]);

	const handlePrimaryImageChange = (e) => {
		if (e.target.files[0]) {
			setPrimaryImage(URL.createObjectURL(e.target.files[0]));
			setFormData({ ...formData, primary_image: e.target.files[0] });
		}
	};

	const handleAdditionalImagesChange = (e) => {
		if (e.target.files) {
			const imageArray = Array.from(e.target.files).map((file) =>
				URL.createObjectURL(file)
			);
			setSelectedImages(imageArray);
			setFormData({
				...formData,
				additional_images: Array.from(e.target.files),
			});
		}
	};

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(formData);

		// Validate required fields
		if (!formData.name.trim()) {
			toast.error('Vui lòng nhập tên sản phẩm');
			return;
		}
		if (!formData.category_id) {
			toast.error('Vui lòng chọn danh mục');
			return;
		}
		if (
			!formData.primary_image &&
			formData.additional_images.length === 0
		) {
			toast.error('Vui lòng chọn ít nhất một ảnh sản phẩm');
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

		const submitData = new FormData();
		submitData.append('sport_id', formData.sport_id);
		submitData.append('category_id', formData.category_id);
		submitData.append('name', formData.name);
		submitData.append('description', formData.description || '');
		submitData.append('price', parseFloat(formData.price));
		submitData.append('sale_price', parseInt(formData.sale_price) || 0);
		submitData.append(
			'stock_quantity',
			parseInt(formData.stock_quantity) || 0
		);
		submitData.append('is_featured', formData.is_featured ? 1 : 0);
		submitData.append('is_active', formData.is_active ? 1 : 0);

		const allImages = [];
		if (formData.primary_image) {
			allImages.push(formData.primary_image);
		}
		if (
			formData.additional_images &&
			formData.additional_images.length > 0
		) {
			formData.additional_images.forEach((image) => {
				allImages.push(image);
			});
		}
		allImages.forEach((image) => {
			submitData.append('images[]', image);
		});
		submitData.append('primary_image_index', '0');

		try {
			const response = await fetch('/api/products', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: submitData,
			});

			if (response.ok) {
				toast.success('Thêm sản phẩm thành công!');
				fetchProducts(); // Gọi lại fetchProducts để lấy danh sách mới nhất
				// Reset form
				setFormData({
					sport_id: selectedSportId || '',
					category_id: '',
					name: '',
					description: '',
					price: 0,
					sale_price: 0,
					stock_quantity: 0,
					is_featured: false,
					is_active: true,
					primary_image: null,
					additional_images: [],
				});
				setPrimaryImage(null);
				setSelectedImages([]);
				setSelectedSportId('');
				setSelectedParentId('');
			} else {
				const errorData = await response.json();
				toast.error(
					`Có lỗi khi thêm sản phẩm: ${
						errorData.message || 'Không xác định'
					}`
				);
				if (errorData.errors) {
					console.log('Validation errors:', errorData.errors);
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
			console.error('Error submitting product:', error);
			toast.error('Có lỗi khi thêm sản phẩm. Vui lòng thử lại.');
		}
	};

	return (
		<div className="max-w-6xl mx-auto">
			<form onSubmit={handleSubmit}>
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold text-gray-900">
						Thêm Sản Phẩm Mới
					</h1>
					<button
						type="submit"
						className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors flex items-center"
					>
						<FiSave className="mr-2" /> Lưu Bản Nháp
					</button>
				</div>

				<div className="bg-white rounded-xl shadow-lg overflow-hidden">
					<div className="md:flex">
						<div className="md:w-2/3 p-6">
							<div className="mb-8">
								<BasicInfoSection
									sports={sports}
									filteredParentCategories={
										filteredParentCategories
									}
									childCategories={childCategories}
									selectedSportId={selectedSportId}
									setSelectedSportId={setSelectedSportId}
									selectedParentId={selectedParentId}
									setSelectedParentId={setSelectedParentId}
									handleInputChange={handleInputChange}
									formData={formData}
								/>
							</div>

							<div className="mb-8">
								<PriceStockSection
									handleInputChange={handleInputChange}
									formData={formData}
								/>
							</div>

							<div className="mb-8">
								<h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
									<FiLayers className="mr-2 text-indigo-600" />
									Mô Tả Sản Phẩm
								</h2>
								<div>
									<label
										htmlFor="description"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Mô Tả Chi Tiết
									</label>
									<textarea
										id="description"
										name="description"
										rows="6"
										className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
										placeholder="Nhập mô tả đầy đủ về sản phẩm..."
										value={formData.description}
										onChange={handleInputChange}
									></textarea>
								</div>
							</div>

							<div>
								<h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
									<FiStar className="mr-2 text-indigo-600" />
									Tùy Chọn Khác
								</h2>
								<div className="space-y-4">
									<div className="flex items-center">
										<div className="bg-indigo-100 p-2 rounded-lg mr-3">
											<FiStar className="text-indigo-600" />
										</div>
										<label className="flex items-center flex-1">
											<input
												type="checkbox"
												name="is_featured"
												className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
												checked={formData.is_featured}
												onChange={handleInputChange}
											/>
											<span className="ml-2 text-gray-700">
												Đánh dấu là sản phẩm nổi bật
											</span>
										</label>
									</div>
									<div className="flex items-center">
										<div className="bg-green-100 p-2 rounded-lg mr-3">
											<FiCheck className="text-green-600" />
										</div>
										<label className="flex items-center flex-1">
											<input
												type="checkbox"
												name="is_active"
												checked={formData.is_active}
												className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
												onChange={handleInputChange}
											/>
											<span className="ml-2 text-gray-700">
												Kích hoạt sản phẩm (hiển thị
												ngay sau khi thêm)
											</span>
										</label>
									</div>
								</div>
							</div>
						</div>

						<ImageUploadSection
							primaryImage={primaryImage}
							setPrimaryImage={setPrimaryImage}
							formData={formData}
							setFormData={setFormData}
							selectedImages={selectedImages}
							setSelectedImages={setSelectedImages}
							handlePrimaryImageChange={handlePrimaryImageChange}
							handleAdditionalImagesChange={
								handleAdditionalImagesChange
							}
						/>
					</div>
				</div>
				<div className="mt-8">
					<button
						type="submit"
						className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors flex items-center justify-center"
					>
						<FiSave className="mr-2" /> Thêm Sản Phẩm
					</button>
					<p className="mt-4 text-xs text-gray-500 text-center">
						Sản phẩm sẽ được hiển thị trên trang web sau khi được
						thêm và kích hoạt
					</p>
				</div>
			</form>

			<ProductList products={products} onProductDeleted={fetchProducts} />
		</div>
	);
};

export default ProductManagement;
