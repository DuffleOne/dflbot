export default function pause(context) {
	const { message } = context;

	if (!this.dispatcher) {
		message.reply(`I'm not playing any music.`);
		return;
	}

	this.dispatcher.pause();
}
