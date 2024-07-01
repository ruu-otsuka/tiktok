import express from 'express';
import fetch from 'node-fetch';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import crypto from 'crypto';

const app = express();

app.use(cookieParser());
app.use(cors());

const CLIENT_KEY = 'awyhutktsfzqjwz4' // this value can be found in app's developer portal
const SERVER_ENDPOINT_REDIRECT = 'https://script.google.com/macros/s/AKfycbxLTE478AizSZn-hP6W3ULSQe5YiL-X9rxV2k9Q7RJ-qWY9bg_TmSnUpv3zo2YF6S9i/exec' // redirect URI should be registered in developer portal
const CODE_VERIFIER = 'your_unique_code_verifier_12345123421122'
const CODE_CHALLENGE = crypto.createHash('sha256').update(CODE_VERIFIER).digest('base64url');

app.get('/oauth', (req, res) => {
    const csrfState = Math.random().toString(36).substring(2);

    res.cookie('csrfState', csrfState, { maxAge: 60000 });

    const url = new URL('https://www.tiktok.com/v2/auth/authorize/');
    url.searchParams.append('client_key', CLIENT_KEY);
    url.searchParams.append('scope', 'user.info.basic');
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('redirect_uri', SERVER_ENDPOINT_REDIRECT);
    url.searchParams.append('state', csrfState);
    url.searchParams.append('code_challenge', CODE_CHALLENGE);
    url.searchParams.append('code_challenge_method', 'S256');

    res.redirect(url.toString());
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});