export default function pause(context) {
	const { app, message } = context;
	const { dispatcher } = app;

	if (!dispatcher) {
		message.reply(`I'm not playing any music.`);
		return;
	}

	dispatcher.resume();
}
