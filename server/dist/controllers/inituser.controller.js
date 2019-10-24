"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_util_1 = require("../util/response.util");
const database_util_1 = require("../util/database.util");
exports.initUserController = (req, res, next) => {
    const { userId } = req.body;
    if (!!userId) {
        console.log(userId);
        const query = {
            name: 'make-sell-transaction-on-user-stocks',
            text: 'INSERT INTO public.user_stocks(user_id, stock_id) VALUES ($1, 1), ($1, 2), ($1, 3), ($1, 4), ($1, 5);',
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
        res
            .status(401)
            .json(response_util_1.responseHelper('User Wallet Initiation Failed', false));
    }
};
