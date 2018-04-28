const config = require('config');

const url =  config.get('Customer.dbConfig.url');

const { MongoClient } = require('mongodb');

let connection;

async function createConnection() {
 
           
    return await MongoClient.connect(url);
}

module.exports = createConnection;