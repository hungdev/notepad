import express from 'express';
import bodyParser from 'body-parser'
import http from 'http';
import path from 'path';
import socketIO from 'socket.io'
// import Helper from '../helpers';
import cors from 'cors';
import open from 'open';
import '@babel/polyfill';
// import { CHANGE_WORD, SOCKET_IO } from '../helpers/constant'

import fallback from 'express-history-api-fallback'
//https://expressjs.com/en/resources/middleware/serve-static.html


import wordRoute from './routes/word';

const root = path.join(__dirname, '../../dist/client')

const server = express();
// const port = Helper.config().port || 5050;
const port = 3050;
const appServer = http.createServer(server)
// const io = socketIO(appServer);
// server.set(SOCKET_IO, io);

// io.on('connection', socket => {
//   socket.on(CHANGE_WORD, (word) => {
//     io.sockets.emit(CHANGE_WORD, word)
//   })
// })

// server.use(express.static(root))

server.use(bodyParser.json());
server.use(cors())
server.use('/api/word', wordRoute);
server.use(express.static(path.join(__dirname, '../../dist/client')));
server.use(fallback('index.html', { root }))

appServer.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
  // open(`http://localhost:${port}`);
});