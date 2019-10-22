import { RequestHandler } from 'express';
import { responseHelper } from '../util/response.util';
import { database } from './../util/database.util';

export const transactionController: RequestHandler = (req, res, next) => {

  console.log("transaction made");
  const { stockSymbol, buyOrSell, quantity, totalPrice, userId } = req.body;

  if (userId && totalPrice && quantity && buyOrSell && stockSymbol) {

    if (buyOrSell === 'sell') {
      const query = {
        name: 'make-sell-transaction',
        text: `
        INSERT INTO public.user_trades(
          user_id, stock_id, quantity, total_price, trade_type)
          VALUES ($1,
            (SELECT stock_id FROM public.stocks s WHERE s.stock_symbol = $2),
          -$3, -%$4, 'Sold');
        `,
        values: [userId, stockSymbol, quantity, totalPrice],
      };

      database.query(query)
      .then(data => {
        res.status(200).json(responseHelper(data).body.rows);
      })
      .catch(err => {
        res.status(401).json(responseHelper(err, false));
      });
    } else if (buyOrSell === 'buy') {
      const query = {
        name: 'make-buy-transaction',
        text: `
        INSERT INTO public.user_trades(
          user_id, stock_id, quantity, total_price, trade_type)
          VALUES ($1,
            (SELECT stock_id FROM public.stocks s WHERE s.stock_symbol = $2),
          $3, $4, 'Bought');
        `,
        values: [userId, stockSymbol, quantity, totalPrice],
      };

      database.query(query)
      .then(data => {
        res.status(200).json(responseHelper(data).body.rows);
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
