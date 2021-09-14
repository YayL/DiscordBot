module.exports = {

	// Bot settings
	ADMIN_COMMANDS: true, // If AdminCommands should be loaded
	MAX_RANKS: 2, // Does not include member or everyone. If user is in adminlist this number does not affect them.
	MAJORITY_RATE: 1/2, // Voting amount required to be counted as "majority"

	LOG_TO_DISCORD: false,
  	LOG_TO_FILE: true,
  	LOG_TO_FILE_ANSI: true, // Use ANSI colors in log file. Will display weird in text editors, so read with a pager
  	LOGGING_LEVEL: 0, // Levels: 0 Trace, 1 Debug, 2 Info, 3 Warning, 4 Error, 5 Fatal

	EMOJIS: ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸'],
	LR_EMOJIS: ['⬅️', '➡️'],

    // User
	MAX_RANKS: 2,

	// Leaderboard
	LB_MONEY_MIN: 50, // Leaderboard minimum money required to be displayed
	LB_LEVEL_MIN: 1, // Leaderboard minimum level required to be displayed
	LB_SIZE: 10, // Amount of users displayed on lb

	// Gangs
	MIN_CREATE_LEVEL: 8, // Minimum level required to create a gang

	GANG_INFO_TEMPLATE: {
	    SETTINGS: {
	        INVITE_ONLY: false,
	    },
	    INVITE_LIST: [],
	    NAME: '',
	},


	// Limits
	MAX_MONEY: 9.9e29, // Max money possible,
	MAX_XP: 9223372036854775000, // Max XP possible
	maxLevel: 56,

	// Timers
	TOTAL_LB_TIME: 2.5*60*1000, // Update leaderboard every 5 mins
	DATABASE_CLEANING_TIMER: 10*60*1000, // Clean Database every 10 minutes
	MARKET_CLEANING_TIMER: 5*60*1000 // Clean market every 5 mins

	
}
