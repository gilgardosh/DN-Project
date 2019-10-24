"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stocks_list_controller_1 = require("../controllers/stocks-list.controller");
const router = express_1.default.Router();
router.get('/', stocks_list_controller_1.stocksListController);
exports.default = router;
