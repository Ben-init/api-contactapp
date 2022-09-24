const { Pool } = require("pg");

const { config } = require("./../config");

const options = {};
const URI = config.dbURL;
options.connectionString = URI;

const pool = new Pool(options);

module.exports = pool;
