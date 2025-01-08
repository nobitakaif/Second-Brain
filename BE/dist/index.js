"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const credentialRoutes_1 = require("./routes/credentialRoutes");
mongoose_1.default.connect("mongodb+srv://mk2818356:nobitakaif2004@cluster0.jeq1u.mongodb.net/Second_Brain");
// mongodb+srv://mk2818356:nobitakaif2004@cluster0.jeq1u.mongodb.net/
// import z from "zod"
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1', credentialRoutes_1.credentialRoutes);
app.listen(3009, function () {
    console.log("server is runnging on port 3000");
});
