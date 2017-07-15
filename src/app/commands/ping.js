export default function ping(context) {
	const { message } = context;

	message.reply('pong!');
}
