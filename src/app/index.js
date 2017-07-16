import * as Commands from './commands';

export default class App {
	constructor(context) {
		const { serverId, client, admins } = context;

		this.serverId = serverId; // Discord Server (Guild) ID
		this.musicChannel = null; // channel to output music messages
		this.admins = admins; // array of user IDs
		this.client = client; // Discord SDK
		this.voice = null; // Voice Connection
		this.vol = 1; // volume for the dispatcher
		this.dispatcher = null; // Voice Dispatcher
 	}
}

Object.assign(App.prototype, Commands);
