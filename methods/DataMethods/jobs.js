const s = require('../../info/settings.js');

module.exports = {

    // Experience required to go from the current level to the next level
    nextLevelExp(level, calculate=false){
        if(!calculate && level > s.MAX_LEVEL && level % s.MAX_LEVEL !== 0) 
            return "Max";
            
        return 100 * (2 **(level - 1));
    },

    // Total experience required for the current level
    totalLevelExp(level, calculate=false){
        if(!calculate && level > s.MAX_LEVEL && level % s.MAX_LEVEL !== 0) 
            return this.totallevelXp(s.MAX_LEVEL, true);

        return 100 * (2 ** (level - 1)) - 100;
    },

    // FInd the level that is equivelent to the current epxerience of a user
    expToLevel(exp, calculate=false){
        const level = ~~(Math.log(1 + (exp / 100)) / Math.log(2));

        if (!calculate && level > s.MAX_LEVEL && level % s.MAX_LEVEL !== 0) 
            return "Max";

        return level + 1;
    }
}