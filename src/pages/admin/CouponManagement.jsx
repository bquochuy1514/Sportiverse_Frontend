import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { FaTicketAlt, FaPlus, FaSearch } from 'react-icons/fa';
import CouponList from './CouponManagement/CouponList';
import CouponForm from './CouponManagement/CouponForm';
import CouponFilters from './CouponManagement/CouponFilters';

const CouponManagement = () => {
	const { token } = useAuth();
	const [coupons, setCoupons] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [editingCoupon, setEditingCoupon] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [filterStatus, setFilterStatus] = useState('all');
	const [filterType, setFilterType] = useState('all');

	// Lấy danh sách mã giảm giá
	useEffect(() => {
		fetchCoupons();
	}, [token]);

	const fetchCoupons = async () => {
		if (!token) return;

		setLoading(true);
		try {
			const response = await fetch('/api/coupons', {
				headers: {
					Authorization: `Bearer ${token}`,
					'ngrok-skip-browser-warning': 'true',
				},
			});
			const result = await response.json();

			if (result.success) {
				setCoupons(result.data || []);
			} else {
				toast.error(
					result.message || 'Không thể tải danh sách mã giảm giá'
				);
			}
		} catch (err) {
			console.error('Error fetching coupons:', err);
			toast.error('Có lỗi khi tải danh sách mã giảm giá');
		} finally {
			setLoading(false);
		}
	};
	// Xử lý tạo/cập nhật mã giảm giá
	const handleSaveCoupon = async (couponData) => {
		setLoading(true);

		try {
			const url = editingCoupon
				? `/api/coupons/${editingCoupon.id}`
				: '/api/coupons';

			const method = editingCoupon ? 'PUT' : 'POST';

			console.log('Saving coupon data:', couponData);

			const response = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'ngrok-skip-browser-warning': 'true',
				},
				body: JSON.stringify(couponData),
			});

			const result = await response.json();

			if (result.success) {
				toast.success(
					editingCoupon
						? 'Cập nhật mã giảm giá thành công!'
						: 'Tạo mã giảm giá thành công!'
				);
				setShowForm(false);
				setEditingCoupon(null);
				fetchCoupons();
			} else {
				toast.error(result.message || 'Có lỗi xảy ra');
			}
		} catch (err) {
			console.error('Error saving coupon:', err);
			toast.error('Có lỗi khi lưu mã giảm giá');
		} finally {
			setLoading(false);
		}
	};

	// Xử lý xóa mã giảm giá
	const handleDeleteCoupon = async (couponId) => {
		if (!window.confirm('Bạn có chắc chắn muốn xóa mã giảm giá này?')) {
			return;
		}

		setLoading(true);

		try {
			const response = await fetch(`/api/coupons/${couponId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
					'ngrok-skip-browser-warning': 'true',
				},
			});

			const result = await response.json();

			if (result.success) {
				toast.success('Xóa mã giảm giá thành công!');
				fetchCoupons();
			} else {
				toast.error(result.message || 'Không thể xóa mã giảm giá');
			}
		} catch (err) {
			console.error('Error deleting coupon:', err);
			toast.error('Có lỗi khi xóa mã giảm giá');
		} finally {
			setLoading(false);
		}
	};

	// Xử lý chỉnh sửa mã giảm giá
	const handleEditCoupon = (coupon) => {
		setEditingCoupon(coupon);
		setShowForm(true);
	};

	// Lọc mã giảm giá theo tìm kiếm và bộ lọc
	const filteredCoupons = coupons.filter((coupon) => {
		const matchesSearch = coupon.code
			.toLowerCase()
			.includes(searchTerm.toLowerCase());

		const matchesStatus =
			filterStatus === 'all' ||
			(filterStatus === 'active' && coupon.is_active === true) ||
			(filterStatus === 'inactive' && coupon.is_active === false);

		const matchesType = filterType === 'all' || coupon.type === filterType;

		return matchesSearch && matchesStatus && matchesType;
	});

	return (
		<section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-8">
					<div className="flex items-center justify-between">
						<h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
							<div className="p-3 bg-blue-600 rounded-full text-white">
								<FaTicketAlt className="text-xl" />
							</div>
							Quản lý mã giảm giá
						</h1>

						<button
							onClick={() => {
								setEditingCoupon(null);
								setShowForm(true);
							}}
							className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
						>
							<FaPlus />
							Tạo mã giảm giá
						</button>
					</div>
				</div>

				{/* Search and Filters */}
				<div className="bg-white rounded-xl shadow-sm p-6 mb-6">
					<div className="flex flex-col lg:flex-row gap-4">
						<div className="flex-1 relative">
							<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<input
								type="text"
								placeholder="Tìm kiếm mã giảm giá..."
								value={searchTerm}
								onChange={(e) =>
									setSearchTerm(e.target.value.toUpperCase())
								}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>

						<CouponFilters
							filterStatus={filterStatus}
							setFilterStatus={setFilterStatus}
							filterType={filterType}
							setFilterType={setFilterType}
						/>
					</div>
				</div>

				{/* Coupon Form Modal */}
				{showForm && (
					<CouponForm
						coupon={editingCoupon}
						onSave={handleSaveCoupon}
						onClose={() => {
							setShowForm(false);
							setEditingCoupon(null);
						}}
						loading={loading}
					/>
				)}

				{/* Coupon List */}
				<CouponList
					coupons={filteredCoupons}
					loading={loading}
					onEdit={handleEditCoupon}
					onDelete={handleDeleteCoupon}
				/>
			</div>
		</section>
	);
};

export default CouponManagement;
