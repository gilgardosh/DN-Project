import express from 'express';
import { json, urlencoded } from 'body-parser';
import { headersController } from './util/headers.util';
import usersRouter from './routes/users.routing';
import tradesRouter from './routes/trades.routing';
import userStocksRouter from './routes/userstocks.routing';
import liveStocksRouter from './routes/livestocks.routing';
import loginRouter from './routes/login.routing';
import { database } from './util/database.util';
import { quotes } from './stock';
import { Socket } from 'socket.io';

const app: express.Application = express();
app.use(urlencoded({ limit: '500mb', extended: true }));
app.use(headersController);
app.use('/api', json({ limit: '500mb' }));
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tradeHistory', tradesRouter);
app.use('/api/v1/liveStocks', liveStocksRouter);
app.use('/api/v1/userStocks', userStocksRouter);

const port = process.env.PORT || 4040;
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let symbolsLiveData: string [] = [];
setTimeout(async () => {
  try {
    symbolsLiveData = await quotes(['GOOGL']);


    io.emit('stocksupdate', symbolsLiveData);
  } catch(e) {

  }
}, 10000);

io.sockets.on('connection', (socket: Socket) => {
  socket.emit('stocksupdate', symbolsLiveData);
});



server.listen(port, () => {
  console.log(port);
  database
    .connect()
    .then(value => {
      console.log('connected');
    })
    .catch(error => {
      console.log(error);
    });
});
