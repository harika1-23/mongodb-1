const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'mern_app';

async function updateData() {
    try {
        await client.connect();
        console.log('Connected to database');
        const db = client.db(dbName);
        const collection = db.collection('users');

        // Update a single record
        await collection.updateOne({ name: "John Doe" }, { $set: { role: "superadmin" } });
        console.log('Updated John Doe’s role');

        // Update multiple records (increase age by 1)
        await collection.updateMany({}, { $inc: { age: 1 } });
        console.log('Increased age for all users');

    } finally {
        await client.close();
    }
}
updateData().catch(console.dir);
