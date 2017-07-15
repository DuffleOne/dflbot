const msInSeconds = 1000;

export default function time(context) {
	const { message } = context;

	if (!this.dispatcher) {
		message.reply(`I'm not playing any music.`);
		return;
	}

	const seconds = (dispatcher.time / msInSeconds).toFixed(2);

	message.reply(`Song is at ${seconds} seconds.`);
}
