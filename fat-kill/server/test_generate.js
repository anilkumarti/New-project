const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
(async () => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return console.error('No GEMINI_API_KEY in server/.env');
    const model = 'gemini-2.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const payload = { contents: [{ parts: [{ text: 'diagnostic test for 2.5 flash' }] }] };
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    console.log('STATUS', r.status);
    const text = await r.text();
    console.log('BODY', text.substring(0,2000));
  } catch (err) {
    console.error('ERR', err);
  }
})();
