export default function stop(context) {
	const { message } = context;

	if (!this.dispatcher)
		throw new Error('not_playing_music');

	this.dispatcher.end();

	this.dispatcher = null;
}
