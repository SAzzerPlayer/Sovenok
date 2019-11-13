
const { Pool,Client } = require('pg')
const pool = new Client(
    {connectionString:"postgres://postgres:gorod111@localhost:5432/sovenok"}
);
pool.connect();

pool.end();
//export default DB;