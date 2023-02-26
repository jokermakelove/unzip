const express = require('express');
const MongoClient = require('mongodb').MongoClient;

// Khởi tạo ứng dụng Express
const app = express();
const port = 3000;

// Kết nối tới MongoDB và lấy dữ liệu từ collection
app.get('/api/data', async (req, res) => {
  try {
    // Kết nối tới MongoDB
    const client = await MongoClient.connect('mongodb+srv://namanhhd4:WG6uDHweZMbKDBRi@cluster0.e1zwvzv.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db('mydb');
    const collection = db.collection('mycollection');

    // Lấy dữ liệu từ collection và trả về qua API
    const data = await collection.find({}).toArray();
    res.json(data);

    // Xóa bản ghi vừa lấy
    if (data.length > 0) {
      await collection.deleteOne({ _id: data[0]._id });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    // Đóng kết nối tới MongoDB
    client.close();
  }
});

// Khởi động ứng dụng
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});const express = require('express');
const MongoClient = require('mongodb').MongoClient;

// Khởi tạo ứng dụng Express
const app = express();
const port = 3000;

// Kết nối tới MongoDB và lấy dữ liệu từ collection
app.get('/api/data', async (req, res) => {
  try {
    // Kết nối tới MongoDB
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('mydb');
    const collection = db.collection('mycollection');

    // Lấy dữ liệu từ collection và trả về qua API
    const data = await collection.find({}).toArray();
    res.json(data);

    // Xóa bản ghi vừa lấy
    if (data.length > 0) {
      await collection.deleteOne({ _id: data[0]._id });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    // Đóng kết nối tới MongoDB
    client.close();
  }
});

// Khởi động ứng dụng
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});