const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
(async () => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return console.error('No GEMINI_API_KEY in server/.env');
    const endpoints = [
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
    ];

    for (const url of endpoints) {
      try {
        const payload = { contents: [{ parts: [{ text: 'diagnostic test' }] }] };
        const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        console.log('\nURL:', url);
        console.log('STATUS', r.status);
        const text = await r.text();
        console.log('BODY', text.substring(0, 1000));
      } catch (err) {
        console.error('ERR for', url, err && err.message);
      }
    }
  } catch (err) {
    console.error('DIAG ERR', err);
  }
})();
