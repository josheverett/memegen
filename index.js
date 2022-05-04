import 'dotenv/config';

import express from 'express';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const server = express();
const port = 3000;

server.get(/\/(health)?/, (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now(),
  });
});

server.get('memegen', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now(),
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
