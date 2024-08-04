require('dotenv').config();
const apiRouter = require('./routers/api.router');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const getUser = require("./routers/getUser.api.router.js");

const { wss, upgradeCb } = require('./ws/upgradeCb');
const connectionCb = require('./ws/connectionCb');

const express = require('express');
const http = require('http')

const app = express();
const { PORT } = process.env;

// http cerver +
const server = http.createServer(app)

//! Конфиг корса
const corsConfig = {
  origin: ['http://localhost:5173', 'http://localhost:4173'],
  credentials: true,
};
//! Подключение
app.use(cors(corsConfig));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use('/api/v1', apiRouter);
// app.use('/', getUser);

server.on('upgrade', upgradeCb);
wss.on('connection', connectionCb);

server.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});
