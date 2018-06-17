import { config, https } from 'firebase-functions';
import express, { Request, Response, NextFunction } from 'express';
import { createTransport, SendMailOptions, SentMessageInfo } from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
import Contact from './model/Contact';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body: Contact = req.body;

        const gmailEmail = config().gmail.email;
        const gmailPassword = config().gmail.password;
        const mailTransport = createTransport({
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
        console.info(`Subject: ${subject}`)
        const text = `Email: ${from}\nMessage: ${body.message}`;
        const mail: SendMailOptions = { to, from, subject, text };
    
        const data = await new Promise((resolve, reject) => {
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
