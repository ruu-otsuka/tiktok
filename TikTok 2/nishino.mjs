import fetch from 'node-fetch';
import crypto from 'crypto';

const CLIENT_KEY = 'sbawhmaqsmjq82znxy';
const CLIENT_SECRET = 'qnqCHAxAmlr9j8h9HJlHlEHHY7uMHBHI';
const REDIRECT_URI = 'https://script.google.com/macros/s/AKfycbxtH_hCdthtJm0nS8OMX2dPPpjq4GsP9JRQh5qJadnj9ZY0ZgQBT1WL8eNcNQHn2TdKeg/exec';

// CSRFトークンの生成
const CSRF_STATE = crypto.randomBytes(16).toString('hex');

// 認証URLの生成
const authUrl = new URL('https://www.tiktok.com/v2/auth/authorize/');
authUrl.searchParams.append('client_key', CLIENT_KEY);
authUrl.searchParams.append('response_type', 'code');
authUrl.searchParams.append('scope', 'user.info.basic');
authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
authUrl.searchParams.append('state', CSRF_STATE);

console.log('Authorization URL:', authUrl.toString());
console.log('Please open this URL in a browser and complete the authorization process.');

// 注意: この部分はサーバーサイドで実行する必要があります
async function getAccessToken(authCode) {
  const tokenUrl = 'https://business-api.tiktok.com/open_api/v1.3/tt_user/oauth2/token/';
  
  const body = JSON.stringify({
    client_id: CLIENT_KEY,
    client_secret: CLIENT_SECRET,
    grant_type: 'authorization_code',
    auth_code: authCode,
    redirect_uri: REDIRECT_URI
  });

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    });

    const data = await response.json();
    console.log('Token Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching token:', error);
  }
}

// 使用例（実際にはコールバックURLでauth_codeを受け取った後に実行します）
// getAccessToken('your_auth_code_here');