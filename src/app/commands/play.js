import fs from 'fs';
import request from 'request';

export default async function play(context) {
	const { args, message } = context;
	const files = [];

	if (!this.voice) {
		try {
			await this.join({ ...context, args: null });
		} catch (error) {
			throw new Error('cannot_join');
		}
	}

	// If we're "Paused" - just resume, don't start again
	if (!args && this.dispatcher && this.voice) {
		this.dispatcher.resume();
		return
	}

	if (this.dispatcher) {
		this.dispatcher.end();
		this.dispatcher = null;
	}

	this.sendMessage('Loading song from the URL, bear with me...', message);

	const stream = request(args);

	this.dispatcher = this.voice.playStream(stream, {
		volume: this.vol,
	});

	this.sendMessage('Playing new song...'); // TODO: Better message here

	return;
}
