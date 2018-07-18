const config = require('config');

const url =  config.get('Customer.dbConfig.local');

const { MongoClient } = require('mongodb');

let connection;

async function createConnection() {
 
    if ( connection ) {
        return connection
        console.log('connection')
    }
    connection = await MongoClient.connect(url);
    console.log('does not connection')   
    return connection;
}

module.exports = createConnection;