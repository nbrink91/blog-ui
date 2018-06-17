"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = require("firebase-functions");
const express_1 = __importDefault(require("express"));
const nodemailer_1 = require("nodemailer");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.post('/email', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const body = req.body;
        const gmailEmail = firebase_functions_1.config().gmail.email;
        const gmailPassword = firebase_functions_1.config().gmail.password;
        const mailTransport = nodemailer_1.createTransport({
            service: 'gmail',
            auth: {
                user: gmailEmail,
                pass: gmailPassword,
            },
        });
        console.info('Sending mail:');
        const to = 'nbrink7@gmail.com';
        console.info(`To: ${to}`);
        const from = `${body.name} <${body.email}>`;
        console.info(`From: ${from}`);
        const subject = `New Contact from ${body.name}`;
        console.info(`Subject: ${subject}`);
        const text = `Email: ${from}\nMessage: ${body.message}`;
        const mail = { to, from, subject, text };
        const data = yield new Promise((resolve, reject) => {
            mailTransport.sendMail(mail, (err, info) => {
                if (err) {
                    reject(err);
                }
                resolve(info);
            });
        });
        console.log('Email successfully sent.');
        res.json(body);
    }
    catch (err) {
        console.error(err);
        res.status(500);
        res.json(err);
    }
}));
exports.api = firebase_functions_1.https.onRequest(app);
//# sourceMappingURL=index.js.map