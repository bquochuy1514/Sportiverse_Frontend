import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	// Load env file based on `mode`
	// eslint-disable-next-line no-undef
	const env = loadEnv(mode, process.cwd(), '');

	return {
		// eslint-disable-next-line no-undef
		plugins: [react()],
		server: {
			proxy: {
				'/api': {
					target: env.VITE_BACKEND_URL, // Fallback URL
					secure: false,
					changeOrigin: true,
					configure: (proxy) => {
						proxy.on('proxyReq', (proxyReq) => {
							// Thêm header ngrok-skip-browser-warning vào tất cả yêu cầu
							proxyReq.setHeader(
								'ngrok-skip-browser-warning',
								'true'
							);
						});
					},
				},
			},
			allowedHosts: [
				'intl-medicaid-struct-conversations.trycloudflare.com',
				'localhost',
			],
		},
		base: '/',
	};
});
