export default function stop(context) {
	const { message } = context;

	if (!this.dispatcher) {
		message.reply(`I'm not playing any music.`);
		return;
	}

	this.dispatcher.end();

	this.dispatcher = null;
}
