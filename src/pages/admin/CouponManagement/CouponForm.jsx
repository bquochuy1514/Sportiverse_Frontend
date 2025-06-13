import { useState, useEffect } from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';

const CouponForm = ({ coupon, onSave, onClose, loading }) => {
	const [formData, setFormData] = useState({
		code: '',
		type: 'percentage',
		value: '',
		min_order_amount: '',
		is_active: true,
	});

	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (coupon) {
			setFormData({
				code: coupon.code || '',
				type: coupon.type || 'percentage',
				value: coupon.value || '',
				min_order_amount: coupon.min_order_amount || '',
				is_active: coupon.is_active || true,
			});
		}
	}, [coupon]);

	const validateForm = () => {
		const newErrors = {};

		if (!formData.code.trim()) {
			newErrors.code = 'Mã giảm giá không được để trống';
		}

		if (!formData.value || formData.value <= 0) {
			newErrors.value = 'Giá trị giảm giá phải lớn hơn 0';
		}

		if (formData.type === 'percentage' && formData.value > 100) {
			newErrors.value = 'Phần trăm giảm giá không được vượt quá 100%';
		}

		if (formData.min_order_amount && formData.min_order_amount < 0) {
			newErrors.min_order_amount =
				'Giá trị đơn hàng tối thiểu không được âm';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (validateForm()) {
			// Chuyển đổi dữ liệu trước khi gửi
			const submitData = {
				...formData,
				value: parseFloat(formData.value),
				min_order_amount: formData.min_order_amount
					? parseFloat(formData.min_order_amount)
					: null,
				is_active: formData.is_active === true,
			};
			console.log(submitData);
			onSave(submitData);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: '',
			}));
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="flex items-center justify-between p-6 border-b">
					<h2 className="text-xl font-bold text-gray-900">
						{coupon
							? 'Chỉnh sửa mã giảm giá'
							: 'Tạo mã giảm giá mới'}
					</h2>
					<button
						onClick={onClose}
						className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
					>
						<FaTimes className="text-gray-400" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Mã giảm giá *
							</label>
							<input
								type="text"
								name="code"
								value={formData.code.toUpperCase()}
								onChange={handleChange}
								className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
									errors.code
										? 'border-red-500'
										: 'border-gray-300'
								}`}
								placeholder="Nhập mã giảm giá"
							/>
							{errors.code && (
								<p className="mt-1 text-sm text-red-600">
									{errors.code}
								</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Loại giảm giá *
							</label>
							<select
								name="type"
								value={formData.type}
								onChange={handleChange}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								<option value="percentage">
									Giảm theo phần trăm (%)
								</option>
								<option value="fixed">
									Giảm cố định (VND)
								</option>
							</select>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Giá trị giảm *
							</label>
							<input
								type="number"
								name="value"
								value={formData.value}
								onChange={handleChange}
								min="0"
								step={
									formData.type === 'percentage'
										? '1'
										: '1000'
								}
								className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
									errors.value
										? 'border-red-500'
										: 'border-gray-300'
								}`}
								placeholder={
									formData.type === 'percentage'
										? 'Nhập % (1-100)'
										: 'Nhập số tiền'
								}
							/>
							{errors.value && (
								<p className="mt-1 text-sm text-red-600">
									{errors.value}
								</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Đơn hàng tối thiểu
							</label>
							<input
								type="number"
								name="min_order_amount"
								value={formData.min_order_amount}
								onChange={handleChange}
								min="0"
								step="1000"
								className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
									errors.min_order_amount
										? 'border-red-500'
										: 'border-gray-300'
								}`}
								placeholder="Nhập số tiền tối thiểu"
							/>
							{errors.min_order_amount && (
								<p className="mt-1 text-sm text-red-600">
									{errors.min_order_amount}
								</p>
							)}
							<p className="mt-1 text-xs text-gray-500">
								Để trống nếu không yêu cầu giá trị tối thiểu
							</p>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Trạng thái
						</label>
						<select
							name="is_active"
							value={formData.is_active}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						>
							<option value={true}>Hoạt động</option>
							<option value={false}>Không hoạt động</option>
						</select>
					</div>

					<div className="flex items-center justify-end gap-4 pt-6 border-t">
						<button
							type="button"
							onClick={onClose}
							className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
						>
							Hủy
						</button>
						<button
							type="submit"
							disabled={loading}
							className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? (
								<>
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
									Đang xử lý...
								</>
							) : (
								<>
									<FaSave />
									{coupon ? 'Cập nhật' : 'Tạo mới'}
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CouponForm;
