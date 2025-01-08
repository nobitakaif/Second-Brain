"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const middleware = (req, res, next) => {
    const token = req.headers["authorization"];
    const decodecToken = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD);
    if (decodecToken) {
        // here typescript give you error, right now we are avoiding this, eventually we'll fixed it
        // we're send to thier id to the next routes
        // @ts-ignore
        req.userId = decodecToken.id;
        next();
    }
    else {
        res.status(411).send({
            msg: "token is not presnt in headers"
        });
    }
};
exports.middleware = middleware;
