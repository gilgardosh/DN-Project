import { RequestHandler } from 'express';
import { responseHelper } from '../util/response.util';
import { database } from '../util/database.util';

export const transactionTradesController: RequestHandler = (req, res, next) => {


  const { stockSymbol, buyOrSell, quantity, totalPrice, userId } = req.body;
  console.log(req.body);
  if (userId && totalPrice && quantity && buyOrSell && stockSymbol) {

    if (buyOrSell === 'sell') {
      const query = {
        name: 'make-sell-transaction-on-trade-table',
        text: ' INSERT INTO public.user_trades ( user_id, stock_id, quantity, total_price, trade_type) VALUES ($1,(SELECT stock_id FROM public.stocks s WHERE s.stock_symbol = $2), $3, $4, $5);',
        values: [userId, stockSymbol, -quantity, -totalPrice, 'Sold'],
      };
      console.log(query);
      database.query(query)
      .then(data => {
        res.status(200).json(responseHelper(data).body.rows);
        console.log('sell transaction made');
      })
      .catch(err => {
        res.status(401).json(responseHelper(err, false));
      });

    } else if (buyOrSell === 'buy') {
      const query = {
        name: 'make-buy-transaction-on-trade-table',
        text: ' INSERT INTO public.user_trades( user_id, stock_id, quantity, total_price, trade_type ) VALUES ($1,(SELECT stock_id FROM public.stocks s WHERE s.stock_symbol = $2), $3, $4, $5);',
        values: [userId, stockSymbol, quantity, totalPrice, 'Bought'],
      };
      database.query(query)
      .then(data => {
        res.status(200).json(responseHelper(data).body.rows);
        console.log('buy transaction made');
      })
      .catch(err => {
        res.status(401).json(responseHelper(err, false));
      });
    }
  } else {
    res
      .status(401)
      .json(responseHelper('Transaction data is invalid', false));
  }
};
