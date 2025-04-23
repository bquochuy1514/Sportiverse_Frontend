/**
 * CartService.js
 * Service để quản lý các tác vụ liên quan đến giỏ hàng
 */

class CartService {
	/**
	 * Thêm sản phẩm vào giỏ hàng
	 * @param {number} productId - ID của sản phẩm cần thêm
	 * @param {number} quantity - Số lượng sản phẩm (mặc định là 1)
	 * @returns {Promise} - Promise chứa thông tin giỏ hàng sau khi cập nhật
	 */
	async addToCart(productId, quantity = 1) {
		try {
			// Lấy token từ localStorage hoặc nơi lưu trữ khác
			const token = localStorage.getItem('token');

			if (!token) {
				throw new Error(
					'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng'
				);
			}

			const response = await fetch(`/api/cart/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
				},
				body: JSON.stringify({
					product_id: productId,
					quantity: quantity,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				// Xử lý các lỗi cụ thể từ API
				if (data.errors && Object.keys(data.errors).length > 0) {
					const errorMessages = Object.values(data.errors)
						.flat()
						.join(', ');
					throw new Error(errorMessages);
				}

				throw new Error(
					data.message ||
						'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng'
				);
			}

			return data;
		} catch (error) {
			console.error('Error adding product to cart:', error);
			throw error;
		}
	}

	/**
	 * Cập nhật số lượng sản phẩm trong giỏ hàng
	 * @param {number} cartItemId - ID của mục trong giỏ hàng
	 * @param {number} quantity - Số lượng mới
	 * @returns {Promise} - Promise chứa thông tin giỏ hàng sau khi cập nhật
	 */
	async updateCartItemQuantity(cartItemId, quantity) {
		try {
			const token = localStorage.getItem('token');

			if (!token) {
				throw new Error('Bạn cần đăng nhập để cập nhật giỏ hàng');
			}

			const response = await fetch(`/api/cart/update/${cartItemId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
				},
				body: JSON.stringify({
					quantity: quantity,
				}),
			});

			const data = await response.json();

			return data;
		} catch (error) {
			console.error('Error updating cart item:', error);
			throw error;
		}
	}

	/**
	 * Xóa sản phẩm khỏi giỏ hàng
	 * @param {number} cartItemId - ID của mục trong giỏ hàng
	 * @returns {Promise} - Promise chứa thông tin giỏ hàng sau khi cập nhật
	 */
	async removeFromCart(cartItemId) {
		try {
			const token = localStorage.getItem('token');

			if (!token) {
				throw new Error(
					'Bạn cần đăng nhập để xóa sản phẩm khỏi giỏ hàng'
				);
			}

			const response = await fetch(`/api/cart/remove/${cartItemId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
				},
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message ||
						'Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng'
				);
			}

			return data;
		} catch (error) {
			console.error('Error removing item from cart:', error);
			throw error;
		}
	}

	/**
	 * Lấy thông tin giỏ hàng hiện tại
	 * @returns {Promise} - Promise chứa thông tin giỏ hàng
	 */
	async getCart() {
		try {
			const token = localStorage.getItem('token');

			if (!token) {
				throw new Error('Bạn cần đăng nhập để xem giỏ hàng');
			}

			const response = await fetch(`/api/cart`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
				},
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || 'Có lỗi xảy ra khi lấy thông tin giỏ hàng'
				);
			}

			return data;
		} catch (error) {
			console.error('Error fetching cart:', error);
			throw error;
		}
	}

	/**
	 * Xóa toàn bộ giỏ hàng
	 * @returns {Promise} - Promise xác nhận xóa thành công
	 */
	async clearCart() {
		try {
			const token = localStorage.getItem('token');

			if (!token) {
				throw new Error('Bạn cần đăng nhập để xóa giỏ hàng');
			}

			const response = await fetch(`/api/cart/clear`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
				},
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || 'Có lỗi xảy ra khi xóa giỏ hàng'
				);
			}

			return data;
		} catch (error) {
			console.error('Error clearing cart:', error);
			throw error;
		}
	}
}

// Tạo và export một instance của CartService để sử dụng trong toàn bộ ứng dụng
const cartService = new CartService();
export default cartService;
