import 'babel-polyfill';
import Discord from 'discord.js';
import App from '../app';
import Handler from '../app/handler';

const client = new Discord.Client()
const token = '';
const musicFolder = 'C:\\Users\\George\\Downloads\\music\\';

const context  = {
	client,
	musicFolder,
};

const app = new App(context);
const handler = new Handler(app, token);

handler.run();
