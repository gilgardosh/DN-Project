"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_util_1 = require("../util/response.util");
const database_util_1 = require("./../util/database.util");
exports.userStocksController = (req, res, next) => {
    const { userId } = req.body;
    if (!!userId) {
        const query = {
            name: 'fetch-user-stocks-by-user-id',
            text: 'select * from public.user_stocks us join stocks s on s.stock_id = us.stock_id where us.user_id = $1',
            values: [userId],
        };
        database_util_1.database.query(query)
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
            .json(response_util_1.responseHelper('User ID is invalid', false));
    }
};
