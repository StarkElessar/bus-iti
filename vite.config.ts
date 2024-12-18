import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';

export default defineConfig(({ command }) => {
	const isDev = command === 'serve';

	return {
		base: isDev ? '/' : '/international-phone-number',
		server: {
			host: '0.0.0.0',
			port: 3000,
			open: '/example/index.html'
		},
		css: {
			transformer: 'postcss'
		},
		plugins: [
			dts(),
			checker({ typescript: isDev }),
		],
		build: {
			lib: {
				entry: resolve('src/scripts/index.ts'),
				name: 'InternationalPhoneNumber',
				formats: ['es'],
				fileName: 'international-phone-number',
			},
			rollupOptions: {
				external: ['imask'],
				output: {
					assetFileNames: 'assets/[name][extname]',
					entryFileNames: '[name].js'
				}
			},
		},
		resolve: {
			alias: {
				'@styles': resolve(__dirname, 'src/styles'),
				'@scripts': resolve(__dirname, 'src/scripts'),
			}
		},
	};
});
