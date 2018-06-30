import { config, https } from 'firebase-functions';
import express, { Request, Response, NextFunction } from 'express';
import { createTransport, SendMailOptions, SentMessageInfo } from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
import Contact from './model/Contact';
import axios from 'axios';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/verify', async (req: Request, res: Response, next: NextFunction) => {
    const secret = config().recaptcha.secret;
    const response = req.query.token;

    const { data } = await axios.get(
        'https://www.google.com/recaptcha/api/siteverify',
        {
            params: {
                secret,
                response,
            }
        }
    );

    res.json(data);

    next();
});

app.post('/email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mailTransport = createTransport({
            service: 'gmail',
            auth: {
                user: config().gmail.email,
                pass: config().gmail.password,
            },
        });

        const body: Contact = req.body;
        console.info('Sending mail:');
        const to = 'nbrink7@gmail.com';
        console.info(`To: ${to}`);
        const from = `${body.name} <${body.email}>`;
        console.info(`From: ${from}`);
        const subject = `New Contact from ${body.name}`;
        console.info(`Subject: ${subject}`)
        const text = `Email: ${from}\nMessage: ${body.message}`;
        const mail: SendMailOptions = { to, from, subject, text };
    
        await new Promise((resolve, reject) => {
            mailTransport.sendMail(mail, (err: Error | null, info: SentMessageInfo) => {
                if (err) {
                    reject(err);
                }
    
                resolve(info);
            });
        });
    
        console.log('Email successfully sent.');
        res.json(body);
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json(err);
    }
});

export const api = https.onRequest(app);
