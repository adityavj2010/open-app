// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'openapp',
});

export async function clearDB() {
  return new Promise((resolve, reject) => {
    try {
      connection.query(`DROP DATABASE openapp`, () => {
        connection.query(`CREATE DATABASE openapp`, () => {
          return resolve(true);
        });
      });
    } catch (e) {
      console.error('Issue in clear DB');
      resolve(true);
    }
  });
}
