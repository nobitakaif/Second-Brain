"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentialRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const middleware_1 = require("./middleware");
const Router = (0, express_1.default)();
Router.post('/signup', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputFormat = zod_1.default.object({
            email: zod_1.default.string().email(),
            password: zod_1.default.string().min(8).max(40)
        });
        const checkInputs = inputFormat.safeParse(req.body); // safeParse check the input format and return {success:boolean,data:(msg),error}
        if (!checkInputs.success) {
            res.status(403).send({
                msg: "you enter wrong inputs",
                error: checkInputs.error
            });
        }
        const email = req.body.email;
        const password = req.body.password;
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        try {
            yield db_1.UserModel.create({
                email: email,
                password: hashedPassword
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).send({
                msg: "db crashed"
            });
        }
        res.status(200).send({
            msg: "you're successfully logged in"
        });
    });
});
Router.post('/signin', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const response = yield db_1.UserModel.findOne({
            email: email
        });
        if (!(response === null || response === void 0 ? void 0 : response.email)) {
            res.status(403).send({
                msg: "incorrect credential"
            });
            return;
        }
        console.log(response.email, " ", response.password);
        const unhasedPassword = yield bcrypt_1.default.compare(password, response.password); // (as string) just assume it that it is present and convert into string
        if (!unhasedPassword) {
            res.status(403).send({
                msg: "password is incorrect"
            });
            return;
        }
        console.log(response.email, "  ", response.password);
        const token = jsonwebtoken_1.default.sign({
            id: response._id
        }, config_1.JWT_PASSWORD);
        console.log(token);
        res.send({
            token: token
        });
    });
});
// add a middleware for every content route should be authenticated  
Router.post('/content', middleware_1.middleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = req.body.link;
        const title = req.body.title;
        try {
            yield db_1.ContentModel.create({
                title,
                link,
                // @ts-ignore
                userId: req.userId,
                tag: []
            });
        }
        catch (e) {
            console.log(e);
            res.status(500).send({
                msg: "maybe database crashed while putting the data in Content Table`"
            });
        }
        res.status(200).send({
            msg: "your content added into db"
        });
    });
});
Router.get('/content', middleware_1.middleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const id = req.userId;
        const response = yield db_1.ContentModel.find({
            userId: id
        }).populate("userId", "email"); // populate is basically get this id is which userid to belong it
        res.send({
            response
        });
    });
});
Router.delete('/content', middleware_1.middleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentId = req.body.contentId;
        try {
            yield db_1.ContentModel.deleteMany({
                contentId,
                // @ts-ignore
                userId: req.userId
            });
        }
        catch (e) {
            console.log(e);
            res.status(500).send({
                msg: "content not deleted"
            });
            return;
        }
        res.status(200).send({
            msg: "content is deleted",
            id: contentId
        });
    });
});
exports.credentialRoutes = Router;
