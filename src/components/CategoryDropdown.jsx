// src/components/CategoryDropdown.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const CategoryDropdown = ({ sportId, children }) => {
	const [categories, setCategories] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const fetchCategories = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`/api/categories?sport_id=${sportId}&parent_id=`
				);
				if (!response.ok) {
					throw new Error('Không thể tải danh mục');
				}
				const data = await response.json();
				setCategories(data.data);
				setLoading(false);
			} catch (err) {
				setError(err.message || 'Không thể tải danh mục');
				setLoading(false);
			}
		};

		fetchCategories();
	}, [sportId]);

	// Đóng dropdown khi nhấp ra ngoài
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		// Thêm event listener khi dropdown mở
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
		}

		// Dọn dẹp event listener khi component unmount hoặc dropdown đóng
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isOpen]);

	const toggleDropdown = () => {
		// Chỉ đóng dropdown nếu đang mở, không mở lại nếu đang đóng
		if (isOpen) {
			setIsOpen(false);
		} else {
			setIsOpen(true);
		}
	};

	return (
		<div className="relative" ref={dropdownRef}>
			{/* Nút để mở/đóng dropdown */}
			<div onClick={toggleDropdown}>{children}</div>

			{/* Dropdown */}
			{isOpen && (
				<div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10">
					{loading ? (
						<div className="px-4 py-2 text-gray-500">
							Đang tải...
						</div>
					) : error ? (
						<div className="px-4 py-2 text-red-500">{error}</div>
					) : categories.length === 0 ? (
						<div className="px-4 py-2 text-gray-500">
							Không có danh mục
						</div>
					) : (
						<ul className="py-1">
							{categories.map((category) => (
								<li key={category.id}>
									<Link
										to={`/category/${category.slug}`}
										className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
										onClick={() => setIsOpen(false)} // Đóng dropdown khi nhấp
									>
										{category.name}
									</Link>
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	);
};

export default CategoryDropdown;
