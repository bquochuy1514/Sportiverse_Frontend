import {
	FaEdit,
	FaTrash,
	FaToggleOn,
	FaToggleOff,
	FaCalendarAlt,
	FaTicketAlt,
} from 'react-icons/fa';

const CouponList = ({ coupons, loading, onEdit, onDelete }) => {
	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('vi-VN', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(amount);
	};

	const getStatusBadge = (isActive) => {
		if (isActive === true) {
			return (
				<span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
					Hoạt động
				</span>
			);
		} else {
			return (
				<span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
					Không hoạt động
				</span>
			);
		}
	};

	const getTypeBadge = (type) => {
		const typeConfig = {
			percentage: { color: 'bg-blue-100 text-blue-800', text: 'Giảm %' },
			fixed: {
				color: 'bg-purple-100 text-purple-800',
				text: 'Giảm cố định',
			},
		};

		const config = typeConfig[type] || typeConfig.fixed;

		return (
			<span
				className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
			>
				{config.text}
			</span>
		);
	};

	if (loading) {
		return (
			<div className="bg-white rounded-xl shadow-sm p-8 text-center">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
				<p className="mt-4 text-gray-600">Đang tải...</p>
			</div>
		);
	}

	if (coupons.length === 0) {
		return (
			<div className="bg-white rounded-xl shadow-sm p-8 text-center">
				<FaTicketAlt className="mx-auto text-4xl text-gray-400 mb-4" />
				<p className="text-gray-600">Không có mã giảm giá nào</p>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-xl shadow-sm overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Mã giảm giá
							</th>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Loại & Giá trị
							</th>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Đơn hàng tối thiểu
							</th>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Ngày tạo
							</th>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Trạng thái
							</th>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Thao tác
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{coupons.map((coupon) => (
							<tr key={coupon.id} className="hover:bg-gray-50">
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm font-medium text-gray-900">
										{coupon.code}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="flex items-center gap-2">
										{getTypeBadge(coupon.type)}
										<span className="text-sm font-medium text-gray-900">
											{coupon.type === 'percentage'
												? `${coupon.value}%`
												: formatCurrency(coupon.value)}
										</span>
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-gray-900">
										{coupon.min_order_amount
											? formatCurrency(
													coupon.min_order_amount
											  )
											: 'Không yêu cầu'}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="flex items-center text-sm text-gray-900">
										<FaCalendarAlt className="mr-2 text-gray-400" />
										{formatDate(coupon.created_at)}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									{getStatusBadge(coupon.is_active)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<div className="flex items-center gap-2">
										<button
											onClick={() => onEdit(coupon)}
											className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
											title="Chỉnh sửa"
										>
											<FaEdit />
										</button>

										<button
											onClick={() => onDelete(coupon.id)}
											className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
											title="Xóa"
										>
											<FaTrash />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default CouponList;
