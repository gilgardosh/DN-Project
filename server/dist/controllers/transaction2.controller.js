"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_util_1 = require("../util/response.util");
const database_util_1 = require("../util/database.util");
exports.transactionUserStocksController = (req, res, next) => {
    const { stockSymbol, buyOrSell, quantity, totalPrice, userId } = req.body;
    console.log(req.body);
    if (userId && totalPrice && quantity && buyOrSell && stockSymbol) {
        if (buyOrSell === 'sell') {
            const query = {
                name: 'make-sell-transaction-on-user-stocks',
                text: ' UPDATE public.user_stocks SET quantity_owned=(quantity_owned - $3), investment=(investment - $4) WHERE user_id=$1 AND stock_id=(SELECT stock_id FROM public.stocks s WHERE s.stock_symbol = $2);',
                values: [userId, stockSymbol, quantity, totalPrice],
            };
            console.log(query);
            database_util_1.database.query(query)
                .then(data => {
                res.status(200).json(response_util_1.responseHelper(data).body.rows);
                console.log('sell transaction made');
            })
                .catch(err => {
                res.status(401).json(response_util_1.responseHelper(err, false));
            });
        }
        else if (buyOrSell === 'buy') {
            const query = {
                name: 'make-buy-transaction-on-user-stocks',
                text: ' UPDATE public.user_stocks SET quantity_owned=(quantity_owned + $3), investment=(investment + $4) WHERE user_id=$1 AND stock_id=(SELECT stock_id FROM public.stocks s WHERE s.stock_symbol = $2);',
                values: [userId, stockSymbol, quantity, totalPrice],
            };
            console.log(query);
            database_util_1.database.query(query)
                .then(data => {
                res.status(200).json(response_util_1.responseHelper(data).body.rows);
                console.log('sell transaction made');
            })
                .catch(err => {
                res.status(401).json(response_util_1.responseHelper(err, false));
            });
        }
    }
    else {
        res
            .status(401)
            .json(response_util_1.responseHelper('Transaction data is invalid', false));
    }
};
