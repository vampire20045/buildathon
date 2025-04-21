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

const app = express();
const Interviewrouter = express.Router();
const prisma = new PrismaClient();
const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!DEEPGRAM_API_KEY || !GEMINI_API_KEY) {
  throw new Error('Missing API keys in environment variables');
}

const deepgram = createClient(DEEPGRAM_API_KEY);
const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

const wss = new WebSocket.Server({
  noServer: true,
  clientTracking: true,
});

let sessionActive = false;
let timer: NodeJS.Timeout | null = null;
let conversation = '';

// Set up Multer for handling file uploads
const upload = multer({
  dest: path.join(__dirname, 'public/audio'), // Store audio files in 'public/audio' directory
  limits: { fileSize: 100 * 1024 * 1024 }, // Set file size limit (100MB in this case)
});

const handleUpgrade = (request: any, socket: any, head: Buffer) => {
  console.log('Handling upgrade request');
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
};

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  // Refactor for Deepgram v3 SDK: Create a live transcription stream
  const dgLive = deepgram.listen.live({
    language: 'en-US',
    punctuate: true,
  });

  dgLive.on('open', () => {
    console.log('Deepgram live transcription started');
  });

  dgLive.on('error', (err: any) => {
    console.error('❌ Deepgram error:', err);
    ws.send(JSON.stringify({ type: 'error', message: 'Transcription error' }));
  });

  dgLive.on('transcriptReceived', async (data: any) => {
    const transcript = data.channel?.alternatives?.[0]?.transcript;
    if (!transcript) return;

    console.log(`📝 Deepgram transcript: ${transcript}`);
    conversation += `User: ${transcript}\n`;

    try {
      console.log('🤖 Requesting AI response for transcript');
      const model = ai.getGenerativeModel({ model: 'gemini-1.5-pro' });
      const result = await model.generateContent(transcript);

      const responseText = await result.response.text();
      console.log(`💬 Gemini AI response: ${responseText}`);

      conversation += `AI: ${responseText}\n`;
      ws.send(JSON.stringify({ type: 'text', data: responseText }));
    } catch (err) {
      console.error('❌ Gemini error:', err);
      ws.send(JSON.stringify({ type: 'error', message: 'AI response error' }));
    }
  });
  
  ws.on('message', (chunk: RawData) => {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk as ArrayBuffer);
    console.log(`🎤 Received audio chunk (${buffer.length} bytes)`);
  
    if (dgLive.getReadyState() === 1) {
      dgLive.send(buffer);
    }
  });
  

  ws.on('close', async () => {
    console.log('Client disconnected');
    dgLive.finish();
    if (timer) clearTimeout(timer);
    if (conversation) {
      console.log('Saving conversation...');
      await saveConversation(conversation);
    }
    sessionActive = false;
  });

  if (!sessionActive) {
    console.log('Starting session timer for client');
    sessionActive = true;
    timer = setTimeout(() => {
      console.log('Session timed out, closing connection');
      ws.close();
    }, 1500 * 1000); // 25 minutes
  }
});

async function saveConversation(convo: string) {
  try {
    console.log('Saving conversation to the database');
    const interview = await prisma.interviewsGiven.create({
      data: {
        companyName: 'Company Name Here',
        position: 'Position Here',
        conversation: convo,
        userId: 1, // Make sure to adjust this userId as per your app logic
      },
    });
    console.log('Interview saved:', interview.id);
  } catch (error) {
    console.error('❌ Failed to save conversation:', error);
  }
}

// Audio upload route
app.post('/audio', upload.single('audio'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  console.log('Audio file received:', req.file);

  res.status(200).send({
    message: 'Audio file uploaded successfully',
    filename: req.file.filename,
  });
});

app.use('/', Interviewrouter);
const server = http.createServer(app);
server.on('upgrade', handleUpgrade);
server.listen(3000, () => {
  console.log('🚀 Server running on port 3000');
});

export default Interviewrouter;
