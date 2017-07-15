const acceptedKeyWords = ['up', 'down', 'max', 'double'];

const stepUp = 0.2;

export default async function volume(ctx) {
	const { message, args } = ctx;
	const arg = args.toLowerCase();

	const max = getMax(this, message.author.id);

	let newVolume = this.vol;

	if (!arg) return;

	const argAsNum = parseInt(arg, 10) / 100;

	if (!acceptedKeyWords.includes(arg) && !argAsNum)
		throw new Error('volume_bad_params');

 	switch (arg) {
 		case 'double':
 			newVolume = 2;
 			break;
 		case 'max':
 			newVolume = 1;
 			break;
 		case 'up':
 			newVolume += stepUp;
 			break;
 		case 'down':
 			newVolume -= stepUp;
 			break;
 		default:
 			newVolume = argAsNum;
 			break;
 	}

 	if (newVolume > max) {
 		message.reply(`I've giv'n her all she's got captain, an' I canna give her no more.`);
 		newVolume = max;
 	}

 	if (newVolume < 0)
 		newVolume = 0;

 	this.vol = newVolume;

 	if (this.dispatcher)
 		this.dispatcher.setVolume(newVolume);
 }

function getMax(app, authorId) {
	if (app.admins.includes(authorId))
		return 2;

	return 1;
}
