import { FaUser } from 'react-icons/fa';
import React from 'react';

export default function HeaderAccount({ message }) {
	return (
		<div className="relative mb-10 group">
			{/* Background effects */}
			<div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg opacity-10 blur-xl h-32 group-hover:opacity-15 transition-opacity duration-500"></div>
			<div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

			{/* Main header container */}
			<div className="relative flex items-center justify-between p-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-teal-100 transition-all duration-300 group-hover:shadow-2xl group-hover:border-teal-200 overflow-hidden">
				{/* Decorative elements */}
				<div className="absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-full blur-md"></div>
				<div className="absolute -left-16 -bottom-16 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-teal-500/10 rounded-full blur-md"></div>

				{/* Title with improved icon */}
				<h1 className="text-3xl font-extrabold text-gray-800 flex items-center">
					<span className="bg-gradient-to-r from-teal-600 to-blue-600 text-white p-2.5 rounded-lg mr-3 shadow-md group-hover:shadow-lg transition-all duration-300 relative overflow-hidden">
						<div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
						<FaUser className="h-6 w-6 relative z-10" />
					</span>
					<span className="relative">
						{message}
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 group-hover:w-full transition-all duration-500"></span>
					</span>
				</h1>

				{/* Enhanced macOS-style dots */}
				<div className="hidden md:block">
					<div className="flex space-x-2">
						<span className="h-3.5 w-3.5 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-sm relative group-hover:shadow transition-all duration-300 flex items-center justify-center">
							<span className="absolute inset-0.5 bg-red-500 rounded-full opacity-75 group-hover:opacity-0 transition-opacity duration-300"></span>
							<span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-[8px]">
								✕
							</span>
						</span>
						<span className="h-3.5 w-3.5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-sm relative group-hover:shadow transition-all duration-300 flex items-center justify-center">
							<span className="absolute inset-0.5 bg-yellow-500 rounded-full opacity-75 group-hover:opacity-0 transition-opacity duration-300"></span>
							<span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-[8px]">
								−
							</span>
						</span>
						<span className="h-3.5 w-3.5 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-sm relative group-hover:shadow transition-all duration-300 flex items-center justify-center">
							<span className="absolute inset-0.5 bg-green-500 rounded-full opacity-75 group-hover:opacity-0 transition-opacity duration-300"></span>
							<span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-[8px]">
								＋
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
