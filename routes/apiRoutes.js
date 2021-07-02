import express from 'express';
import Https from 'https';
import QueryString from 'querystring';

const router = express.Router();

router.get('/', function(req, res) {
    res.sendFile('table.html', { root: './public' });
});

router.get('/table', function(req, res) {
    res.sendFile('table.html', { root: './public' });
});


router.get('/modify', function(req, res) {
    res.sendFile('modify.html', { root: './public' });
});


router.get('/food', async (req, res) => { 
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

router.put('/locations', async(req, res) => {
    var message;
    if (!req.body.location_name) {
        message = 'Error: You need to provide a location_name to ADD a location.';
    } else {
        var message = "Unfortunately I can't actually do anything :(\n";
        message += "But if I could, I'd run the following INSERT query:\n";
        message += "INSERT INTO locations (location_name) VALUES \"" + req.body.location_name + "\";";
    }
    const data = {'message': message};
    res.json(data)
});

router.post('/locations', async(req, res) => {
    var message;
    if (!req.body.location_id) {
        message = 'Error: You need to provide a location_id to UPDATE a location.';
    } else if (isNaN(req.body.location_id)) {
        message = 'Error: location_id must be an INTEGER.'
    } else if (!req.body.location_name) {
        message = 'Error: You need to provide a location_name to UPDATE a location.';
    } else {
        message = "Unfortunately I can't actually do anything :(\n";
        message += "But if I could, I'd run the following UPDATE query:\n";
        message += "UPDATE locations SET location_name=\"" + req.body.location_name + "\" WHERE location_id=" + req.body.location_id + ";";
    }
    const data = {'message': message};
    res.json(data)
});

router.delete('/locations', async(req, res) => {
    var message;
    if (!req.body.location_id) {
        message = 'Error: You need to provide a location_id to DELETE a location.';
    } else if (isNaN(req.body.location_id)) {
        message = 'Error: location_id must be an INTEGER.'
    } else {
        var message = "Unfortunately I can't actually do anything :(\n";
        message += "But if I could, I'd run the following DELETE query:\n";
        message += "DELETE FROM locations WHERE location_id=\"" + req.body.location_id + "\";";
    }
    const data = {'message': message};
    res.json(data)
});

export default router;