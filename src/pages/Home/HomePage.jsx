import React from 'react';
import HomeBanner from '../../components/home/HomeBanner';
import '../../styles/banner.css'; // Import CSS animations
import SportCategory from '../../components/home/SportCategory';
import FeaturedProducts from '../../components/home/FeaturedProducts';
import ServicesAndFeatures from '../../components/home/ServicesAndFeatures';

const HomePage = () => {
	return (
		<div className="pt-4">
			<HomeBanner />
			<SportCategory />
			<FeaturedProducts />
			<ServicesAndFeatures />
			{/* Phần còn lại của trang chủ sẽ được thêm vào sau */}
		</div>
	);
};

export default HomePage;
