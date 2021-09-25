async function setBalance(user_id, amount, client) {
    try {
        if (amount > client.s.MAX_MONEY)
            amount = client.s.MAX_MONEY;

        if (amount < -client.s.MAX_MONEY)
            amount = -client.s.MAX_MONEY;

        client.con.query(`UPDATE users SET bal = ${amount} WHERE id = '${user_id}'`);
    } catch (e) {
        client.msg.log("ERR", e, client.guild);
    }
}

module.exports = {
    addBalance(client, user_id, amount, set = false) {
        try {
            if (user_id == undefined)
                return;

            amount = client.utils.suffixCheck(amount.toString(), true)

            if (!amount) // An issue might arries. Add && amount != 0 if so
                return;

            if (!set) {
                if (amount == 0)
                    return;
                this.getBalance(client, user_id)
                    .then(a => {
                        setBalance(user_id, Number(a) + amount, client);
                    });
            } else {
                setBalance(user_id, amount, client);
            }
        } catch (e) {
            client.msg.log("ERR", e, client.guild);
        }
    },

    async getBalance(client, user_id) {
        return new Promise(async(resolve) => {
            resolve((await client._user.get(client, user_id)).bal);
        });
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