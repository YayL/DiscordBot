// EMPA: Earths Military Protection Agency

module.exports = [

    [ // ---------------------------- Level: Unemployed ----------------------------
        {
            name: 'Unemployed', base_pay: 0,
            job_options: ['Gamer', 'Tutor', 'Coast Guard','Carpenter', 'Taxi Driver']
        }
    ],

    [ // ---------------------------- Level: 1 ----------------------------
        {
            name: 'Gamer', base_pay: 5,
            job_options: ['Small YouTuber', 'Garbageman', 'Assistant', 'Police']
        },

        {
            name: 'Tutor', base_pay: 45,
            job_options: ['Teaching Assistant', 'Writer', 'Assistant']
        },

        {
            name: 'Coast Guard', base_pay: 40,
            job_options: ['Marine', 'Garbageman', 'Police']
        },

        {
            name: 'Carpenter', base_pay: 50,
            job_options: ['Builder', 'Assistant']
        },

        {
            name: 'Taxi Driver', base_pay: 50,
            job_options: ['Firefighter', 'Garbageman', 'Assistant', 'Police']
        },
    ],

    [ // ---------------------------- Level: 2 ----------------------------
        {
            name: 'Garbageman', base_pay: 120,
            job_options: ['Truck Driver']
        },

        {
            name: 'Writer', base_pay: 115,
            job_options: ['Journalist', 'Novalist']
        },

        {
            name: 'Assistant', base_pay: 130,
            job_options: ['Economist', 'Clerk']
        },

        {
            name: 'Builder', base_pay: 130,
            job_options: ['Building Firm Owner', 'Engineer']
        },

        {
            name: 'Firefighter', base_pay: 140,
            job_options: ['Engineer', 'Navy']
        },

        {
            name: 'Police', base_pay: 135,
            job_options: ['Criminologist', 'Police Officer', 'Marine']
        },

        {
            name: 'Teaching Assistant', base_pay: 150,
            job_options: ['Teacher']
        },

        {
            name: 'Marine', base_pay: 150,
            job_options: ['Sergent', 'Flight Attendent', 'Navy']
        },

        {
            name: 'Small YouTuber', base_pay: 95,
            job_options: ['Known YouTuber']
        },
    ],

    [ // ---------------------------- Level: 3 ----------------------------
        {
            name: 'Navy', base_pay: 1000,
            job_options: ['Delta Seals']
        },

        {
            name: 'Journalist', base_pay: 1150,
            job_options: ['']
        },

        {
            name: 'Novalist', base_pay: 1075,
            job_options: ['Publisher']
        },

        {
            name: 'Sergent', base_pay: 1000,
            job_options: ['Navy Seals']
        },

        {
            name: 'Clerk', base_pay: 1050,
            job_options: ['Entrepreneur']
        },

        {
            name: 'Criminologist', base_pay: 1100,
            job_options: ['Investigator', 'Social Worker']
        },

        {
            name: 'Police Officer', base_pay: 1000,
            job_options: ['Police Sergent', 'Investigator']
        },

        {
            name: 'Flight Attendent', base_pay: 900,
            job_options: ['Pilot']
        },

        {
            name: 'Truck Driver', base_pay: 975,
            job_options: ['Entrepreneur']
        },

        {
            name: 'Economist', base_pay: 1100,
            job_options: ['Entrepreneur', 'Accountant']
        },

        {
            name: 'Engineer', base_pay: 1200,
            job_options: ['Entrepreneur', 'Researcher', 'Sr. Engineer']
        },

        {
            name: 'Teacher', base_pay: 1000,
            job_options: ['Principal', 'Researcher']
        },

        {
            name: 'Building Firm Owner', base_pay: 990,
            job_options: ['Entrepreneur']
        },

        {
            name: 'Known YouTuber', base_pay: 1300,
            job_options: ['Well Known YouTuber', 'E-Sport Beginner']
        },
    ],

    [ // ---------------------------- Level: 4 ----------------------------
        {
            name: 'Navy Seals', base_pay: 15000,
            job_options: ['Delta Force']
        },

        {
            name: 'Publisher', base_pay: 17500,
            job_options: ['']
        },

        {
            name: 'Sr. Engineer', base_pay: 21000,
            job_options: ['Mechanical Engineer', 'Sr. Researcher']
        },

        {
            name: 'Researcher', base_pay: 19500,
            job_options: ['Sr. Researcher', 'Professor']
        },

        {
            name: 'Investigator', base_pay: 19750,
            job_options: ['Detective']
        },

        {
            name: 'Social Worker', base_pay: 20100,
            job_options: ['Psychologist', 'Attorney']
        },

        {
            name: 'Principal', base_pay: 20000,
            job_options: ['Professor']
        },

        {
            name: 'Police Sergent', base_pay: 21000,
            job_options: ['Detective', 'Defense Attorney']
        },

        {
            name: 'Accountant', base_pay: 25000,
            job_options: ['Sr. Accountant', 'Stockbroker']
        },

        {
            name: 'Entrepreneur', base_pay: 25000,
            job_options: ['Small CEO']
        },

        {
            name: 'Well Known YouTuber', base_pay: 30000,
            job_options: ['Famous YouTuber']
        },

        {
            name: 'E-Sport Beginner', base_pay: 7500,
            job_options: ['E-Sport Pro']
        },
    ],

    [ // ---------------------------- Level: 5 ----------------------------
        {
            name: 'Delta Force', base_pay: 1.05e5,
            job_options: ['Spetsnaz']
        },

        {
            name: 'Psychologist', base_pay: 1.01e5,
            job_options: ['Nurse']
        },

        {
            name: 'Attorney', base_pay: 1.6e5,
            job_options: ['Prosecutor']
        },

        {
            name: 'Defense Attorney', base_pay: 1.625e5,
            job_options: ['Prosecutor']
        },

        {
            name: 'Detective', base_pay: 1.4e5,
            job_options: ['']
        },

        {
            name: 'Sr. Accountant', base_pay: 1.8e5,
            job_options: ['Beginner Investor']
        },

        {
            name: 'Sr. Researcher', base_pay: 1.8e5,
            job_options: ['University Professor', 'Archaeologist']
        },

        {
            name: 'Mechanical Engineer', base_pay: 1.95e5,
            job_options: ['Civil Engineer']
        },

        {
            name: 'Professor', base_pay: 1.75e5,
            job_options: ['University Professor']
        },

        {
            name: 'Small CEO', base_pay: 20000,
            job_options: ['Medium CEO']
        },

        {
            name: 'Famous YouTuber', base_pay: 2.25e5,
            job_options: ['Beginner Actor']
        },

        {
            name: 'E-Sport Pro', base_pay: 2e5,
            job_options: ['E-Sport Legend']
        },

        {
            name: 'Stockbroker', base_pay: 1.3e5,
            job_options: ['Beginner Investor']
        },
    ],

    [ // ---------------------------- Level: 6 ----------------------------
        {
            name: 'Spetsnaz', base_pay: 7.5e5,
            job_options: ['Politician', 'Spetsnaz Lieutenant']
        },

        {
            name: 'Civil Engineer', base_pay: 9e5,
            job_options: ['Aerospace Engineer']
        },

        {
            name: 'University Professor', base_pay: 9e5,
            job_options: ['Aerospace Engineer']
        },

        {
            name: 'Medium CEO', base_pay: 6.5e5,
            job_options: ['Big CEO']
        },

        {
            name: 'Beginner Actor', base_pay: 5e5,
            job_options: ['Popular Actor']
        },

        {
            name: 'E-Sport Legend', base_pay: 1e6,
            job_options: ['E-Sport Commentator']
        },

        {
            name: 'Beginner Investor', base_pay: 1e5,
            job_options: ['Medium Investor']
        },

        {
            name: 'Nurse', base_pay: 7.2e5,
            job_options: ['Doctor']
        },

        {
            name: 'Prosecutor', base_pay: 6.2e5,
            job_options: ['Judge']
        },

        {
            name: 'Archaeologist', base_pay: 5.75e5,
            job_options: ['']
        },
    ],

    [ // ---------------------------- Level: 7 ----------------------------
        {
            name: 'Politician', base_pay: 6e6, // 6m
            job_options: ['Congress Member']
        },

        {
            name: 'Aerospace Engineer', base_pay: 7.5e6, //7.5m
            job_options: ['Astronaut']
        },

        {
            name: 'Spetsnaz Lieutenant', base_pay: 5.5e6, //5.5m
            job_options: ['Spetsnaz Commander']
        },

        {
            name: 'Big CEO', base_pay: 1e7,
            job_options: ['Renound CEO']
        },

        {
            name: 'Popular Actor', base_pay: 6e6,
            job_options: ['Famous Actor']
        },

        {
            name: 'Medium Investor', base_pay: 5.8e6,
            job_options: ['Big Investor']
        },

        {
            name: 'E-Sport Commentator', base_pay: 3.2e6,
            job_options: ['E-Sport Coach']
        },
    ],

    [ // ---------------------------- Level: 8 ----------------------------
        {
            name: 'Congress Member', base_pay: 3e7,
            job_options: ['Earth Leader', 'Earth Board of Directors']
        },

        {
            name: 'Astronaut', base_pay: 4.5e7,
            job_options: ['Extrateresterial Scout']
        },

        {
            name: 'Spetsnaz Commander', base_pay: 3.5e7,
            job_options: ['EMPA Captain']
        },

        {
            name: 'Renound CEO', base_pay: 6e7,
            job_options: ['SpaceNow CEO', 'Earth Board of Directors']
        },

        {
            name: 'Famous Actor', base_pay: 4.25e7,
            job_options: ['Earth Board of Directors']
        },

        {
            name: 'E-Sport Coach', base_pay: 2.2e7,
            job_options: ['Earth Board of Directors']
        },
    ],

    [ // ---------------------------- Level: 9 ----------------------------
        {
            name: 'Extrateresterial Scout', base_pay: 1.5e8,
            job_options: ['Marsian']
        },

        {
            name: 'Earth Leader', base_pay: 1.8e8,
            job_options: ['Mars Leader']
        },

        {
            name: 'EMPA Captain', base_pay: 1.4e8,
            job_options: ['EMPA Admiral']
        },

        {
            name: 'Earth Board of Directors', base_pay: 1.8e8,
            job_options: ['Mars Board of Directors']
        },

        {
            name: 'SpaceNow CEO', base_pay: 2e8,
            job_options: ['Mars Board of Directors']
        },
    ],

    [ // ---------------------------- Level: 10 ----------------------------
        {
            name: 'Marsian', base_pay: 9e8,
            job_options: [ 'Alien Politician', 'Alien', 'Alien Lieutenant']
        },

        {
            name: 'Mars Leader', base_pay: 1e9,
            job_options: ['Alien Politician', 'Alien', 'Alien Lieutenant']
        },

        {
            name: 'EMPA Admiral', base_pay: 9.5e8,
            job_options: ['Alien Lieutenant', 'Alien', 'Alien Lieutenant']
        },

        {
            name: 'Mars Board of Directors', base_pay: 9e8,
            job_options: ['Alien Buissnessman']
        },
    ],

    [ // ---------------------------- Level: 11 ----------------------------
        {
            name: 'Alien', base_pay: 2.8e9,
            job_options: ['Alien Engineer', 'Alien Researcher']
        },

        {
            name: 'Alien Politician', base_pay: 3.2e9,
            job_options: ['Alien Congress Member']
        },

        {
            name: 'Alien Lieutenant', base_pay: 3e9,
            job_options: ['Alien General']
        },

        {
            name: 'Alien Buissnessman', base_pay: 2.2e9,
            job_options: ['Interstellar Buissnessman']
        },
    ],

    [ // ---------------------------- Level: 12 ----------------------------
        {
            name: 'Alien Engineer', base_pay: 1e10,
            job_options: ['Alien Simulations Engineer', 'Alien Computer Scientist']
        },

        {
            name: 'Alien Researcher', base_pay: 9.8e9,
            job_options: ['Alien Computer Scientist']
        },

        {
            name: 'Alien Congress Member', base_pay: 9.6e9,
            job_options: ['Alien Leader of Armada']
        },

        {
            name: 'Alien General', base_pay: 9.5e9,
            job_options: ['Alien Commander']
        },

        {
            name: 'Interstellar Buissnessman', base_pay: 9.9e9,
            job_options: ['DimensionEx CEO']
        },
    ],

    [ // ---------------------------- Level: 13 ----------------------------
        {
            name: 'Alien Simulations Engineer', base_pay: 2e10,
            job_options: ['Alien Sr. Simulations Engineer']
        },

        {
            name: 'Alien Computer Scientist', base_pay: 2.1e10,
            job_options: ['Alien Sr. Computer Scientist']
        },

        {
            name: 'Alien Leader of Armada', base_pay: 2.3e10,
            job_options: ['Alien President']
        },

        {
            name: 'Alien Commander', base_pay: 2.2e10,
            job_options: ['Alien Admiral']
        },

        {
            name: 'DimensionEx CEO', base_pay: 3.4e10,
            job_options: ['Dimension Researcher']
        },
    ],

    [ // ---------------------------- Level: 14 ----------------------------
        {
            name: 'Alien Sr. Simulations Engineer', base_pay: 5e10,
            job_options: ['Alien Simulation Overlord']
        },

        {
            name: 'Alien Sr. Computer Scientist', base_pay: 5.1e10,
            job_options: ['Alien Simulation Overlord']
        },

        {
            name: 'Alien President', base_pay: 5.05e10,
            job_options: ['Alien Emperor']
        },

        {
            name: 'Alien Admiral', base_pay: 5.2e10,
            job_options: ['Alien Chief Admiral']
        },

        {
            name: 'Dimension Researcher', base_pay: 3.4e10,
            job_options: ['Dimensional Explorer']
        },
    ],

    [ // ---------------------------- Level: 15 ----------------------------
        {
            name: 'Alien Simulation Overlord', base_pay: 8.2e10,
            job_options: ['']
        },

        {
            name: 'Alien Emperor', base_pay: 8.1e10,
            job_options: ['']
        },

        {
            name: 'Alien Chief Admiral', base_pay: 8.05e10,
            job_options: ['']
        },

        {
            name: 'Dimensional Explorer', base_pay: 5e10,
            job_options: ['Tesseractal']
        },

    ],

    [// ---------------------------- Level: 16 ----------------------------
        {
            name: 'Tesseractal', base_pay: 1.3e11,
            job_options: ['']
        }

    ]

]
