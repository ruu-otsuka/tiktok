// const express = require('express');
// const app = express();
// const fetch = require('node-fetch');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');

// app.use(cookieParser());
// app.use(cors());
// app.listen(process.env.PORT || 5000);

// const CLIENT_KEY = 'awyhutktsfzqjwz4' // this value can be found in app's developer portal

// app.get('/oauth', (req, res) => {
//     const csrfState = Math.random().toString(36).substring(2);
//     res.cookie('csrfState', csrfState, { maxAge: 60000 });

//     let url = 'https://www.tiktok.com/v2/auth/authorize/';

//     // the following params need to be in `application/x-www-form-urlencoded` format.
//     url += '?client_key={CLIENT_KEY}';
//     url += '&scope=user.info.basic';
//     url += '&response_type=code';
//     url += '&redirect_uri={SERVER_ENDPOINT_REDIRECT}';
//     url += '&state=' + csrfState;

//     res.redirect(url);
// })

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_KEY = 'awyhutktsfzqjwz4'; // TikTokのクライアントキー
const SERVER_ENDPOINT_REDIRECT = 'https://script.google.com/macros/s/AKfycbxLTE478AizSZn-hP6W3ULSQe5YiL-X9rxV2k9Q7RJ-qWY9bg_TmSnUpv3zo2YF6S9i/exec'; // リダイレクト先のURL

app.use(cookieParser());
app.use(cors());

app.get('/oauth', (req, res) => {
    const csrfState = Math.random().toString(36).substring(2);
    res.cookie('csrfState', csrfState, { maxAge: 60000 });

    let url = 'https://www.tiktok.com/v2/auth/authorize/';
    url += `?client_key=${CLIENT_KEY}`;
    url += '&scope=user.info.basic';
    url += '&response_type=code';
    url += `&redirect_uri=${encodeURIComponent(SERVER_ENDPOINT_REDIRECT)}`;
    url += `&state=${csrfState}`;

    res.redirect(url);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
