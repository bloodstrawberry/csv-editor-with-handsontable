//server.js

const express = require('express');
const app = express();
const nodetest = require('./routes/nodetest');
const getFileFolderList = require('./routes/getFileFolderList');

const cors = require('cors');
app.use(cors()); 

app.use('/nodetest', nodetest);
app.use('/getFileFolderList', getFileFolderList);

app.listen(3002, () => console.log('Node.js Server is running on port 3002...'));