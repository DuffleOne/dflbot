import fs from 'fs';

export default function list(context) {
	const { app, message } = context;
	const musicFolder = app.musicFolder;
	const files = [];

	fs.readdirSync(musicFolder).forEach(file => {
		const f = file.split('.');

		f.pop();
		files.push(f.join('.'));
	});

	message.reply(`\n${files.join('\n')}`);
}
