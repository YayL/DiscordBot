module.exports = [
	{
		name: 'Aliens?',
		index: 0,
		id: 'L10',
		desc: 'You have reached level 10',
		message: 'Congratulations, you are no longer restrained to this world!',
		run: (client, user) => {}
	},

	{
		name: 'Maniac',
		index: 1,
		id: 'L15',
		child: 0,
		desc: 'You have reached level 15',
		message: 'Congratulations, you have worked so hard so you are now allowed to go back'
			+ ' all the way to the beginning with a small bonus as you are the God of this new world.',
		run: (client, user) => {
			client._user.items.addItems(client, user.id, [{id: 6002, count: 1}])
		}
	},

	{
		name: 'Level 20?',
		index: 2,
		id: 'L20',
		child: 1,
		desc: 'You have reached level 20',
		message: 'Almost there, 97% left until level 50! On the other hand you have about 15x more XP than level 10.',
		run: (client, user) => {}
	},

	{
		name: 'Alright, chill!',
		index: 3,
		id: 'L30',
		child: 2,
		desc: 'You have reached level 30',
		message: 'Bruh, seriously...',
		run: (client, user) => {}
	},

	{
		name: 'Level 45',
		index: 4,
		id: 'L45',
		child: 3,
		desc: 'You have reached level 45',
		message: 'Yeah, yeah we get it you are rich..',
		run: (client, user) => {}
	},

	{
		name: 'Level 50',
		index: 5,
		id: 'L50',
		child: 4,
		desc: 'You have reached level 50',
		message: 'Seriously? This is like getting to level 45 32,766 times',
		run: (client, user) => {}
	},

	{
		name: 'A God Among Men',
		index: 6,
		id: 'L10-',
		desc: 'You got to level 10 without buying any XP',
		message: 'Holy shit, this if something is impressive. Congratulations of getting to level 10 without buying your way.',
		run: (client, user) => {
			//Gift "Hand of God"
		}
	},

	{
		name: 'Avid Rebirther',
		index: 10,
		id: 'R10',
		desc: 'You have rebirthed 10 times',
		message: 'Congratulations, what a milestone. 10 Rebirths!',
		run: (client, user) => {
			client.msg.log("DEBUG", `Avid Rebirth: 123`)
		}
	},

	{
		name: 'Rebirthing 101',
		index: 11,
		id: 'R101',
		child: 10,
		desc: 'You have rebirthed 101 times',
		message: '101 times? You good?',
		run: (client, user) => {}
	},

	{
		name: 'Rebirthing 202',
		index: 12,
		id: 'R202',
		child: 11,
		desc: 'You have rebirthed 202 times',
		message: 'A little hint. Try going above level 100 for a nice suprise ;)',
		run: (client, user) => {}
	},

	{
		name: 'Create a Gang',
		index: 13,
		id: 'GC',
		desc: 'You have successfully created a gang',
		message: 'Great work, you are now the leader of your very own Gang!',
		run: (client, user) => {}
	},



]
