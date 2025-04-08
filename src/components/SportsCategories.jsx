// src/components/SportsCategories.jsx
import React, { useState, useEffect } from 'react';
import ArrowDownIcon from './common/icons/ArrowDownIcon';
import CategoryDropdown from './CategoryDropdown';

const SportsCategories = () => {
	const [sports, setSports] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [openDropdownId, setOpenDropdownId] = useState(null); // Theo dõi danh mục đang mở

	useEffect(() => {
		const fetchSports = async () => {
			try {
				const response = await fetch('/api/sports');
				if (!response.ok) {
					throw new Error('Không thể tải danh mục môn thể thao');
				}
				const data = await response.json();
				setSports(data.data);
				setLoading(false);
			} catch (err) {
				setError(err.message || 'Không thể tải danh mục môn thể thao');
				setLoading(false);
			}
		};

		fetchSports();
	}, []);

	if (loading) {
		return (
			<div className="text-center py-3 text-gray-500">Đang tải...</div>
		);
	}

	if (error) {
		return <div className="text-center py-3 text-red-500">{error}</div>;
	}

	return (
		<nav className="bg-white border-t border-b border-gray-200 shadow-sm">
			<div className="container mx-auto px-4 max-w-screen-xl">
				<ul className="flex items-center justify-center gap-10 py-3">
					{sports.map((sport) => (
						<li key={sport.id}>
							<CategoryDropdown
								sportId={sport.id}
								isOpen={openDropdownId === sport.id}
								setOpenDropdownId={setOpenDropdownId}
							>
								<div className="flex items-center gap-1 text-gray-800 hover:text-blue-600 font-semibold text-base uppercase transition-colors group cursor-pointer">
									{/* Icon */}
									<img
										src={sport.icon}
										alt={`${sport.name} icon`}
										className="w-6 h-6 object-contain group-hover:brightness-110 transition-all"
									/>

									{/* Tên môn thể thao */}
									<span className="text-sm">
										{sport.name}
									</span>

									{/* Mũi tên xuống */}
									<ArrowDownIcon className="w-4 h-4 ml-1 text-gray-500 group-hover:text-blue-600 transition-colors" />
								</div>
							</CategoryDropdown>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default SportsCategories;
