// src/contexts/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
	const [cartItemsCount, setCartItemsCount] = useState(0);
	const [cartItems, setCartItems] = useState([]);
	const [loading, setLoading] = useState(false);
	const { token } = useAuth();

	// Fetch cart count từ API
	const fetchCartCount = async () => {
		if (!token) {
			setCartItemsCount(0);
			setCartItems([]);
			return;
		}

		try {
			const response = await fetch('/api/cart/count', {
				headers: {
					Authorization: `Bearer ${token}`,
					'ngrok-skip-browser-warning': 'true',
				},
			});
			const result = await response.json();
			if (result.success) {
				setCartItemsCount(result.data.item_count);
			}
		} catch (err) {
			console.error('Error fetching cart count:', err);
		}
	};

	// Fetch full cart data
	const fetchCartItems = async () => {
		if (!token) {
			setCartItems([]);
			return;
		}

		setLoading(true);
		try {
			const response = await fetch('/api/my-cart', {
				headers: {
					Authorization: `Bearer ${token}`,
					'ngrok-skip-browser-warning': 'true',
				},
			});
			const result = await response.json();
			if (result.success) {
				setCartItems(result.data.items || []);
				// Cập nhật count từ dữ liệu cart items
				const totalCount =
					result.data.items?.reduce(
						(total, item) => total + item.quantity,
						0
					) || 0;
				setCartItemsCount(totalCount);
			}
		} catch (err) {
			console.error('Error fetching cart items:', err);
		} finally {
			setLoading(false);
		}
	};

	// Add item to cart
	const addToCart = async (productId, quantity = 1) => {
		if (!token) {
			throw new Error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
		}

		try {
			const response = await fetch('/api/cart/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'ngrok-skip-browser-warning': 'true',
				},
				body: JSON.stringify({
					product_id: productId,
					quantity: quantity,
				}),
			});

			const result = await response.json();
			console.log('result', result);
			// Cập nhật count ngay lập tức
			setCartItemsCount((prev) => prev + quantity);
			// Refresh full cart data để đảm bảo đồng bộ
			await fetchCartItems();
			return result;
		} catch (error) {
			console.error('Error adding to cart:', error);
			throw error;
		}
	};

	const updateCartItem = async (itemId, quantity) => {
		if (!token) return;

		try {
			const response = await fetch(`/api/cart/update/${itemId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'ngrok-skip-browser-warning': 'true',
				},
				body: JSON.stringify({ quantity }),
			});

			const result = await response.json();
			if (result.success) {
				// Cập nhật cartItems và cartItemsCount
				setCartItems((prevItems) =>
					prevItems.map((item) =>
						item.id === itemId
							? { ...item, quantity: quantity }
							: item
					)
				);

				// Tính lại tổng số lượng
				const newTotalCount = cartItems.reduce((total, item) => {
					if (item.id === itemId) {
						return total + quantity;
					}
					return total + item.quantity;
				}, 0);

				setCartItemsCount(newTotalCount);

				return result;
			} else {
				throw new Error(
					result.message || 'Không thể cập nhật giỏ hàng'
				);
			}
		} catch (error) {
			console.error('Error updating cart item:', error);
			throw error;
		}
	};

	const removeFromCart = async (itemId) => {
		if (!token) return { success: false, message: 'Chưa đăng nhập' };

		try {
			const response = await fetch(`/api/cart/remove/${itemId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
				},
			});

			const result = await response.json();
			console.log(result);

			if (result.success) {
				// Tìm item bị xóa để trừ số lượng
				const removedItem = cartItems.find(
					(item) => item.id === itemId
				);

				// Cập nhật cartItems trong context
				setCartItems((prevItems) =>
					prevItems.filter((item) => item.id !== itemId)
				);

				// Cập nhật cartItemsCount
				if (removedItem) {
					setCartItemsCount((prev) => prev - removedItem.quantity);
				}
			}

			return result;
		} catch (error) {
			console.error('Error removing from cart:', error);
			return {
				success: false,
				message: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng',
			};
		}
	};

	// Clear entire cart
	const clearCart = () => {
		setCartItems([]);
		setCartItemsCount(0);
	};

	// Load cart data when token changes
	useEffect(() => {
		if (token) {
			fetchCartItems();
		} else {
			setCartItems([]);
			setCartItemsCount(0);
		}
	}, [token]);

	const value = {
		cartItemsCount,
		cartItems,
		loading,
		addToCart,
		updateCartItem,
		removeFromCart,
		clearCart,
		refreshCart: fetchCartItems,
		refreshCartCount: fetchCartCount,
	};

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
}
