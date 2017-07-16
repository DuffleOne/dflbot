const commandRegex = /^!(\S+)\s?(.*)$/;
const errorCodes = require('../lang/errors.json');

export default class Handler {
	constructor(app, token) {
		this.app = app;
		this._token = token;

		this.registerCommands();
	}

	async registerCommands() {
		this.app.client.on('message', async message => {
			if (!message.guild) return;

			const content = message.content;
			const command = content.match(commandRegex);

			if (!command) return;

			const [cmd, func, args] = command;
			const normalizedFunc = func.toLowerCase();

			if (typeof this.app[normalizedFunc] === 'undefined')
				return;

			const ctx = {
				message,
				args,
			};

			try {
				await this.app[normalizedFunc](ctx);
			} catch (error) {
				await this.handleError(error, message);
			}
		});
	}

	async handleError(error, message) {
		let errorCode;

		switch (true) {
			case (error instanceof Error):
				errorCode = error.message;
				break;
			case (typeof error === 'string'):
				errorCode = error;
				break;
			default:
				errorCode = 'traditional_error';
				break;
		}

		const friendlyMessage = this.getFriendlyMessage(errorCode);

		this.app.sendMessage(`Errror: ${friendlyMessage}`, message);

		return;
	}

	getFriendlyMessage(errorCode) {
		const friendlyMessage = errorCodes[errorCode];

		if (!friendlyMessage)
			return `Uncaught error code: ${errorCode}`;

		return friendlyMessage;
	}

	run() {
		this.app.client.on('ready', () => {
			console.log(`Logged in as ${this.app.client.user.tag}!`);
		});

		this.app.client.login(this._token);
	}
}
