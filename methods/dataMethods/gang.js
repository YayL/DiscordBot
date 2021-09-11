

module.exports = {

	// Inventory is a JSON list of ids

	getGang(client, name){
		return new Promise(resolve => {
                client.con.query(`SELECT * FROM gangs WHERE name = '${name}'`, (e, {rows}) => {
                    try{
                        if(rows.length == 0) {
                            return resolve(null);
                        }

                        if(e){
                            client.msg.log(client.guild, e);
                            resolve(null);
                        }
                        resolve(rows[0]);

                    }catch(e){
                        client.msg.log(client.guild, e);
                        resolve(null);
                    }
                        
                })
        }).catch(e => {
            client.msg.log(client.guild, e);
        })
	},

    saveInfo(client, name, info){
        client.con.query(`UPDATE gangs SET info = '${JSON.stringify(info)}' WHERE name = '${name}'`);
    },

    isInviteOnly(client, settings){
        return settings['INVITE_ONLY'] == true;
    },

    isInvited(client, info, user_id){
        return info['INVITE_LIST'].includes(user_id);
    },

    addToInviteList(client, gang, user_id){
        var info = gang.info;
        info['INVITE_LIST'].push(user_id);
        client.con.query(`UPDATE gangs SET info = '${JSON.stringify(info)}' WHERE name = '${gang.name}'`);
    },

    remFromInviteList(client, gang, user_id){
        var info = gang.info;
        info['INVITE_LIST'].splice(info['INVITE_LIST'].indexOf(user_id), 1);
        client.con.query(`UPDATE gangs SET info = '${JSON.stringify(info)}' WHERE name = '${gang.name}'`);
    },

    getAllGangs(client){
        return new Promise(resolve => {
                client.con.query(`SELECT * FROM gangs`, (e, {rows}) => {
                    try{
                        if(rows.length==0) {
                            return resolve(null);
                        }

                        if(e){
                            client.msg.log(client.guild, e);
                            return resolve(null);
                        }

                        return resolve(rows); 
                    }catch(e){
                        client.msg.log(client.guild, e);
                        resolve(null);
                    }  
                })
        }).catch(e => {
            client.msg.log(client.guild, e);
        })
    },

	isGang: async(client, name, override=false) => {
        if(override != false) 
            return override != null;

		return await client._user.gang.getGang(client, name) != null;
	},

    isOwner: async(client, user_id) => {
        return (await client._user.gang.getGang(client, user_id)).owner == user_id;
    },

	createNewGang(client, NAME, CREATOR_ID){
        var GANG_INFO_TEMPLATE = client.s.GANG_INFO_TEMPLATE;
        GANG_INFO_TEMPLATE.NAME = NAME;
        
		client.con.query(`INSERT INTO gangs (name, owner, members, info) VALUES ('${NAME.toLowerCase()}', '${CREATOR_ID}', '${JSON.stringify([CREATOR_ID])}', '${JSON.stringify(GANG_INFO_TEMPLATE)}')`);
	}
}