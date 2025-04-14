import React from 'react';
import HomeButton from '../../components/common/HomeButton';

export default function AccountEffect() {
	return (
		<>
			<div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 via-blue-900/60 to-blue-800/70 backdrop-blur-sm"></div>
			<div className="absolute inset-0 opacity-10 bg-pattern-sport"></div>
			<HomeButton variant="light" position="top-6 left-6" />
			<div className="absolute top-20 right-10 w-60 h-60 bg-teal-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
			<div
				className="absolute bottom-20 left-10 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"
				style={{ animationDelay: '2s' }}
			></div>
		</>
	);
}
