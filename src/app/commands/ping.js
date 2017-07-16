export default function ping(context) {
	const { message } = context;

	this.sendMessage('pong!', message);
}
