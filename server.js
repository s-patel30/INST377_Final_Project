const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile('index.html')
});

app.listen(PORT)
console.log('Server started at port: ' + PORT);