const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');
const os = require("os");
const chalk = require('chalk');
const { spawn } = require('child_process');
const handlebars = require('handlebars');

/**
 * abc-xyz => AbcXyz
 * @param {*} str
 */
const varCase = str => str.replace(/-[a-z]/g, m => m[1].toUpperCase()).replace(/^.{1}/, m => m.toUpperCase());
const lowCase = str => str.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`).replace(/^-/, '');



(async () => {
	const component = process.argv[2];

	const varCased = varCase(component);
	const lowCased = lowCase(component);

	spawn('mkdir', ['-p', path.join(process.cwd(), `src/${varCased}`)]);

	const tplFiles = glob.sync(path.join(__dirname, 'template/*.hbs'));
	tplFiles.forEach((async filePath => {
		const content = await fs.readFile(filePath, 'utf-8');
		const template = handlebars.compile(content);
		const result = template({
			component: lowCased,
			Component: varCased
		});

		const newPath = filePath.replace('scripts/template', `src/${varCased}`)
			.replace('.hbs', '');

		await fs.writeFile(newPath, result);

		console.log(chalk.green(`write ${newPath} success`));
	}))
	// demo

	spawn('mkdir', ['-p', path.join(process.cwd(), `src/${varCased}/demos`)]);

	const demoPath = path.join(__dirname, `template/demos/default.tsx.hbs`)
	const content = await fs.readFile(demoPath, 'utf-8');
	const template = handlebars.compile(content);
	const result = template({
		Component: varCased
	});
	const newPath = demoPath.replace('scripts/template', `src/${varCased}`)
		.replace('.hbs', '');
	await fs.writeFile(newPath.replace('.hbs', ''), result);
	console.log(chalk.green(`write ${newPath} success`));
	//引入
	const updatePath = path.join(process.cwd(), `src/index.ts`)
	fs.appendFile(updatePath,
		`export { default as ${varCased} } from './${varCased}';` + os.EOL, (err) => {
			if (err) {
				console.log(chalk.red(`update ${newPath} fail`))
			} else {
				console.log(chalk.green(`update ${newPath} success`))
			}
		})
})();
