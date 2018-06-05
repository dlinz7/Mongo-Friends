const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const server = express();

const friendController = require('./friends/friendController');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', friendController);

const port = process.env.PORT || 5000;



mongoose.Promise = global.Promise; //configure the mongoose promise system to use Native JS Promises
mongoose.connect('mongodb://localhost/dbFriends', {}, err =>{
//declare where we're going to connect this is the equivalent of using 'use dbFriends' in the mongo shell
if (err) console.log("Database connection failed");
console.log('Successfully Connected to MongoDB');
});













server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
