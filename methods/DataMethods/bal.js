module.exports = {

    updateTotalMoney(client){
        try{

            const users = client.userCache;

            if(users.length === 0) 
                return client.totalMoney = 1;

            let money = 0

            for(let user of Object.values(users)){
                if(user.bank > 0)
                    money += Number(user.bank);
            }
                
            client.totalMoney = money != 0 ? money : 1;

        }catch(e){
            client.msg.log("ERR", e, client.guild);
        }

    },
}
