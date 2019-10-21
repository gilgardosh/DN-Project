import { json, urlencoded } from 'body-parser';
import express from 'express';
import { Socket } from 'socket.io';
import loginRouter from './routes/login.routing';
import tradesRouter from './routes/trades.routing';
import userStocksRouter from './routes/userstocks.routing';
import stocksListRouter from './routes/stockslist.routing';
import { quotes } from './stock';
import { database } from './util/database.util';
import { headersController } from './util/headers.util';
import { getStocksList } from './util/stocks-list.util';
import { tokenMiddleware } from './util/middleware/token.middleware';

const app: express.Application = express();
app.use(urlencoded({ limit: '500mb', extended: true }));
app.use(headersController);
app.use('/api', json({ limit: '500mb' }));
app.use('/api/v1/login', loginRouter);
// app.use(tokenMiddleware);
app.use('/api/v1/tradeHistory', tradesRouter);
app.use('/api/v1/userStocks', userStocksRouter);
app.use('/api/v1/stocksList', stocksListRouter);

const port = process.env.PORT || 4040;
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let symbolsLiveData: string[] = [];

server.listen(port, () => {
  console.log(port);
  database
    .connect()
    .then(value => {
      console.log('connected');

      setInterval(async () => {
        try {
          let list = await getStocksList();
          list = list.map(stockObj => stockObj['stock_symbol']);
          symbolsLiveData = await quotes(list);

          io.emit('stocksupdate', symbolsLiveData);
        } catch (e) {}
      }, 10000);

      io.sockets.on('connection', (socket: Socket) => {
        socket.emit('stocksupdate', symbolsLiveData);
      });
    })
    .catch(error => {
      console.log(error);
    });
});
