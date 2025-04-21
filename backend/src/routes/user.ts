import express, { Request, Response } from 'express';
//@ts-ignore
import {jwt} from 'jsonwebtoken';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = "Aryan";

// Zod schema for validation
const authSchema = z.object({
  username: z.string().min(5).max(20),
  password: z.string().min(6).max(10),
});

// ✅ REGISTER
router.post("/register", async (req: Request, res: Response) => {
  const { username, password, name, email } = req.body;

  const result = authSchema.safeParse({ username, password });
  if (!result.success) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await prisma.user.create({
      data: { username, password, name, email },
    });

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '5h' });

    return res.status(201).json({
      message: "User created successfully",
      token,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ LOGIN
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const result = authSchema.safeParse({ username, password });
  if (!result.success) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '5h' });

    return res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});



export default router;
