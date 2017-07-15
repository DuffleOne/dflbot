const acceptedKeyWords = ['up', 'down', 'max'];

export default async function volume(ctx) {
	const { message, args } = ctx;
	const arg = args.toLowerCase();

	let newVolume = this.vol;

	if (!arg) return;

	const argAsNum = parseInt(arg, 10) / 100;

	if (!acceptedKeyWords.includes(arg) && !argAsNum) {
		message.reply(`I don't understand sorry. use !volume <up|down|max|number>`);
		return;
	}

 	switch (arg) {
 		case 'max':
 			newVolume = 1;
 			break;
 		case 'up':
 			newVolume += 0.1;
 			break;
 		case 'down':
 			newVolume -= 0.1;
 			break;
 		default:
 			newVolume = argAsNum;
 			break;
 	}

 	if (newVolume > 1) {
 		message.reply(`I've giv'n her all she's got captain, an' I canna give her no more.`);
 		newVolume = 1;
 	}

 	if (newVolume < 0)
 		newVolume = 0;

 	this.vol = newVolume;

 	if (this.dispatcher)
 		this.dispatcher.setVolume(newVolume);
 }
