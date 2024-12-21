const { Client } = require('pg');
const client = new Client({
	host: 'localhost',
	user: 'postgres',
	port: 5432,
	password: '5555',
	database: 'routes',
});

client
	.connect()
	.then(() => console.log('connected to db.'))
	.catch((err) => console.log('err while connecting to db.'));

module.exports = client;
