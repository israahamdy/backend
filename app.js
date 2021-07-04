const express = require('express');
const app = express();
const http = require('http');
const hostname = 'localhost';
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const postsRouter = require('./routes/postsRouter');
const usersRouter = require('./routes/usersRouter');

app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) =>{
    res.send('we are on home');
});

const url = 'mongodb://localhost:27017/RoomieApp';
const connect = mongoose.connect(url,{ useNewUrlParser: true , useUnifiedTopology: true });

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });


const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});