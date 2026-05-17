Overview
--------
This adds a small local proxy and a reusable React component to integrate the Gemini (Generative Language) API into the app.

Folders & files added
- server/: Express proxy that holds the API key and forwards requests to the Gemini / Generative Language API.
- src/services/geminiService.ts: Client function to call the local proxy.
- src/components/GeminiSearch.tsx: React component with input, loading state, error handling, and response UI.
- .env.example files showing where to put keys.

Quick start (local)
1. Copy /server/.env.example to /server/.env and set `GEMINI_API_KEY` to the API key you obtain from Google Cloud.
2. From the `fat-kill/server` folder run:

```bash
npm install
npm run start
```

3. Start the Vite app (from `fat-kill`):

```bash
npm install
npm run dev
```

How it works
- The React app calls `/api/gemini` (the Express proxy). In development you have two options:
	- Set `VITE_GEMINI_PROXY_URL=http://localhost:5174` in your client `.env` so `src/services/geminiService.ts` uses that base URL.
	- Or configure Vite's dev server proxy (in `vite.config.ts`) to forward `/api` to `http://localhost:5174` so relative calls work.
- The proxy reads `GEMINI_API_KEY` and forwards the prompt to the Generative Language API.
- The proxy returns a simplified `reply` string that the UI displays.

Security notes
- Never commit your API key to source control. Store it in environment variables on the server.
- If you deploy to Vercel/Netlify, use their secret environment variables and run the proxy as a serverless function instead of exposing the key client-side.

Gemini / Generative Language API
- This proxy posts JSON to the Generative Language endpoint used by Google: `https://generativelanguage.googleapis.com/...` with your key as a query param.
- If Google's API shape changes, update `server/server.js` to adapt to the new response format.

Files changed
- [src/components/Layout.tsx](src/components/Layout.tsx) — now mounts the search box at the top of the app.
- [src/components/GeminiSearch.tsx](src/components/GeminiSearch.tsx) — new UI component.
- [src/services/geminiService.ts](src/services/geminiService.ts) — new client service.
