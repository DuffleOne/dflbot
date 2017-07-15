export default async function leave(context) {
	const { app, message, client } = context;
	const { voice, dispatcher } = app;

	if (!voice) return;

	if (dispatcher)
		await dispatcher.end();

	await voice.disconnect();

	app.voice = null;
	app.dispatcher = null;

	message.reply(`Bye!`);
}
