//server.js
const express = require('express');
const app = express();
const nodetest = require('./routes/nodetest');
const getFileFolderList = require('./routes/getFileFolderList');
const getFile = require('./routes/getFile');
const fileSave = require('./routes/fileSave');


const cors = require('cors');
app.use(cors()); //npm install cors --save

app.use('/nodetest', nodetest);
app.use('/getFileFolderList', getFileFolderList);
app.use('/getFile', getFile);
app.use('/fileSave', fileSave);


app.listen(3002, () => console.log('Node.js Server is running on port 3002...'));