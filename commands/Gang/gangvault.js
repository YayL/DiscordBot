module.exports = {
    name: "GangVault",
    alias: ['gvault'],
    use: '-GangVault' +
        '-GangVault withdraw [item_id] [amount]\n' +
        '-GangVault store [item_id] [amount]',
    description: "Store and deposit items in the gang vault",
    options: { ShowInHelp: true, Category: "Gang" },
    run: async function(client, msg, args, discord) {
        try {

            const gang = await client.gang.user.getGang(client, msg.author.id);

            if (gang == null)
                return client.eventEm.emit('notInAGang', msg);

            console.log(gang);

            if (args.length == 0)
                return showItems(client, msg, gang, args, discord);

            const item = await client.data.items.getItem(client, Number(args[1])),
                amount = args.length <= 2 ? 1 : (Number(args[2]) > 0 ? Number(args[2]) : 1);

            if (new RegExp(args[0].toLowerCase()).test('withdraw')) {
                if (await withdrawItems(client, msg, args, gang, item, amount))
                    client.eventEm.emit('GangVaultWithdraw', msg, gang, item, amount);
                    
            } else if (new RegExp(args[0].toLowerCase()).test('store')) {

                let vaultCount = client.gang.vault.countVault(gang),
                    vaultSize = Number(client.gang.info.getGangUpgrade(client, gang, 'Vault'));

                if (vaultCount >= vaultSize)
                    return client.eventEm.emit('MaxVaultStorage', msg, gang);

                if (await storeItems(client, msg, args, gang, item, (vaultSize < (amount + vaultCount) ? vaultSize - vaultCount : amount)))
                    client.eventEm.emit('GangVaultStored', msg, gang, item, amount);
            } else {
                client.eventEm.emit('InvalidArgs', msg, this.use);
            }

        } catch (e) {
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
    }
}

async function withdrawItems(client, msg, args, gang, item, amount) {
    try {

        if (!client.gang.vault.hasItem(gang, item.id, amount))
            return client.eventEm.emit('GangNotEnoughItems', msg, amount, item.name);

        client.gang.vault.delItems(client, gang, [{ id: item.id, count: amount }]);
        client._user.items.addItems(client, msg.author.id, [{ id: item.id, count: amount }]);

        return true;
    } catch (e) {
        client.eventEm.emit('CommandError', msg, 'GangVault', args, e)
    }
}


async function storeItems(client, msg, args, gang, item, amount) {
    try {

        if (!await client._user.items.hasItem(await client._user.items.getInventory(client, msg.author.id), item.id, amount)) {
            client.eventEm.emit('NotEnoughItems', msg, amount, item.name);
            return false;
        }

        client.gang.vault.addItems(client, gang, [{ id: item.id, count: amount }]);
        client._user.items.delItems(client, msg.author.id, [{ id: item.id, count: amount }]);

        return true;
    } catch (e) {
        client.eventEm.emit('CommandError', msg, 'GangVault', args, e)
    }
}

async function showItems(client, msg, gang, args, discord) {
    try {

        const embed = new discord.MessageEmbed()
            .setTitle(`${gang.info.NAME}'s Vault`)
            .setColor('#4287f5');

        let text = '',
            item,
            amount_of_items = 0;

        if (gang.vault == null || Object.keys(gang.vault).length == 0) {
            embed.setDescription(`**EMPTY VAULT**\n\u200b\n0/${client.gang.info.getGangUpgrade(client, gang, 'Vault')}`)
            return msg.channel.send(embed);
        }

        for (let i = 0; i < Object.keys(gang.vault).length; i++) {

            item = await client.data.items.getItem(client, Object.keys(gang.vault)[i]);
            amount_of_items += gang.vault[item.id].count;

            text += `*(ID:${item.id})* ***${item.name}*** ${gang.vault[item.id].count}x | **__${item.tier.charAt(0).toUpperCase() + item.tier.slice(1)}__**\n`;
        }

        embed.setDescription(text + `\n\u200b\n${amount_of_items}/${client.gang.info.getGangUpgrade(client, gang, 'Vault')}`);

        msg.channel.send(embed);

    } catch (e) {
        client.eventEm.emit('CommandError', msg, 'GangVault', args, e)
    }
}