import React from 'react';
import { FiUpload } from 'react-icons/fi';

const ImageUploadSection = ({
	primaryImage,
	setPrimaryImage,
	formData,
	setFormData,
	selectedImages,
	setSelectedImages,
	handlePrimaryImageChange,
	handleAdditionalImagesChange,
}) => {
	return (
		<div className="md:w-1/3 bg-gray-50 p-6 border-l border-gray-200">
			<h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
				<FiUpload className="mr-2 text-indigo-600" /> Hình Ảnh Sản Phẩm
			</h2>

			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-700 mb-2">
					Ảnh Chính
				</label>
				<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-white">
					<div className="space-y-1 text-center">
						{primaryImage ? (
							<div>
								<img
									src={primaryImage}
									alt="Primary product"
									className="mx-auto h-60 w-auto object-contain rounded"
								/>
								<button
									className="mt-2 text-xs text-red-600 hover:text-red-900"
									onClick={() => {
										setPrimaryImage(null);
										setFormData({
											...formData,
											primary_image: null,
										});
									}}
								>
									Xóa ảnh
								</button>
							</div>
						) : (
							<>
								<FiUpload className="mx-auto h-12 w-12 text-gray-400" />
								<div className="flex text-sm text-gray-600">
									<label
										htmlFor="primary_image"
										className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
									>
										<span>Tải ảnh lên</span>
										<input
											id="primary_image"
											name="primary_image"
											type="file"
											className="sr-only"
											accept="image/*"
											onChange={handlePrimaryImageChange}
										/>
									</label>
									<p className="pl-1">hoặc kéo thả</p>
								</div>
								<p className="text-xs text-gray-500">
									PNG, JPG, GIF tối đa 10MB
								</p>
							</>
						)}
					</div>
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2">
					Ảnh Bổ Sung
				</label>
				<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-white">
					<div className="space-y-1 text-center">
						{selectedImages.length > 0 ? (
							<div>
								<div className="grid grid-cols-3 gap-2 mb-2">
									{selectedImages.map((img, index) => (
										<div
											key={index}
											className="relative group"
										>
											<img
												src={img}
												alt={`Product ${index}`}
												className="h-20 w-full object-cover rounded"
											/>
											<div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
												<button
													className="text-white text-xs"
													onClick={() => {
														const newImages = [
															...selectedImages,
														];
														newImages.splice(
															index,
															1
														);
														setSelectedImages(
															newImages
														);
														setFormData({
															...formData,
															additional_images:
																newImages.map(
																	(img) => img
																),
														});
													}}
												>
													Xóa
												</button>
											</div>
										</div>
									))}
								</div>
								<button
									className="text-xs text-indigo-600 hover:text-indigo-900"
									onClick={() =>
										document
											.getElementById('additional_images')
											.click()
									}
								>
									Thêm ảnh
								</button>
							</div>
						) : (
							<>
								<FiUpload className="mx-auto h-12 w-12 text-gray-400" />
								<div className="flex text-sm text-gray-600">
									<label
										htmlFor="additional_images"
										className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
									>
										<span>Tải nhiều ảnh</span>
										<input
											id="additional_images"
											name="additional_images[]"
											type="file"
											className="sr-only"
											multiple
											accept="image/*"
											onChange={
												handleAdditionalImagesChange
											}
										/>
									</label>
									<p className="pl-1">hoặc kéo thả</p>
								</div>
								<p className="text-xs text-gray-500">
									Tối đa 5 ảnh, mỗi ảnh không quá 10MB
								</p>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageUploadSection;
