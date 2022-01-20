const { Pool } = require('pg');
const { host, user, password, port, database } = require('./config.js');

const db = new Pool ({
  host: host,
  user: user,
  password: password,
  port: port,
  database: database
})

module.exports = db;