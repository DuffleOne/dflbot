export default async function whoami(ctx) {
	const { message } = ctx;
	const author = message.author;
	const name = author.username;
	const isAdmin = this.admins.includes(author.id);

	let rplyMsg = `Hello, you are ${name}!`;

	if (isAdmin)
		rplyMsg += ` You are an admin.`;

	message.reply(rplyMsg);
}
