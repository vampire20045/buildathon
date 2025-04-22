// src/index.ts
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@deepgram/sdk';
import WebSocket, { RawData } from 'ws';
import http from 'http';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { Buffer } from 'buffer';

dotenv.config();

const app    = express();
const prisma = new PrismaClient();

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY!;
const GEMINI_API_KEY   = process.env.GEMINI_API_KEY!;
if (!DEEPGRAM_API_KEY || !GEMINI_API_KEY) {
  throw new Error('Missing API keys');
}

const deepgram = createClient(DEEPGRAM_API_KEY);
const ai       = new GoogleGenerativeAI(GEMINI_API_KEY);

const server = http.createServer(app);
const wss    = new WebSocket.Server({ noServer: true });

let conversation = '';

// 1) Handle WebSocket upgrade on /Interview
server.on('upgrade', (req, socket, head) => {
  if (req.url === '/Interview') {
    wss.handleUpgrade(req, socket, head, ws => {
      wss.emit('connection', ws, req);
    });
  } else {
    socket.destroy();
  }
});

// 2) On WS connection, pipe data to Deepgram & Gemini
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Open Deepgram WS (using Opus/48kHz here)
  const dg = new WebSocket(
    'wss://api.deepgram.com/v1/listen?punctuate=true&interim_results=true&language=en-US&encoding=opus&sample_rate=48000',
    { headers: { Authorization: `Token ${DEEPGRAM_API_KEY}` } }
  );

  dg.on('open', () => console.log('✅ Deepgram connection opened'));
  dg.on('error', err => {
    console.error('❌ Deepgram error:', err);
    ws.send(JSON.stringify({ type: 'error', message: 'Transcription error' }));
    ws.close();
  });
  dg.on('close', (code, reason) => {
    console.warn(`⚠️ Deepgram closed: ${code} – ${reason}`);
    ws.close();
  });

  // Receive transcripts from Deepgram
  dg.on('message', async raw => {
    const msg = JSON.parse(raw.toString());
    if (msg.is_final || msg.speech_final) {
      const text = msg.channel.alternatives[0].transcript.trim();
      if (!text) return;

      console.log('📝 Deepgram final transcript:', text);
      conversation += `User: ${text}\n`;

      try {
        const model  = ai.getGenerativeModel({ model: 'gemini-1.5-pro' });
        const result = await model.generateContent(text);
        const reply  = await result.response.text();

        console.log('💬 Gemini response:', reply);
        conversation += `AI: ${reply}\n`;

        ws.send(JSON.stringify({ type: 'text', data: reply }));
      } catch (err) {
        console.error('❌ Gemini error:', err);
        ws.send(JSON.stringify({ type: 'error', message: 'AI error' }));
      }
    }
  });

  // Keep Deepgram alive
  const keepAlive = setInterval(() => {
    if (dg.readyState === WebSocket.OPEN) {
      dg.send(JSON.stringify({ type: 'KeepAlive' }));
    }
  }, 3000);

  // Forward raw audio from client to Deepgram
  ws.on('message', (chunk: RawData) => {
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk as ArrayBuffer);
    if (buf.length && dg.readyState === WebSocket.OPEN) {
      dg.send(buf);
    }
  });

  // Cleanup on client close
  ws.on('close', async () => {
    clearInterval(keepAlive);
    console.log('Client disconnected');

    if (dg.readyState === WebSocket.OPEN) {
      dg.send(JSON.stringify({ type: 'CloseStream' }));
    }
    dg.close();

    if (conversation) {
      await prisma.interviewsGiven.create({
        data: {
          companyName: 'Company Name Here',
          position:    'Position Here',
          conversation,
          userId:      1,
        },
      });
      console.log('💾 Conversation saved');
    }
    conversation = '';
  });
});

// 3) Single file‑upload endpoint (no router.use)
const upload = multer({
  dest: path.join(__dirname, 'public/audio'),
  limits: { fileSize: 100 * 1024 * 1024 },
});
app.post('/audio', upload.single('audio'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');
  console.log('🗂️ Audio file received:', req.file.filename);
  res.json({ filename: req.file.filename });
});

// 4) Start server
server.listen(3000, () => console.log('🚀 Listening on http://localhost:3000'));
