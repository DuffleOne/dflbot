import 'babel-polyfill';
import Discord from 'discord.js';
import App from '../app';
import Handler from '../app/handler';
import Server from '../server';

const port = 8080;

const admins = [''];
const client = new Discord.Client()
const token = '';
const musicFolder = 'C:\\Users\\George\\Downloads\\music\\';

const context  = {
	admins,
	client,
	musicFolder,
};

const run = async () => {
	const app = new App(context);
	const server = new Server(app, { port });
	const handler = new Handler(app, token);

	await server.setup();

	handler.run();
	server.run();
}

(async () => {
	try {
		await run();
	} catch (error) {
		console.error('start_failed', [error]);
	}
})();
