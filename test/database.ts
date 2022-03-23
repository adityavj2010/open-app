// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('../ormconfig.json');
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'openapp',
});

export async function clearDB() {
  return new Promise((resolve, reject) => {
    connection.query(`DROP DATABASE ${db.database}`, () => {
      connection.query(`CREATE DATABASE ${db.database}`, () => {
        return resolve(true);
      });
    });
  });
}
