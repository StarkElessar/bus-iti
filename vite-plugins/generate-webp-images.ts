import { type Plugin } from 'vite';
import { dest, src } from 'gulp';
import webp from 'gulp-webp';
import newer from 'gulp-newer';
import chalk from 'chalk';

interface GenerateWebpImages {
	extensions: ('png' | 'jpg' | 'svg' | 'jpeg')[];
	logger?: boolean;
}

export const generateWebpImages = ({ extensions }: GenerateWebpImages): Plugin => {
	const PLUGIN_NAME = 'vite:generate-webp';
	const time = new Date().toLocaleTimeString();
	const label = chalk.bold.cyan(`[${PLUGIN_NAME}]`);

	return {
		name: PLUGIN_NAME,
		configResolved: async () => {
			console.info(`${time} ${label} ${chalk.bold.green('Конвертация изображений запущена..')}`);

			src(`./src/images/**/*.{${extensions.join(',')}}`, { encoding: false, allowEmpty: true })
				.pipe(newer('./public/images'))
				.pipe(webp())
				.pipe(dest('./public/images'));
		}
	};
};
