const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'mern_app';

async function deleteData() {
    try {
        await client.connect();
        console.log('Connected to database');
        const db = client.db(dbName);
        const collection = db.collection('users');

        // Delete a single record
        await collection.deleteOne({ name: "Jane Smith" });
        console.log('Deleted Jane Smith');

        // Delete multiple records (users with age > 50)
        await collection.deleteMany({ age: { $gt: 50 } });
        console.log('Deleted users with age > 50');

        // Drop the collection
        await collection.drop();
        console.log('Dropped users collection');

    } finally {
        await client.close();
    }
}
deleteData().catch(console.dir);
