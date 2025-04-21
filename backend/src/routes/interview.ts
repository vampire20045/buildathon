import express, { Request, Response } from 'express';
//@ts-ignore
import {jwt} from 'jsonwebtoken';
import { z } from 'zod';
import { GoogleGenAI } from "@google/genai";

import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
const multer = require('multer');
const { Deepgram } = require('@deepgram/sdk');
const fs = require('fs');
const path = require('path');

const Interviewrouter = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = "Aryan";
const upload= multer({dest: 'uploads/'});
const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
const deepgram = new Deepgram(DEEPGRAM_API_KEY);

interface MulterRequest extends Request {
    file?: Express.Multer.File;
  }


const ai = new GoogleGenAI({ apiKey: "GEMINI_API_KEY" });


Interviewrouter.post('/giveInterview', upload.single('audio'), async (req: MulterRequest, res: Response)=>{
    try {
        if(!req.file) return res.json({msg:'seem you did mike is off or you didnot speak'});

        const audioFile= path.join(__dirname, req.file.path)
        const buffer= readFileSync(audioFile);
        const transcription = await deepgram.transcription.preRecorded(
            { buffer, mimetype: req.file.mimetype },
            { punctuate: true, language: 'en-US' }
          );
          const transcript = transcription.results.channels[0].alternatives[0].transcript;
            //sending response to gemien to get text response ;
            const geminiReply = await ai.models.generateContent({
                model: "gemini-2.0-flash",  // You can choose another model if needed
                contents: transcript,  // The transcribed text
              });

          
      
          fs.unlinkSync(audioFile); // optional cleanup

    } catch (error) {
        console.error('Transcription error:', error);
        res.status(500).json({ msg: 'Transcription failed' });
    }

    
})
