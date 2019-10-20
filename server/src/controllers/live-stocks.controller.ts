import { RequestHandler } from 'express';
import liveStocksJSON from '../../../src/api/livestocks/livestocks.json';


export const liveStocksController: RequestHandler = (req, res, next) => {
  // http://localhost:4040/api/v1/users/{{ userId }}

  // const {stock_symbol} = req.body;
  // if (stock_symbol != 'ALL') {
  //   const liveSpecStock = liveStocksJSON.find(o => o.stock_symbol === stock_symbol);
  //   res.status(200).json(liveSpecStock);
  // } else {
    const userData = JSON.parse(JSON.stringify(liveStocksJSON));
    res.status(200).json(liveStocksJSON);
  // }
};
