import validator from './_validate';

const validate = validator('play');

export default async function play(ctx) {
	const { app, input } = ctx;

	validate(input);

	await app.join({ args: input.channel });

	await app.play({
		args: input.url,
	});
}
