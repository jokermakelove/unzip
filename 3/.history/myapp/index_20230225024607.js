// Import các module cần thiết
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

// Khởi tạo server Express
const app = express();

// Định nghĩa route API
app.get('/api/users', async (req, res) => {
  try {
    // Khởi tạo kết nối tới MongoDB
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('mydb');
    const collection = db.collection('mycollection');

    // Lấy tất cả bản ghi trong collection
    const docs = await collection.find({}).toArray();

    // Xóa bản ghi vừa lấy
    if (docs.length > 0) {
      await collection.deleteOne({ _id: docs[0]._id });
    }

    // Lọc trùng bản ghi dựa trên trường email
    const uniqueDocs = [];
    const uniqueEmails = new Set();

    for (const doc of docs) {
      if (!uniqueEmails.has(doc.email)) {
        uniqueEmails.add(doc.email);
        uniqueDocs.push(doc);
      }
    }

    // Gửi dữ liệu về client dưới dạng bảng
    const tableRows = uniqueDocs.map(doc => `
      <tr>
        <td>${doc.name}</td>
        <td>${doc.email}</td>
        <td>${doc.age}</td>
      </tr>
    `);

    const tableHtml = `
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows.join('')}
        </tbody>
      </table>
    `;

    res.send(tableHtml);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Khởi động server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
