import * as commands from './commands';

const commandRegex = /^!(\S+)\s?(.*)$/;

export default class App {
	constructor(context) {
		const { token, client, musicFolder } = context;

		this.token = token; // Secret Token
		this.client = client; // Discord SDK
		this.voice = null; // Voice Connection
		this.dispatcher = null; // Voice Dispatcher
		this.musicFolder = musicFolder; // string music folder location

		this.registerCommands();
 	}

 	registerCommands() {
 		this.client.on('message', message => {
 			if (!message.guild) return;

 			const content = message.content;
 			const command = content.match(commandRegex);

 			if (!command) return;

			const [cmd, func, args] = command;
			const method = commands[func];

			if (!method)
				return;

			const ctx = {
				app: this,
				client: this.client,
				message,
				name: func,
				args,
			};

			return method(ctx);
 		});
 	}

	run() {
		this.client.on('ready', () => {
			console.log(`Logged in as ${this.client.user.tag}!`);
		});

		this.client.login(this.token);
	}
}
