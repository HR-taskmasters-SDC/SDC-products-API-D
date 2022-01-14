const { Pool } = require('pg')
const db = new Pool({
  host: 'localhost',
  user: 'jojo',
  password: 'jojo',
  port: 5432,
  database: "productapi_d"
})

db.connect()
.then(() => console.log('Database connected. Listening on port 5432'))
.catch(e => console.log(e));

module.exports = db;