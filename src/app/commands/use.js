export default async function use(ctx) {
	const { message } = ctx;

	if (!message)
		throw new Error('discord_only');

	if (!this.admins.includes(message.author.id))
		return;

	this.musicChannel = message.channel;

	this.sendMessage('Using this channel now :)', message);
}
