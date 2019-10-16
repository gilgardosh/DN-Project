import express from 'express';
import { json, urlencoded } from 'body-parser';
import { headersController } from './util/headers.util';
import usersRouter from './routes/users.routing';
import tradesRouter from './routes/trades.routing';
import liveStocksRouter from './routes/livestocks.routing';
const app: express.Application = express();
const port = process.env.PORT || 4040;

app.use(urlencoded({ limit: '500mb', extended: true }));
app.use(headersController);
app.use('/api', json({ limit: '500mb' }));


app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tradeHistory', tradesRouter);
app.use('/api/v1/liveStocks', liveStocksRouter);



app.listen(port, () => {
  console.log(port);
});
