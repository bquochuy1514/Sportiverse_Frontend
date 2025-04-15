// Service lấy danh sách sports
export const fetchSports = async () => {
	try {
		const response = await fetch('/api/sports', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data; // Giả sử: { success: true, data: [{ id, name }, ...] }
	} catch (error) {
		console.error('Error fetching sports:', error);
		throw error;
	}
};

export const fetchSpecificSports = async (id) => {
	try {
		const response = await fetch(`/api/sports/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data; // Giả sử: { success: true, data: [{ id, name }, ...] }
	} catch (error) {
		console.error('Error fetching sports:', error);
		throw error;
	}
};

// Service lấy danh sách parent categories
export const fetchParentCategories = async () => {
	try {
		const response = await fetch('/api/categories', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data; // { success: true, data: [{ id, sport_id, parent_id, name, ... }, ...] }
	} catch (error) {
		console.error('Error fetching parent categories:', error);
		throw error;
	}
};

// Service lấy danh sách child categories theo parent_id
export const fetchChildCategories = async (parentId) => {
	try {
		const response = await fetch(`/api/categories?parent_id=${parentId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data; // { success: true, data: [{ id, sport_id, parent_id, name, ... }, ...] }
	} catch (error) {
		console.error(
			`Error fetching child categories for parent_id ${parentId}:`,
			error
		);
		throw error;
	}
};

export const fetchProducts = async () => {
	try {
		const response = await fetch('/api/products', {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		if (response.ok) {
			const result = await response.json();
			return result;
		}
	} catch (error) {
		console.error('Failed to load products:', error);
	}
};
