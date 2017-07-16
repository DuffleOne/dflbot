export default async function join(context) {
	const { message, args } = context;
	let channel;

	if (!args) {
		if (!message.member.voiceChannel)
			throw new Error('unknown_channel');
		else
			channel = message.member.voiceChannel;
	}

	if (!channel)
		channel = this.client.channels.find('name', args);

	if (!channel)
		throw new Error('channel_not_found');

	if (channel.type !== 'voice')
		throw new Error('cannot_join');

	this.voice = await channel.join();

	if (message)
		message.reply(`Joined ${channel.name}.`);
}
