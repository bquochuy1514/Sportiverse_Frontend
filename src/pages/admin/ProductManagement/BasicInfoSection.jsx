import React from 'react';
import { FiTag, FiChevronDown } from 'react-icons/fi';

const BasicInfoSection = ({
	sports,
	filteredParentCategories,
	childCategories,
	selectedSportId,
	setSelectedSportId,
	selectedParentId,
	setSelectedParentId,
	handleInputChange,
	formData,
}) => {
	return (
		<div className="mb-8">
			<h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
				<FiTag className="mr-2 text-indigo-600" />
				Thông Tin Cơ Bản
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Chọn thể thao */}
				<div>
					<label
						htmlFor="sport"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Thể Thao
					</label>
					<div className="relative">
						<select
							id="sport"
							name="sport_id"
							className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm"
							value={selectedSportId}
							onChange={(e) => {
								setSelectedSportId(e.target.value);
								formData.sport_id = e.target.value;
							}}
						>
							<option value="">--Chọn thể thao--</option>
							{sports.map((sport) => (
								<option key={sport.id} value={sport.id}>
									{sport.name}
								</option>
							))}
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
							<FiChevronDown className="h-4 w-4" />
						</div>
					</div>
				</div>
				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Tên Sản Phẩm
					</label>
					<input
						type="text"
						id="name"
						name="name"
						className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						placeholder="Nhập tên sản phẩm"
						value={formData.name}
						onChange={handleInputChange}
					/>
				</div>

				<div>
					<label
						htmlFor="parent_category"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Danh Mục Cha
					</label>
					<div className="relative">
						<select
							id="parent_category"
							name="parent_category_id"
							className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm"
							value={selectedParentId}
							onChange={(e) => {
								setSelectedParentId(e.target.value);
							}}
						>
							<option value="">--Chọn danh mục cha--</option>
							{filteredParentCategories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
							<FiChevronDown className="h-4 w-4" />
						</div>
					</div>
				</div>

				<div>
					<label
						htmlFor="sub_category"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Danh Mục Con
					</label>
					<div className="relative">
						<select
							id="sub_category"
							name="category_id"
							className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm"
							value={formData.category_id}
							onChange={handleInputChange}
						>
							<option value="">--Chọn danh mục con--</option>
							{childCategories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
							<FiChevronDown className="h-4 w-4" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BasicInfoSection;
