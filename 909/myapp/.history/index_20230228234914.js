const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.get('/api/users', async (req, res) => {
  try {
    // Kết nối tới MongoDB
    const client = await MongoClient.connect('mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority', { useUnifiedTopology: true });
    const db = client.db('<database-name>');
    const collection = db.collection('<collection-name>');

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

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
