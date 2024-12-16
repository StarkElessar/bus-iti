import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import checker from 'vite-plugin-checker';
import pugPlugin from 'vite-plugin-pug';

import { createFontFaces, generateWebpImages } from './vite-plugins';

export default defineConfig(({ command }) => {
	return {
		server: {
			host: '0.0.0.0',
			port: 3000
		},
		css: {
			transformer: 'postcss'
		},
		plugins: [
			generateWebpImages({ extensions: ['png', 'jpg', 'jpeg'] }),
			ViteImageOptimizer({
				webp: {
					quality: 85,
				}
			}),
			createFontFaces(),
			pugPlugin({}),
			checker({ typescript: command === 'serve' }),
			{
				name: 'vite:pug',
				apply: 'build',
				transformIndexHtml: {
					order: 'post',
					handler: async (html, ctx) => {
						if (/\.html$/.test(ctx.path)) {
							return html.replace(/\/public\//g, '/');
						}
					}
				}
			}
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
