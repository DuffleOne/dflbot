const commandRegex = /^!(\S+)\s?(.*)$/;

export default class Handler {
	constructor(app, token) {
		this.app = app;
		this._token = token;

		this.registerCommands();
	}

	registerCommands() {
		this.app.client.on('message', message => {
			if (!message.guild) return;

			const content = message.content;
			const command = content.match(commandRegex);

			if (!command) return;

			const [cmd, func, args] = command;
			const normalizedFunc = func.toLowerCase();

			const method = this.app[normalizedFunc];

			if (!method)
				return;

			const ctx = {
				message,
				args,
			};

			this.app[normalizedFunc](ctx);
		});
	}

	run() {
		this.app.client.on('ready', () => {
			console.log(`Logged in as ${this.app.client.user.tag}!`);
		});

		this.app.client.login(this._token);
	}
}
