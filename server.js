require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');
// Cors 
app.use(cors())
app.use(express.static('public'));

const connectDB = require('./config/db');
connectDB();
const {deleteData} = require('./script');


app.use(express.json());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes 
app.use('/api/files', require('./routes/files'));
app.use('/files',deleteData, require('./routes/show'));
app.use('/files/download', require('./routes/download'));

app.get('/data', (req,res)=>{
    res.render(path.join(__dirname, 'views/data.ejs'));
})
app.get('/', (req,res)=>{
    res.status(301).redirect("https://temp-share.netlify.app/");
})
app.get('/e7fdbca8c7df3e6f696692d66e83ac13.txt', (req,res)=>{
    res.status(301).send("./e7fdbca8c7df3e6f696692d66e83ac13.txt");
})


app.listen(PORT, console.log(`Listening on port ${PORT}.`));
