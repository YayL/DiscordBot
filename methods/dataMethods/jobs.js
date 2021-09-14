const s = require('../../info/settings.js');

module.exports = {

	nextLvlXp(lvl, calculate=false){
		if(!calculate && lvl > s.MAX_LEVEL && lvl % s.MAX_LEVEL !== 0) 
			return "Max";
		return 100 * Math.pow(2, lvl - 1);
	},

	totalLvlXp(lvl, calculate=false){
		if(!calculate && lvl > s.MAX_LEVEL && lvl % s.MAX_LEVEL !== 0) 
			return this.totalLvlXp(s.MAX_LEVEL, true);
		return 100 * Math.pow(2, lvl - 1) - 100;
	},

	xpToLevel(xp, calculate=false){
		const lvl = Math.floor(Math.log(1 + (xp / 100)) / Math.log(2));
		if (!calculate && lvl > s.MAX_LEVEL && lvl % s.MAX_LEVEL !== 0) return "Max";
		return lvl + 1;
	}
}