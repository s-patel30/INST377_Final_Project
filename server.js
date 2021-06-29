import Sequelize from 'sequelize';

const express = require("express");

var sequelize = new Sequelize('wars_1823_2003', 'student', 'INST377@UMD',{
    host: '3.236.243.212',
    dialect: 'mysql'
});

var Locations = sequelize.define(
    'locations',
    {
    location_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    location_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
    },
    { timestamps: false }
);



const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile('index.html');
});

app.get('/locations', function(req, res){ 
    var locs = Locations.findAll();
    res.json(locs);
})

app.listen(PORT)
console.log('Server started at port: ' + PORT);
