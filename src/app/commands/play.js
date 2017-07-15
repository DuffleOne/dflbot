import fs from 'fs';

export default async function play(context) {
	const { args, message } = context;
	const files = [];

	fs.readdirSync(this.musicFolder).forEach(file => {
		const f = file.split('.');
		f.pop();

		files.push({ formatted: f.join('.'), original: file });
	});

	if (!this.voice) {
		try {
			await this.join({ ...context, args: null });
		} catch (error) {
			throw new Error('cannot_join');
		}
	}

	// If we're "Paused" - just resume, don't start again
	if (!args && this.dispatcher && this.voice) {
		this.dispatcher.resume();
		return
;	}

	if (this.dispatcher) {
		this.dispatcher.end();
		this.dispatcher = null;
	}

	const fileToPlay = findFileOrRandom(args, files);

	if (!fileToPlay)
		throw new Error('cannot_find_song');

	message.reply(`Playing: ${fileToPlay.formatted}.`);
	this.dispatcher = this.voice.playFile(`${this.musicFolder}/${fileToPlay.original}`);
}

function findFileOrRandom(file, files) {
	let fileToPlay = null;

	fileToPlay = files.find(f => f.formatted === file);

	if (fileToPlay) return fileToPlay;

	return files[Math.floor(Math.random() * files.length)];
}
