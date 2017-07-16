export default async function play(ctx) {
	const { app, input } = ctx;

	await app.join({ args: input.channel });

	await app.play({
		args: input.url,
	});
}
