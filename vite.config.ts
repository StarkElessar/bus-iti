import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig(({ command }) => {
	const isDev = command === 'serve';

	return {
		base: isDev ? '/' : '/international-phone-number',
		server: {
			host: '0.0.0.0',
			port: 3000
		},
		css: {
			transformer: 'postcss'
		},
		plugins: [
			checker({ typescript: isDev }),
		],
		build: {
			rollupOptions: {
				input: {
					index: resolve(__dirname, 'index.html'),
				},
			},
		},
		resolve: {
			alias: {
				'@styles': resolve(__dirname, 'src/styles'),
				'@scripts': resolve(__dirname, 'src/scripts'),
			}
		}
	};
});
