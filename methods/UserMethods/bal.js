async function setBalance(client, user_id, amount) {
    try {
        if (amount > client.s.MAX_MONEY)
            amount = client.s.MAX_MONEY;

        if (amount < -client.s.MAX_MONEY)
            amount = -client.s.MAX_MONEY;

        client._user.set(client, user_id, 'bank', amount);

    } catch (e) {
        client.msg.log("ERR", e, client.guild);
    }
}

module.exports = {
    async addBalance(client, user_id, amount, set = false) {
        try {
            if (user_id == undefined)
                return;

            amount = client.utils.suffixCheck(amount.toString(), true)

            if (!amount) // An issue might arries. Add && amount != 0 if so
                return;

            setBalance(client, user_id, Number(!set) * Number(await client._user.bal.getBalance(client, user_id)) + Number(amount))

        } catch (e) {
            client.msg.log("ERR", e, client.guild);
        }
    },

    async getBalance(client, user_id) {
            return (await client._user.get(client, user_id)).bank
    },

    async enoughMoney(client, msg, amount) {
        try {
            const balance = Number(await client._user.bal.getBalance(client, msg.author.id));

            if (balance < amount) {
                client.eventEm.emit('NotEnoughMoney', msg, (amount - balance));
                return false;
            }
            return true;
        } catch (e) {
            client.msg.log("ERR", e, client.guild);
        }

    }
}