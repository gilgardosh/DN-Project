"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_util_1 = require("../util/response.util");
const database_util_1 = require("./../util/database.util");
const jsonwebtoken_1 = require("jsonwebtoken");
const secret_1 = require("../util/secret");
const token_middleware_1 = require("../util/middleware/token.middleware");
exports.loginController = (req, res, next) => {
    const { email, password } = req.body;
    if (email && password) {
        const query = {
            name: 'fetch-user-by-credentials',
            text: 'select * from public.users where email = $1 and password = $2',
            values: [email, password]
        };
        database_util_1.database
            .query(query)
            .then(data => {
            console.log(data);
            const user = data.rows[0];
            const token = jsonwebtoken_1.sign(user || {}, secret_1.secret, {
                expiresIn: '24h'
            });
            token_middleware_1.setTokenOnHeader(res, token);
            res.status(200).json(response_util_1.responseHelper(user));
        })
            .catch(err => {
            console.log(err);
            res.status(401).json(response_util_1.responseHelper(err, false));
        });
    }
    else {
        res
            .status(401)
            .json(response_util_1.responseHelper('Email or Password are invalid', false));
    }
};
