import Sequelize from 'sequelize';

const express = require("express");

var sequelize = new Sequelize('wars_1823_2003', 'student', 'INST377@UMD',{
    host: '3.236.243.212',
    dialect: 'mysql'
});

const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile('index.html')
});

app.get('/locations', function(req, res){ 

})

app.listen(PORT)
console.log('Server started at port: ' + PORT);
