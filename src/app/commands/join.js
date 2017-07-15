export default async function join(context) {
	const { message, args } = context;
	let channel;

	if (!args) {
		if (!message.member.voiceChannel) {
			message.reply('What channel? Join one yourself, or use !join <channel>');
			return;
		} else {
			channel = message.member.voiceChannel;
		}
	}

	if (!channel)
		channel = this.client.channels.find('name', args);

	if (!channel) {
		message.reply(`I can't find a channel named: ${args}.`);
		return;
	}

	if (channel.type !== 'voice') {
		message.reply('I already listen in all text channels :)');
		return;
	}

	const connection = await channel.join();

	this.voice = connection;
	message.reply(`Joined ${channel.name}.`);
}
