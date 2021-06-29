const lookup_table = ['common', 'uncommon', 'rare', 'epic', 'exotic', 'legendary']
const color_table = ['#6e6968', '#38a32c', '#275eb8', '#823ab5', '#ff8903', '#d4af37']

const max_lootboxes = 100

const costCalculate = (tier) => Math.pow(10, 3*(lookup_table.indexOf(tier)+1)+2)

module.exports = {
	name: "Lootbox",
	alias: ["loot"],
	use: "-Lootbox [tier] [amount]",
	description: "Open lootboxes for certain awards",
	options: {ShowInHelp: true, Category: "Items"},
	run: async function(msg, client, disc, args){
		try{
			const tier = args[0].toLowerCase();

			if(!lookup_table.includes(tier)){
				return client.eventEm.emit('unknownTier', msg, lookup_table)
			}

			if(args.length < 2) return client.eventEm.emit('openLootBox', msg, tier, '', true, color_table[lookup_table.indexOf(tier)], costCalculate(tier))


			const amount = args.length >= 1 ? (0 < Number(args[1]) ? (Number(args[1]) < max_lootboxes ? Number(args[1]) : max_lootboxes) : 1)  : 1;
			const cost = costCalculate(tier)*amount
			if(!await client.data.bal.enoughMoney(client, msg, msg.member, cost)) return

			await client.data.user.addBalance(client, msg.author, -1*cost, 'add')

			var obj_list = []

			for(var count = 0; count < amount; count++){
				client.eventEm.emit('openLootBox', msg, tier, obj_list)
			}
			sendRewardMessage(client, disc, msg, tier, cost, obj_list)
			client.data.user.addItems(client, msg.author, obj_list);

		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e)
		}
		
	}
}

function sendRewardMessage(client, disc, msg, tier, cost, obj_list){

	var text = '';
	obj_list = client.data.items.sortItems(obj_list, true)
	for(obj of obj_list){
		text += `x${obj.count} ${obj.name}: ${obj.rarity}% - ${obj.obj.tier}\n`
	}

	const embed = new disc.MessageEmbed()
	    .setTitle(`${msg.author.username}'s ${tier} lootbox:`)
	    .setDescription(text)
	    .setColor(color_table[lookup_table.indexOf(tier)])
	    .setFooter(`Price: $${client.utils.numberWithCommas(cost, true)} | Keep going! You'll find something awesome!`);

	msg.channel.send(embed);

}
