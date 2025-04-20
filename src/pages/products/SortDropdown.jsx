// SortDropdown.jsx
import React from 'react';
import { FaSort, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

const SortDropdown = ({
	sortOption,
	sortMenuOpen,
	sortDropdownRef,
	handleSortChange,
	setSortMenuOpen,
}) => {
	// Lấy tên của option sắp xếp
	const getSortOptionName = (option) => {
		switch (option) {
			case 'price_asc':
				return 'Giá: Thấp đến cao';
			case 'price_desc':
				return 'Giá: Cao đến thấp';
			case 'newest':
				return 'Mới nhất';
			default:
				return 'Mặc định';
		}
	};

	// Lấy icon cho option sắp xếp
	const getSortOptionIcon = (option) => {
		switch (option) {
			case 'price_asc':
				return <FaSortAmountUp className="text-blue-500" />;
			case 'price_desc':
				return <FaSortAmountDown className="text-blue-500" />;
			case 'newest':
				return <FaSort className="text-blue-500" />;
			default:
				return <FaSort className="text-gray-400" />;
		}
	};

	return (
		<div className="relative z-30" ref={sortDropdownRef}>
			<button
				className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"
				onClick={() => setSortMenuOpen(!sortMenuOpen)}
			>
				{getSortOptionIcon(sortOption)}
				<span>Sắp xếp: {getSortOptionName(sortOption)}</span>
			</button>

			{sortMenuOpen && (
				<div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-40 border border-gray-100">
					<ul className="py-1">
						<li
							className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 flex items-center gap-2 ${
								sortOption === 'default'
									? 'text-blue-600 bg-blue-50'
									: 'text-gray-700'
							}`}
							onClick={() => handleSortChange('default')}
						>
							<FaSort
								className={
									sortOption === 'default'
										? 'text-blue-500'
										: 'text-gray-400'
								}
							/>
							Mặc định
						</li>

						<li
							className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 flex items-center gap-2 ${
								sortOption === 'price_asc'
									? 'text-blue-600 bg-blue-50'
									: 'text-gray-700'
							}`}
							onClick={() => handleSortChange('price_asc')}
						>
							<FaSortAmountUp
								className={
									sortOption === 'price_asc'
										? 'text-blue-500'
										: 'text-gray-400'
								}
							/>
							Giá: Thấp đến cao
						</li>

						<li
							className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 flex items-center gap-2 ${
								sortOption === 'price_desc'
									? 'text-blue-600 bg-blue-50'
									: 'text-gray-700'
							}`}
							onClick={() => handleSortChange('price_desc')}
						>
							<FaSortAmountDown
								className={
									sortOption === 'price_desc'
										? 'text-blue-500'
										: 'text-gray-400'
								}
							/>
							Giá: Cao đến thấp
						</li>

						<li
							className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 flex items-center gap-2 ${
								sortOption === 'newest'
									? 'text-blue-600 bg-blue-50'
									: 'text-gray-700'
							}`}
							onClick={() => handleSortChange('newest')}
						>
							<FaSort
								className={
									sortOption === 'newest'
										? 'text-blue-500'
										: 'text-gray-400'
								}
							/>
							Mới nhất
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default SortDropdown;
