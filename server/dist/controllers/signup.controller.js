"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_util_1 = require("../util/response.util");
const database_util_1 = require("../util/database.util");
exports.signupController = (req, res, next) => {
    const { email, password, first_name, last_name } = req.body;
    console.log(req.body);
    if (email && password && first_name && last_name) {
        const query = {
            name: 'signup-new-user',
            text: ' INSERT INTO public.users( first_name, last_name, email, password ) VALUES ($3, $4,$1, $2);',
            values: [email, password, first_name, last_name]
        };
        database_util_1.database
            .query(query)
            .then(data => {
            res.status(200).json(response_util_1.responseHelper(data).body.rows);
            console.log('new user signed up');
        })
            .catch(err => {
            res.status(401).json(response_util_1.responseHelper(err, false));
        });
    }
    else {
        res.status(401).json(response_util_1.responseHelper('Signup data is invalid', false));
    }
};
