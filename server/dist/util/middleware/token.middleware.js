"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const response_util_1 = require("../response.util");
const secret_1 = require("../secret");
exports.tokenMiddleware = (req, res, next) => {
    try {
        let token = req.headers['Authorization'];
        if (token && token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        else if (!token) {
            throw new Error('Not Auth');
        }
        const isValid = jsonwebtoken_1.verify(token, secret_1.secret);
        next();
    }
    catch (e) {
        res.status(401).json(response_util_1.responseHelper(e, false));
    }
};
exports.setTokenOnHeader = (res, token) => {
    try {
        res.setHeader('Authorization', `Bearer ${token}`);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
};
