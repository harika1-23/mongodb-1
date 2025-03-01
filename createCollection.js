const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'mern_app';

async function run() {
    try {
        await client.connect();
        console.log('Connected to database');
        const db = client.db(dbName);
        const collection = db.collection('users');
        await collection.insertMany([
            { name: 'John Doe', email: 'john@example.com', age: 30, role: 'admin' },
            { name: 'Jane Smith', email: 'jane@example.com', age: 25, role: 'user' }
        ]);
        console.log('Collection created and data inserted');
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
