export default async function play(ctx) {
	const { app, input } = ctx;

	await app.join({ args: 'General' });

	await app.play({
		args: 'http://s3.duffleman.co.uk.s3-eu-west-1.amazonaws.com/music/Shake%20It%20Out%20-%20Florence%20and%20the%20Machine%20%28Instrumental%29.mp3',
	});

	return { test: true };
}
