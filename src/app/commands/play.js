export default function play(context) {
	const { app, args, message } = context;

	const { voice, dispatcher } = app;

	if (!voice) {
		message.reply('I can only play music in a voice channel, use !join');
		return;
	}

	if (!args && dispatcher && voice) {
		dispatcher.resume();
		return;
	}

	if (dispatcher) {
		dispatcher.end();
		app.dispatcher = null;
	}

	app.dispatcher = voice.playFile(`${app.musicFolder}/${args}.mp3`);
}
