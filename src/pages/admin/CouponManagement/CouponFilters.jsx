const CouponFilters = ({
	filterStatus,
	setFilterStatus,
	filterType,
	setFilterType,
}) => {
	return (
		<div className="flex gap-4">
			<select
				value={filterStatus}
				onChange={(e) => setFilterStatus(e.target.value)}
				className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			>
				<option value="all">Tất cả trạng thái</option>
				<option value="active">Đang hoạt động</option>
				<option value="inactive">Không hoạt động</option>
			</select>

			<select
				value={filterType}
				onChange={(e) => setFilterType(e.target.value)}
				className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			>
				<option value="all">Tất cả loại</option>
				<option value="percentage">Giảm theo %</option>
				<option value="fixed">Giảm cố định</option>
			</select>
		</div>
	);
};

export default CouponFilters;
