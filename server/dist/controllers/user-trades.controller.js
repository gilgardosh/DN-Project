"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_util_1 = require("../util/response.util");
const database_util_1 = require("../util/database.util");
exports.userTradeHistoryController = (req, res, next) => {
    const { userId } = req.body;
    if (!!userId) {
        const query = {
            name: 'fetch-trades-by-user-id',
            text: 'select * from public.user_trades ut join stocks s on s.stock_id = ut.stock_id where ut.user_id=$1',
            values: [userId]
        };
        database_util_1.database
            .query(query)
            .then(data => {
            res.status(200).json(response_util_1.responseHelper(data).body.rows);
        })
            .catch(err => {
            res.status(401).json(response_util_1.responseHelper(err, false));
        });
    }
    else {
        res.status(401).json(response_util_1.responseHelper('UserTrades are invalid', false));
    }
};
