import React from 'react';
import HomeBanner from '../../components/home/HomeBanner';
import '../../styles/banner.css'; // Import CSS animations
import SportCategory from '../../components/home/SportCategory';

const HomePage = () => {
	return (
		<div className="space-y-12 pt-4">
			{/* Sử dụng component HomeBanner */}
			<HomeBanner />
			<SportCategory />
			{/* Phần còn lại của trang chủ sẽ được thêm vào sau */}
		</div>
	);
};

export default HomePage;
