const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(cors({
  origin: [
    'chrome-extension://hceplogonndiklcphadcalboomnojapb',
    'http://localhost:3000',
    'http://localhost:8080',
    'http://localhost:3001',
    'https://safire-client.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
