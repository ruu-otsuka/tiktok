// import express from 'express';
// import fetch from 'node-fetch';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import crypto from 'crypto';

// const app = express();
// app.use(cookieParser());
// app.use(cors());
// app.listen(process.env.PORT || 8080);



// const CLIENT_KEY = 'sbaw1km1qllp7ol41h' // this value can be found in app's developer portal
// const SERVER_ENDPOINT_REDIRECT = 'https://script.google.com/macros/s/AKfycbxLTE478AizSZn-hP6W3ULSQe5YiL-X9rxV2k9Q7RJ-qWY9bg_TmSnUpv3zo2YF6S9i/exec' // redirect URI should be registered in developer portal

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
import fetch from 'node-fetch';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(cookieParser());
app.use(cors());
const PORT=8079;



const CLIENT_KEY = 'sbaw1km1qllp7ol41h' // this value can be found in app's developer portal
// const SERVER_ENDPOINT_REDIRECT = 'https://script.google.com/macros/s/AKfycbz0YPOzu2YA3easBhBXC8N6s2-i-0n0488PLrxKoz87uzQ3iv78KYgRaXvHqDqicIqnBQ/exec'
// const SERVER_ENDPOINT_REDIRECT = 'https://script.google.com/macros/s/AKfycbxtH_hCdthtJm0nS8OMX2dPPpjq4GsP9JRQh5qJadnj9ZY0ZgQBT1WL8eNcNQHn2TdKeg/exec'
const SERVER_ENDPOINT_REDIRECT = 'https://script.google.com/macros/s/AKfycbx8BcE7LSMkS5stFZ0K6PenFg5HCH2yEtehbGlhMK8NhLZfV_X6K2uFg5Xvpl8QcTtj/exec'
const CODE_VERIFIER = 'fakfsgkahflaijhfoiljfeow8u3wfhgvaihj38aijwlaiaj9ja2wfi'
const CODE_CHALLENGE = 'SHA256_hash_of_code_verifier'

app.get('/oauth', (req, res) => {
    const csrfState = Math.random().toString(36).substring(2);
    res.cookie('csrfState', csrfState, { maxAge: 60000 });

    let url = 'https://www.tiktok.com/v2/auth/authorize/';

    // the following params need to be in `application/x-www-form-urlencoded` format.
    url += '?client_key='+CLIENT_KEY;
    url += '&scope=user.info.basic';
    url += '&response_type=code';
    url += '&redirect_uri=' + SERVER_ENDPOINT_REDIRECT;
    url += '&state=' + csrfState;
    url += '&code_challenge='+CODE_VERIFIER;
    url += '&code_challenge_method=S256'

    res.redirect(url);
})


app.listen(PORT, () => {
    console.log(`サーバーがポート ${PORT} で実行中です`);
});