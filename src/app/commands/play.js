import fs from 'fs';

export default function play(context) {
	const { args, message } = context;
	const files = [];

	fs.readdirSync(this.musicFolder).forEach(file => {
		const f = file.split('.');
		f.pop();

		files.push({ formatted: f.join('.'), original: file });
	});

	if (!this.voice) {
		message.reply('I can only play music in a voice channel, use !join');
		return;
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

	const fileToPlay = files.find(f => f.formatted === args);

	if (!fileToPlay) {
		message.reply(`Can't find that song :S`);
		return;
	}

	this.dispatcher = this.voice.playFile(`${this.musicFolder}/${fileToPlay.original}`);
}
