export default async function sendMessage(ctx, originalMessage) {
	if (ctx && ctx.message)
		throw new Error('core_only');

	const messageToSend = ctx;

	if (originalMessage) {
		originalMessage.reply(messageToSend);
		return;
	}

	if (this.musicChannel) {
		this.musicChannel.sendMessage(messageToSend);
		return;
	}

	const serverId = this.serverId;

	const guild = this.client.guilds.find(g => g.id === serverId);
	const defaultChannel = guild.defaultChannel;

	const musicChannel = guild.channels.find(c => c.name === 'music');

	if (musicChannel) {
		this.musicChannel = musicChannel;
		musicChannel.sendMessage(messageToSend);
		return;
	}

	defaultChannel.send(messageToSend);
}
