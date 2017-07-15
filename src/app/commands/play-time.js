const msInSeconds = 1000;

export default function time(context) {
	const { app, message } = context;
	const { dispatcher } = app;

	if (!dispatcher) {
		message.reply(`I'm not playing any music.`);
		return;
	}

	const seconds = (dispatcher.time / msInSeconds).toFixed(2);

	message.reply(`Song is at ${seconds} seconds.`);
}
