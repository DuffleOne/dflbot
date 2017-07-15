import fs from 'fs';

export default function play(context) {
	const { app, args, message } = context;
	const { voice, dispatcher, musicFolder } = app;
	const files = [];

	fs.readdirSync(musicFolder).forEach(file => {
		const f = file.split('.');
		f.pop();

		files.push({ formatted: f.join('.'), original: file });
	});

	if (!voice) {
		message.reply('I can only play music in a voice channel, use !join');
		return;
	}

	// If we're "Paused" - just resume, don't start again
	if (!args && dispatcher && voice) {
		dispatcher.resume();
		return
;	}

	if (dispatcher) {
		dispatcher.end();
		app.dispatcher = null;
	}

	const fileToPlay = files.find(f => f.formatted === args);

	if (!fileToPlay) return;

	app.dispatcher = voice.playFile(`${app.musicFolder}/${fileToPlay.original}`);
}
