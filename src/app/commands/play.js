import fs from 'fs';
import request from 'request';

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

	const localMatch = args.match(/^local\s(.*)$/);

	if (localMatch) {
		const [_, fileName] = localMatch;
		const fileToPlay = findFileOrRandom(fileName, files);

		if (!fileToPlay)
			throw new Error('cannot_find_song');

		message.reply(`Playing: ${fileToPlay.formatted}.`);
		this.dispatcher = this.voice.playFile(`${this.musicFolder}/${fileToPlay.original}`, {
			volume: this.vol,
		});

		return;
	}

	message.reply('Loading song from the URL, bear with me...');
	const stream = request(args);

	this.dispatcher = this.voice.playStream(stream, {
		volume: this.vol,
	});

	return;
}

function findFileOrRandom(file, files) {
	if (!file)
		return files[Math.floor(Math.random() * files.length)];

	let fileToPlay = null;

	fileToPlay = files.find(f => f.formatted === file);

	if (fileToPlay)
		return fileToPlay;
}
