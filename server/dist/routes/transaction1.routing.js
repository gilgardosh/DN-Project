"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction1_controller_1 = require("../controllers/transaction1.controller");
const router = express_1.default.Router();
router.put('/', transaction1_controller_1.transactionTradesController);
exports.default = router;
