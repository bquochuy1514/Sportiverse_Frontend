// src/pages/admin/orders/OrderManagement.jsx
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import OrderFilters from './OrderManagement/OrderFilter';
import OrderTable from './OrderManagement/OrderTable';
import OrderDetailModal from './OrderManagement/OrderDetailModal';

const OrderManagement = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedStatus, setSelectedStatus] = useState('');
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);

	const statusOptions = [
		{ value: '', label: 'Tất cả trạng thái', color: 'gray' },
		{ value: 'pending', label: 'Chờ xử lý', color: 'yellow' },
		{ value: 'processing', label: 'Đang xử lý', color: 'blue' },
		{ value: 'shipped', label: 'Đã gửi hàng', color: 'purple' },
		{ value: 'delivered', label: 'Đã giao hàng', color: 'green' },
		{ value: 'cancelled', label: 'Đã hủy', color: 'red' },
	];

	// Fetch orders từ API
	const fetchOrders = async () => {
		try {
			setLoading(true);
			const params = new URLSearchParams();
			if (selectedStatus) params.append('status', selectedStatus);
			if (searchTerm.trim()) params.append('search', searchTerm.trim());

			const response = await fetch(
				`/api/orders/all?${params.toString()}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.ok) {
				const result = await response.json();
				if (result.success) {
					setOrders(result.data);
				} else {
					toast.error('Không thể tải danh sách đơn hàng');
				}
			} else {
				toast.error('Lỗi khi tải danh sách đơn hàng');
			}
		} catch (error) {
			console.error('Error fetching orders:', error);
			toast.error('Có lỗi xảy ra khi tải danh sách đơn hàng');
		} finally {
			setLoading(false);
		}
	};

	// Load orders khi component mount và khi filter thay đổi
	useEffect(() => {
		fetchOrders();
	}, [selectedStatus, searchTerm]);

	// Debounce search để tránh gọi API liên tục
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			fetchOrders();
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [searchTerm]);

	// Cập nhật trạng thái đơn hàng
	const updateOrderStatus = async (orderId, newStatus) => {
		try {
			setIsUpdating(true);
			const response = await fetch(`/api/orders/${orderId}/status`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ status: newStatus }),
			});

			if (response.ok) {
				const result = await response.json();
				if (result.success) {
					toast.success('Cập nhật trạng thái đơn hàng thành công');
					fetchOrders();
					if (selectedOrder && selectedOrder.order_id === orderId) {
						setSelectedOrder({
							...selectedOrder,
							status: newStatus,
						});
					}
				} else {
					toast.error('Không thể cập nhật trạng thái đơn hàng');
				}
			} else {
				toast.error('Lỗi khi cập nhật trạng thái đơn hàng');
			}
		} catch (error) {
			console.error('Error updating order status:', error);
			toast.error('Có lỗi xảy ra khi cập nhật trạng thái');
		} finally {
			setIsUpdating(false);
		}
	};

	// Mở modal chi tiết đơn hàng
	const openOrderDetail = (order) => {
		setSelectedOrder(order);
		setIsModalOpen(true);
	};

	// Đóng modal
	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedOrder(null);
	};

	return (
		<div className="max-w-7xl mx-auto px-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-900">
					Quản Lý Đơn Hàng
				</h1>
				<div className="text-sm text-gray-500">
					Tổng cộng: {orders.length} đơn hàng
				</div>
			</div>

			<OrderFilters
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				selectedStatus={selectedStatus}
				setSelectedStatus={setSelectedStatus}
				statusOptions={statusOptions}
			/>

			<OrderTable
				orders={orders}
				loading={loading}
				statusOptions={statusOptions}
				onOrderDetail={openOrderDetail}
				onUpdateStatus={updateOrderStatus}
				isUpdating={isUpdating}
			/>

			{isModalOpen && selectedOrder && (
				<OrderDetailModal
					order={selectedOrder}
					statusOptions={statusOptions}
					onClose={closeModal}
					onUpdateStatus={updateOrderStatus}
					isUpdating={isUpdating}
				/>
			)}
		</div>
	);
};

export default OrderManagement;
