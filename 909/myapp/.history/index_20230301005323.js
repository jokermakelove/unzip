const express = require('express');
const MongoClient = require('mongodb').MongoClient;

// Khởi tạo server Express
const app = express();

// Định nghĩa route API
app.get('/api/users', async (req, res) => {
  try {
    // Khởi tạo kết nối tới MongoDB
    const client = await MongoClient.connect('mongodb+srv://namanhhd4:WG6uDHweZMbKDBRi@cluster0.e1zwvzv.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db('mydatabase');
    const collection = db.collection('mycollection');

    // Lấy bản ghi đầu tiên trong collection
    const doc = await collection.findOne({});

    // Xóa bản ghi vừa lấy
    if (doc) {
      await collection.deleteOne({ _id: doc._id });
    }

    // Gửi dữ liệu về client
    res.send(doc);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Khởi động server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});