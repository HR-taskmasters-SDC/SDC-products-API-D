const { Pool, Client } = require('pg')

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: "productAPI-D"
})

client.connect()
.then(() => console.log('Connected. Listening on port 5432'))
.catch(e => console.log(e))
.finally(() => client.end());