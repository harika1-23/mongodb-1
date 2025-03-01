const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'mern_app';

async function fetchData() {
    try {
        await client.connect();
        console.log('Connected to database');
        const db = client.db(dbName);
        const collection = db.collection('users');

        // Fetch all records
        const users = await collection.find().toArray();
        console.log('All Users:', users);

        // Fetch users with age > 25
        const filteredUsers = await collection.find({ age: { $gt: 25 } }).toArray();
        console.log('Filtered Users:', filteredUsers);

        // Fetch only name and email
        const projection = await collection.find({}, { projection: { name: 1, email: 1, _id: 0 } }).toArray();
        console.log('Projected Data:', projection);

        // Sort by age descending
        const sortedUsers = await collection.find().sort({ age: -1 }).toArray();
        console.log('Sorted Users:', sortedUsers);

        // Pagination (skip 2, limit 3)
        const paginatedUsers = await collection.find().skip(2).limit(3).toArray();
        console.log('Paginated Users:', paginatedUsers);

    } finally {
        await client.close();
    }
}
fetchData().catch(console.dir);
