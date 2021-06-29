module.exports = (client, disc, msg) => {
    client.msg.reply(msg,`The amount specified is not a valid amount.`, 'Only values equal to 1 or more are valid',
		 disc);
}
