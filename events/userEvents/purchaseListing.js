module.exports = async (client, disc, msg, listing_id, buyer_id) => {
	client.con.query(`SELECT * FROM market WHERE id = ${listing_id}`, async (e, {rows}) => {
		if(rows.length == 0) 
			return;

		if(rows[0].user == buyer_id) 
			return client.eventEm.emit('ownerBuyer', msg);

		if(!await client._user.bal.enoughMoney(client, msg.member.id, rows[0].price)) 
			return client.eventEm.emit('notEnoughMoney', msg);

		client._user.items.addItems(client, buyer_id, [{id: rows[0].item_id, count: rows[0].amount}]);
		client._user.bal.addBalance(client, buyer_id, -1*rows[0].price);
		client._user.bal.addBalance(client, rows[0].userid, rows[0].price);

		client.con.query(`DELETE FROM market WHERE id = ${listing_id}`);

		const embed = new disc.MessageEmbed()
			.setTitle(`You bought ${(await client.utils.getMember(rows[0].userid, msg)).displayName}'s Listing`)
			.setDescription(`Acquiry: **${client.utils.fixNumber(rows[0].amount)} ${client.data.items.getItem(client, rows[0].item_id).name}s**
				Price: **${client.utils.fixNumber(rows[0].price, true)}**`)
			.setColor('#3fd161');
			
		msg.channel.send(embed);
	});
}