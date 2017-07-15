export default async function leave(context) {
	const { message } = context;

	if (!this.voice) return;

	if (this.dispatcher)
		await this.dispatcher.end();

	await this.voice.disconnect();

	this.voice = null;
	this.dispatcher = null;

	message.reply(`Bye!`);
}
