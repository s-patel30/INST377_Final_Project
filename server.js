import Express from 'express';

import apiRoutes from './routes/apiRoutes.js';

const app = Express();

const PORT = process.env.PORT || 3000;

app.use(Express.urlencoded({ extended: true }));
app.use(Express.static('public'));
app.use(Express.json());
app.use('/', apiRoutes);

app.listen(PORT);
console.log('Server started at port: ' + PORT);
