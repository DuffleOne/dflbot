import fs from 'fs';

export default function list(context) {
	const { message } = context;
	const musicFolder = this.musicFolder;
	const files = [];

	fs.readdirSync(musicFolder).forEach(file => {
		const f = file.split('.');

		f.pop();
		files.push(f.join('.'));
	});

	message.reply(`\n${files.join('\n')}`);
}
