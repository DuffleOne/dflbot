import 'babel-polyfill';
import Discord from 'discord.js';
import App from '../app';
import Handler from '../app/handler';
import Server from '../server';
import config from '../../config.json';

const port = 8080;
const client = new Discord.Client();

const context  = {
	admins: config.admins,
	client,
	musicChannel: config.musicChannel,
	serverId: config.serverId,
};

const run = async () => {
	const app = new App(context);
	const server = new Server(app, { port });
	const handler = new Handler(app, config.token);

	await server.setup();

	handler.run();
	server.run();
};

(async () => {
	try {
		await run();
	} catch (error) {
		console.error('start_failed', [error]);
	}
})();
