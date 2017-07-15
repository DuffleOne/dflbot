const msInSeconds = 1000;

export default function time(context) {
	const { message } = context;

	if (!this.dispatcher)
		throw new Error('not_playing_music');

	const seconds = (dispatcher.time / msInSeconds).toFixed(2);

	message.reply(`Song is at ${seconds} seconds.`);
}
