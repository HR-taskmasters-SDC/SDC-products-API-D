const { Pool } = require('pg')
const db = new Pool ({
  host: 'localhost',
  user: 'jojo',
  password: 'jojo',
  port: 5432,
  database: "productapi_d"
})

module.exports = db;