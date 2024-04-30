const exp = require('express');
const app = exp();
require('dotenv').config();
const cors = require('cors');
const mongoClient = require('mongodb').MongoClient;

// app.use(cors(
//   {
//     origin: ["*"],
//     methods: ["POST", "GET", "PUT", "DELETE"],
//     credentials: true
//   }
// ));

const path = require('path');
app.use(exp.static(path.join(__dirname, '../client/dist')));


mongoClient.connect(process.env.DB_URL)
  .then(client => {
    const toolsgo = client.db('toolsgo');
    // usersCollection
    const usersCollection = toolsgo.collection('usersCollection');
    app.set('usersCollection', usersCollection);
    // toolsCollection
    const toolsCollection = toolsgo.collection('toolsCollection');
    app.set('toolsCollection', toolsCollection);
    console.log('DB connected successfully...');
  })
  .catch(err => console.log('Error in DB connection'))


app.use(exp.json())
const userApp = require('./APIs/user-api');
const toolApp = require('./APIs/tools-api');

app.use('/user-api', userApp);
app.use('/tools-api', toolApp);


app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})


app.use((err, req, res, next) => {
  res.send({ message: 'error', payload: err.message });
})


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`http server started on ${port}...`));