import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md';

const ProductImageGallery = ({
	images,
	productName,
	discountPercentage,
	hasDiscount,
}) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [showZoom, setShowZoom] = useState(false);

	// Modal zoom state
	const [zoomModalOpen, setZoomModalOpen] = useState(false);
	const [zoomImageIndex, setZoomImageIndex] = useState(0);

	// Handle Esc key to close modal
	useEffect(() => {
		const handleEscKey = (e) => {
			if (e.key === 'Escape' && zoomModalOpen) {
				closeZoomModal();
			}
		};

		window.addEventListener('keydown', handleEscKey);

		// Prevent page scrolling when modal is open
		if (zoomModalOpen) {
			document.body.style.overflow = 'hidden';

			// Thêm style trực tiếp vào header khi modal mở
			const headerElement = document.querySelector('header');
			if (headerElement) {
				headerElement.style.zIndex = '0';
			}
		} else {
			document.body.style.overflow = 'auto';

			// Khôi phục z-index ban đầu cho header
			const headerElement = document.querySelector('header');
			if (headerElement) {
				headerElement.style.zIndex = '50';
			}
		}

		return () => {
			window.removeEventListener('keydown', handleEscKey);
			document.body.style.overflow = 'auto';

			// Đảm bảo khôi phục z-index của header khi unmount
			const headerElement = document.querySelector('header');
			if (headerElement) {
				headerElement.style.zIndex = '50';
			}
		};
	}, [zoomModalOpen]);

	const handleNextImage = () => {
		if (images?.length > 1) {
			setCurrentImageIndex((prev) =>
				prev === images.length - 1 ? 0 : prev + 1
			);
		}
	};

	const handlePrevImage = () => {
		if (images?.length > 1) {
			setCurrentImageIndex((prev) =>
				prev === 0 ? images.length - 1 : prev - 1
			);
		}
	};

	// Zoom modal functions
	const openZoomModal = (index) => {
		setZoomImageIndex(index);
		setZoomModalOpen(true);
	};

	const closeZoomModal = () => {
		setZoomModalOpen(false);
	};

	const nextZoomImage = (e) => {
		e.stopPropagation();
		if (images?.length > 1) {
			setZoomImageIndex((prev) =>
				prev === images.length - 1 ? 0 : prev + 1
			);
		}
	};

	const prevZoomImage = (e) => {
		e.stopPropagation();
		if (images?.length > 1) {
			setZoomImageIndex((prev) =>
				prev === 0 ? images.length - 1 : prev - 1
			);
		}
	};

	return (
		<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
			<motion.div
				initial={{ scale: 0.95, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="relative p-6"
			>
				{/* Main product image with controls */}
				<div
					className="relative overflow-hidden rounded-xl cursor-pointer"
					onMouseEnter={() => setShowZoom(true)}
					onMouseLeave={() => setShowZoom(false)}
					onClick={() => openZoomModal(currentImageIndex)}
				>
					<AnimatePresence mode="wait">
						<motion.img
							key={currentImageIndex}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							src={images[currentImageIndex]?.image_path}
							alt={productName}
							className="w-full h-96 object-contain rounded-lg"
						/>
					</AnimatePresence>

					{/* Navigation arrows for images */}
					{images.length > 1 && (
						<>
							{/* Left navigation button */}
							<div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center">
								<motion.button
									initial={{ opacity: 0.6 }}
									whileHover={{
										opacity: 1,
										scale: 1.1,
									}}
									style={{
										transformOrigin: 'center',
										transformBox: 'fill-box',
									}}
									onClick={(e) => {
										e.stopPropagation();
										handlePrevImage();
									}}
									className="bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-md"
								>
									<FaChevronLeft />
								</motion.button>
							</div>

							{/* Right navigation button */}
							<div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center">
								<motion.button
									initial={{ opacity: 0.6 }}
									whileHover={{
										opacity: 1,
										scale: 1.1,
									}}
									style={{
										transformOrigin: 'center',
										transformBox: 'fill-box',
									}}
									onClick={(e) => {
										e.stopPropagation();
										handleNextImage();
									}}
									className="bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-md"
								>
									<FaChevronRight />
								</motion.button>
							</div>

							{/* Image indicator dots */}
							<div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
								{images.map((_, idx) => (
									<button
										key={idx}
										onClick={(e) => {
											e.stopPropagation();
											setCurrentImageIndex(idx);
										}}
										className={`w-2 h-2 rounded-full transition-all ${
											idx === currentImageIndex
												? 'bg-blue-600 w-4'
												: 'bg-gray-400'
										}`}
									/>
								))}
							</div>
						</>
					)}

					{/* Zoom indicator */}
					{showZoom && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md"
						>
							Bấm để phóng to
						</motion.div>
					)}
				</div>

				{/* Discount badge */}
				{hasDiscount && (
					<motion.div
						initial={{ scale: 0, rotate: -15 }}
						animate={{ scale: 1, rotate: 0 }}
						transition={{
							delay: 0.3,
							type: 'spring',
							bounce: 0.5,
						}}
						className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center"
					>
						<MdLocalOffer className="mr-1" />
						<span>Giảm {discountPercentage}%</span>
					</motion.div>
				)}
			</motion.div>

			{/* Thumbnail gallery */}
			{images.length > 1 && (
				<div className="flex justify-center gap-3 p-4 bg-gray-50">
					{images.map((image, index) => (
						<motion.div
							key={index}
							whileHover={{ scale: 1.1, y: -5 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => openZoomModal(index)}
							className={`w-16 h-16 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
								currentImageIndex === index
									? 'border-blue-500 shadow-md'
									: 'border-gray-200 opacity-70'
							}`}
						>
							<img
								src={image.image_path}
								alt={`${productName} thumbnail ${index + 1}`}
								className="w-full h-full object-cover"
							/>
						</motion.div>
					))}
				</div>
			)}

			{/* Image Zoom Modal */}
			<AnimatePresence>
				{zoomModalOpen && images && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						style={{
							position: 'fixed',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: 'rgba(0, 0, 0, 0.9)',
							backdropFilter: 'blur(4px)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							zIndex: 9999,
						}}
						data-testid="zoom-modal"
						onClick={closeZoomModal}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ type: 'spring', damping: 25 }}
							className="relative w-full max-w-6xl p-4 flex flex-col items-center justify-center"
							onClick={(e) => e.stopPropagation()}
							style={{ height: '90vh', maxHeight: '90vh' }}
						>
							{/* Close button */}
							<motion.button
								whileHover={{
									scale: 1.1,
									backgroundColor: 'rgba(255, 255, 255, 0.2)',
								}}
								whileTap={{ scale: 0.9 }}
								style={{ transformOrigin: 'center' }}
								onClick={closeZoomModal}
								className="absolute top-6 right-6 z-[9999] bg-white/10 hover:bg-white/30 text-white p-3 rounded-full shadow-lg transition-colors"
							>
								<FaTimes size={20} />
							</motion.button>

							{/* Navigation buttons */}
							{images.length > 1 && (
								<>
									{/* Left zoom navigation button */}
									<div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 flex items-center justify-center">
										<motion.button
											whileHover={{ scale: 1.2 }}
											whileTap={{ scale: 0.9 }}
											style={{
												transformOrigin: 'center',
											}}
											onClick={prevZoomImage}
											className="bg-white/20 hover:bg-white/40 text-white p-4 rounded-full shadow-lg transition-colors"
										>
											<FaChevronLeft size={24} />
										</motion.button>
									</div>

									{/* Right zoom navigation button */}
									<div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 flex items-center justify-center">
										<motion.button
											whileHover={{ scale: 1.2 }}
											whileTap={{ scale: 0.9 }}
											style={{
												transformOrigin: 'center',
											}}
											onClick={nextZoomImage}
											className="bg-white/20 hover:bg-white/40 text-white p-4 rounded-full shadow-lg transition-colors"
										>
											<FaChevronRight size={24} />
										</motion.button>
									</div>
								</>
							)}

							{/* Main image container - Đã điều chỉnh để dành không gian cho thumbnail ở dưới */}
							<div
								className="flex-1 w-full flex items-center justify-center overflow-hidden"
								style={{ maxHeight: 'calc(90vh - 120px)' }}
							>
								<AnimatePresence mode="wait">
									<motion.div
										key={zoomImageIndex}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
										className="relative w-full h-full flex items-center justify-center"
									>
										<motion.img
											src={
												images[zoomImageIndex]
													?.image_path
											}
											alt={`${productName} - hình ảnh ${
												zoomImageIndex + 1
											}`}
											className="max-h-full max-w-full object-contain"
											initial={{ scale: 0.8 }}
											animate={{ scale: 1 }}
											exit={{ scale: 0.8 }}
											transition={{
												type: 'spring',
												damping: 20,
											}}
										/>
									</motion.div>
								</AnimatePresence>
							</div>

							{/* Image counter/indicator */}
							<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
								{zoomImageIndex + 1} / {images.length}
							</div>

							{/* Thumbnail navigation - Đã chuyển xuống dưới ảnh chính */}
							{images.length > 1 && (
								<div className="flex justify-center gap-2 p-3 mt-4 bg-black/50 backdrop-blur-sm rounded-xl shadow-lg">
									{images.map((image, index) => (
										<motion.button
											key={index}
											whileHover={{ y: -3, opacity: 1 }}
											whileTap={{ scale: 0.95 }}
											onClick={(e) => {
												e.stopPropagation();
												setZoomImageIndex(index);
											}}
											className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
												zoomImageIndex === index
													? 'border-blue-400 shadow-md'
													: 'border-transparent opacity-70'
											}`}
										>
											<img
												src={image.image_path}
												alt={`Thumbnail ${index + 1}`}
												className="w-full h-full object-cover"
											/>
										</motion.button>
									))}
								</div>
							)}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ProductImageGallery;
