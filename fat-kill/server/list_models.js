const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
(async () => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return console.error('No GEMINI_API_KEY in server/.env');
    const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
    const r = await fetch(url);
    console.log('STATUS', r.status);
    const text = await r.text();
    console.log(text);
  } catch (err) {
    console.error('ERR', err);
  }
})();
