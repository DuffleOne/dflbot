export default function pause(context) {
	if (!this.dispatcher)
		throw new Error('not_playing_music');

	this.dispatcher.pause();
}
