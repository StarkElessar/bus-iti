import { existsSync, promises } from 'node:fs';
import { resolve, parse } from 'node:path';
import chalk from 'chalk';
import { Plugin } from 'vite';

const italicRegex = /italic/i;
const cleanSeparator = /(?:_|__|-|\s)?(italic)/i;

const fontWeights: Record<string, number> = {
	'thin': 100,
	'hairline': 100,
	'extralight': 200,
	'ultralight': 200,
	'light': 300,
	'regular': 400,
	'medium': 500,
	'semibold': 600,
	'demibold': 600,
	'bold': 700,
	'extrabold': 800,
	'ultrabold': 800,
	'black': 900,
	'heavy': 900,
	'extrablack': 950,
	'ultrablack': 950
};

const fontFaceTemplate = (name: string, file: string, weight: number, style: string) => `@font-face {
	font-family: ${name};
	font-display: swap;
	src: url("/fonts/${file}.woff2") format("woff2");
	font-weight: ${weight};
	font-style: ${style};
}\n\n`;

export const createFontFaces = (): Plugin => {
	const PLUGIN_NAME = 'vite:create-font-faces';
	const time = new Date().toLocaleTimeString();
	const label = chalk.bold.cyan(`[${PLUGIN_NAME}]`);

	return {
		name: PLUGIN_NAME,
		configResolved: async () => {
			const fontsDir = resolve('public/fonts');
			const fontFacesFile = resolve('src/styles/config/font-faces.scss');

			try {
				if (existsSync(fontFacesFile)) {
					throw new Error('Файл scss/config/fonts.scss уже существует. Для обновления файла его нужно удалить.');
				}

				const fontFiles = await promises.readdir(fontsDir);

				if (!fontFiles.length) {
					throw new Error('В проекте нет шрифтов.');
				}

				await promises.writeFile(fontFacesFile, '');
				let newFileOnly = '';

				for (const file of fontFiles) {
					const { name } = parse(file);

					if (newFileOnly !== name) {
						const [fontName, weight = 'regular'] = name.split('-');
						const weightString = fontWeights[weight.replace(cleanSeparator, '').toLowerCase()];
						const fontStyle = italicRegex.test(name) ? 'italic' : 'normal';

						await promises.appendFile(fontFacesFile, fontFaceTemplate(fontName, name, weightString, fontStyle));
						newFileOnly = name;
					}
				}

				console.log(`${time} ${label} ${chalk.bold.green('Файл font-faces.scss успешно записан.')}`);
			}
			catch (error) {
				const message = error instanceof Error ? error.message : 'Произошла какая то ошибка..'

				console.log(`${time} ${label}`, chalk.red(message));
			}
		}
	};
};
