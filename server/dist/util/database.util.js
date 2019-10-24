"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const connectionString = 'postgres://server:postgres@localhost:5432/dnproject';
exports.database = new pg_1.Client({
    connectionString: connectionString
});
