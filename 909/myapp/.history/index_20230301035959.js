const { MongoClient } = require("mongodb");
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */
const filter = {};
const client = await MongoClient.connect(
  'mongodb+srv://namanhhd4:WG6uDHweZMbKDBRi@cluster0.e1zwvzv.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const coll = client.db('database_name').collection('collection_name');
const cursor = coll.find(filter);
const result = await cursor.toArray();
await client.close();