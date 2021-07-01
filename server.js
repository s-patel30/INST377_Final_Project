import Express from 'express';
import Https from 'https';
import QueryString from 'querystring';

const app = Express();

const PORT = 3000;

app.use(Express.urlencoded({ extended: true }));

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
    const foodReq = Https.request(foodReqOptions, (foodRes) => {
        console.log('statusCode:', foodRes.statusCode);
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
    console.log(foodReq);
});

app.put('/food', async(req, res) => {
    
});

app.listen(PORT)
console.log('Server started at port: ' + PORT);
