const fs = require('fs');

module.exports = (client, disc) => {
	const loadEvent = (dir) => {
		const eventFile = fs.readdirSync(`./events/${dir}`).filter(file => file.endsWith('.js'));

		for(const file of eventFile){
			const event = require(`../events/${dir}/${file}`);

			if(dir == 'client' || dir == 'guild'){
				client.on(file.split('.')[0], event.bind(null, client, disc));
			}else{
				client.eventEm.on(file.split('.')[0], event.bind(null, client, disc));
			}
		}
	}

	['client', 'guild', 'errors', 'userEvents', 'serverEvents', 'warnings', 'gangWarnings', 'gangEvents'].forEach(e => loadEvent(e));
	client.msg.log("INFO", `Finished loading all Events!`);
}
