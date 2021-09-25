// Postgres
const pg = require("pg");

// Credentials
const pass = require("./passwords.json");

let pool = new pg.Pool({
    user: pass.dbUser,
    host: pass.dbHost,
    database: pass.dbName,
    password: pass.dbPass,
    port: pass.dbPort,
});

pool.connect((e, client) => {
    if (e) return console.error(e.stack);
    console.log("Connected");

    // Create all needed tables
    client.query("CREATE TABLE users(key SERIAL PRIMARY KEY, id VARCHAR(22) NOT NULL , bal DECIMAL(30,0) DEFAULT 0, job_name VARCHAR(40) NOT NULL DEFAULT 'Unemployed', job_xp BIGINT NOT NULL DEFAULT 0, rebirths INT NOT NULL DEFAULT 0, inventory JSON, achivements JSON, gang VARCHAR(30))", (e) => { if (e) return console.error(e.stack) });
    client.query("CREATE TABLE market(id SERIAL PRIMARY KEY, userid VARCHAR(22) NOT NULL, item_id SMALLINT NOT NULL, amount INT NOT NULL, tier VARCHAR(20) NOT NULL, deadline BIGINT NOT NULL, price DECIMAL(30,0) NOT NULL)", (e) => { if (e) return console.error(e.stack) });
    client.query("CREATE TABLE rules(id INT NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL, description TEXT NOT NULL, corelaw SMALLINT NOT NULL, date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);", (e) => { if (e) return console.error(e.stack) });
    client.query("CREATE TABLE gangs(name VARCHAR(30) NOT NULL PRIMARY KEY, owner VARCHAR(22) NOT NULL, members JSON, info JSON, vault JSON, bank DECIMAL(30,0) DEFAULT 0, xp BIGINT DEFAULT 0, tokens INT DEFAULT 0);", (e) => { if (e) return console.error(e.stack) });
    pool.disconnect();
});