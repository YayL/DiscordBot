const fs = require('fs');

module.exports = (client, disc) => {
	const loadEvent = (dir) => {
		const eventFile = fs.readdirSync(`./events/${dir}`).filter(file => file.endsWith('.js'));

		for(const file of eventFile){
			const event = require(`../events/${dir}/${file}`);
			if(dir == 'custom'){
				client.eventEm.on(file.split('.')[0], event.bind(null, client, disc));
			}else{
				client.on(file.split('.')[0], event.bind(null, client, disc));
			}
		}
	}

	['client', 'guild', 'custom'].forEach(e => loadEvent(e));
}