import fs from 'fs';

export default function list(context) {
	const { app, message } = context;
	const musicFolder = app.musicFolder;
	const files = [];

	fs.readdirSync(musicFolder).forEach(file => {
		files.push(file.slice(0, -4));
	});

	message.reply(`\n${files.join('\n')}`);
}
