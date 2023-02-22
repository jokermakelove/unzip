const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://namanhhd4:WG6uDHweZMbKDBRi@cluster0.e1zwvzv.mongodb.net/?retryWrites=true&w=majority';
const dbName = '1';

app.get('/', function(req, res) {
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;

    const db = client.db(dbName);

    db.collection('res').find({}).toArray(function(err, result) {
      if (err) throw err;

      const data = JSON.stringify(result);

      const html = `
        <html>
          <head>
            <title>My Data Table</title>
          </head>
          <body>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                ${result.map(row => `<tr><td>${row.id}</td><td>${row.name}</td><td>${row.email}</td></tr>`).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `;

      res.send(html);
    });
  });
});

app.listen(3000, function() {
  console.log('App listening on port 3000!');
});
