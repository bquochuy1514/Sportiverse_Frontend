// src/components/auth/SocialLogin.jsx
import React from 'react';

const SocialLogin = () => {
	return (
		<div className="mt-8">
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-gray-300"></div>
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="px-2 bg-white text-gray-500">
						Hoặc đăng nhập với
					</span>
				</div>
			</div>

			<div className="mt-6 grid grid-cols-2 gap-3">
				<div>
					<a
						href="#"
						className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						<svg
							className="h-5 w-5 text-blue-600"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
						</svg>
						<span className="ml-2">Facebook</span>
					</a>
				</div>

				<div>
					<a
						href="#"
						className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						<svg
							className="h-5 w-5 text-red-500"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.787-1.676-4.139-2.701-6.735-2.701-5.522 0-10.003 4.481-10.003 10.003s4.481 10.003 10.003 10.003c8.025 0 9.826-7.491 9.826-12.003 0-0.791-0.081-1.541-0.223-2.251l-9.603 0.012z" />
						</svg>
						<span className="ml-2">Google</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default SocialLogin;
