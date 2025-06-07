// src/components/common/SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ className = '', placeholder = 'Tìm kiếm...' }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const navigate = useNavigate();

	// Hàm xử lý khi submit form tìm kiếm
	const handleSubmit = (e) => {
		e.preventDefault();
		// Thêm logic tìm kiếm ở đây, ví dụ: navigate đến trang kết quả tìm kiếm
		console.log('Searching for:', searchQuery);
		navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
	};

	return (
		<div className={`relative ${className}`}>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					className="w-full bg-white border border-blue-200 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
					placeholder={placeholder}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<svg
						className="h-5 w-5 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
				</div>
				<button type="submit" className="sr-only">
					Tìm kiếm
				</button>
			</form>
		</div>
	);
};

export default SearchBar;
