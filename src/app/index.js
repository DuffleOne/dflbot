import * as Commands from './commands';

export default class App {
	constructor(context) {
		const { client, musicFolder } = context;

		this.client = client; // Discord SDK
		this.musicFolder = musicFolder; // string music folder location
		this.voice = null; // Voice Connection
		this.vol = 1; // volume for the dispatcher
		this.dispatcher = null; // Voice Dispatcher
 	}
}

Object.assign(App.prototype, Commands);
