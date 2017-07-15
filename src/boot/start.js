import 'babel-polyfill';
import Discord from 'discord.js';
import App from '../app';

const client = new Discord.Client()
const token = '';
const musicFolder = 'C:\\Users\\George\\Downloads\\music\\';

const context  = {
	token,
	client,
	musicFolder,
};

const app = new App(context);

app.run();
