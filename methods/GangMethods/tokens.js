module.exports = {

    addTokens(client, gang, amount) {

        if(gang.tokens + amount < 0)
            amount = -gang.tokens
        
        client.con.query(`UPDATE gangs SET tokens = tokens + ${amount} WHERE name = '${gang.name}'`)

    },

    hasEnoughTokens(gang_tokens, amount){
        return gang_tokens >= amount
    },

    calculateTokenGift(level){
        return Math.floor((3 * Math.sqrt(level)) / (Math.log(100) / Math.log(10)) )
    },

    calculateTokenCost(level){
        return level+1;
    }

}