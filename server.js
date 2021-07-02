import Express from 'express';
import Https from 'https';
import QueryString from 'querystring';

const app = Express();

const PORT = process.env.PORT || 3000;

app.use(Express.urlencoded({ extended: true }));
app.use(Express.static('public'));
app.use(Express.json());


app.get('/', function(req, res) {
    res.sendFile('table.html', { root: '.' });
});

app.get('/table', function(req, res) {
    res.sendFile('table.html', { root: '.' });
});


app.get('/modify', function(req, res) {
    res.sendFile('modify.html', { root: '.' });
});


app.get('/food', async (req, res) => { 
    const foodAppToken = 'Xs0gbdARsfYYjECTzIQc09FP8';

    const foodReqParams = {
        $limit: 20
    }

    const foodReqArgs = QueryString.stringify(foodReqParams);

    const foodReqOptions = {
        hostname: 'data.princegeorgescountymd.gov',
        port: '443',
        path: '/resource/umjn-t2iz.json?' + foodReqArgs,
        method: 'GET'
    }
    
    const foodReq = Https.request(foodReqOptions, (foodRes) => {
        var dataBuf = [];
        foodRes.on('data', function(chunk) {
            dataBuf.push(chunk);
        });
        foodRes.on('end', function() {
            var data = JSON.parse(Buffer.concat(dataBuf).toString());
            var resData = [];
            data.forEach(entry => {
                var customEntry = {};
                customEntry['establishment_id'] = entry['establishment_id'];
                customEntry['name'] = entry['name'];
                customEntry['address_line_1'] = entry['address_line_1'];
                customEntry['owner'] = entry['owner'];
                resData.push(customEntry);
            })
            res.json(resData);
        });
    });
    foodReq.on('error', error => {
        console.error(error);
    });
    foodReq.end();
});

app.put('/locations', async(req, res) => {
    var message = "Unfortunately I can't actually do anything :(\n";
    message += "But if I could, I'd run the following INSERT query:\n";
    message += "INSERT INTO locations (location_name) VALUES \"" + req.body.location_name + "\";";
    var data = {'message': message};
    res.json(data)
});

app.post('/locations', async(req, res) => {
    var message = "Unfortunately I can't actually do anything :(\n";
    message += "But if I could, I'd run the following UPDATE query:\n";
    message += "UPDATE locations SET location_name=\"" + req.body.location_name + "\" WHERE location_id=" + req.body.location_id + ";";
    var data = {'message': message};
    res.json(data)
});

app.delete('/locations', async(req, res) => {
    var message = "Unfortunately I can't actually do anything :(\n";
    message += "But if I could, I'd run the following DELETE query:\n";
    message += "DELETE FROM locations WHERE location_id=\"" + req.body.location_id + "\";";
    var data = {'message': message};
    res.json(data)
});

app.listen(PORT)
console.log('Server started at port: ' + PORT);
