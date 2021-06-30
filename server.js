import Sequelize from 'sequelize';

import Express from 'express';

var sequelize = new Sequelize('wars_1823_2003', 'student', 'INST377@UMD',{
    host: 'localhost',
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



const app = Express();

const PORT = 3000;

app.use(Express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile('table.html', { root: '.' });
});

app.get('/table', function(req, res) {
    res.sendFile('table.html', { root: '.' });
});


app.get('/modify', function(req, res) {
    res.sendFile('modify.html', { root: '.' });
});

app.get('/locations', async (req, res) => { 
    var locs = await Locations.findAll();
    console.log(locs);
    res.json(locs);
});

app.put('/locations', async(req, res) => {
    const newloc = await Locations.create(req.params.location)
    res.json(newloc.location_id)
});

app.listen(PORT)
console.log('Server started at port: ' + PORT);
