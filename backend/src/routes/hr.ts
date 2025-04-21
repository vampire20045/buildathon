import express, { Request, Response } from 'express';
// @ts-ignore
import * as jwt from 'jsonwebtoken';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { authentication } from '../middleware/authentication';

const Hrrouter = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = "Aryan";  

// Validation schemas
const hrDetails = z.object({
  name: z.string(),
  mail: z.string().email(),
  contact: z.string().min(10).max(10),
  password: z.string(),
});

const jobDetails = z.object({
  position: z.string(),
  description: z.string(),
});

// Register Company - POST route
Hrrouter.post('/RegisterCompany', async (req: Request, res: Response) => {
  const HrDetails = req.body;

  console.log('Received HR Details:', HrDetails);

  const result = hrDetails.safeParse(HrDetails);

  if (!result.success) {
    console.error('Validation failed:', result.error.format());
    return res.json({ msg: 'Information is invalid. Check again.' });
  }

  try {
    const existing = await prisma.company.findUnique({
      where: { company_email: HrDetails.mail },
    });

    if (existing) {
      return res.json({ msg: 'Hey, you are already registered!' });
    }

    const newCompany = await prisma.company.create({
      data: {
        company_name: HrDetails.name,
        company_email: HrDetails.mail,
        company_phone: HrDetails.contact,
        password: HrDetails.password,
      },
    });

    // Generate JWT token after successful registration
    const token = jwt.sign(
      { companyId: newCompany.id },
      JWT_SECRET,
      { expiresIn: '5h' }  // Token expires in 5 hours
    );

    return res.json({ msg: 'Company registered successfully.', token });
  } catch (error) {
    console.error(error);
    return res.json({ msg: 'Could not register your company!' });
  }
});

// Company Login - POST route
Hrrouter.post('/LoginCompany', async (req: Request, res: Response) => {
  const { mail, password } = req.body;

  // Validate the provided data
  if (!mail || !password) {
    return res.status(400).json({ msg: 'Email and password are required' });
  }

  try {
    // Check if the company exists in the database
    const company = await prisma.company.findUnique({
      where: { company_email: mail },
    });

    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }

    // Check if the password is correct
    if (company.password !== password) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token after successful login
    const token = jwt.sign(
      { companyId: company.id },
      JWT_SECRET,
      { expiresIn: '5h' }  // Token expires in 5 hours
    );

    return res.json({ msg: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Internal error during login' });
  }
});

// POST Job - protected
Hrrouter.post('/JobPosting', authentication, async (req: Request, res: Response) => {
  const jobDetailsInfo = req.body;

  try {
    const companyId = (req as any).user?.companyId;
    console.log("Company ID from JWT:", companyId); // Log the companyId for debugging

    if (!companyId) {
      console.error("Missing companyId from JWT");
      return res.status(401).json({ msg: "Unauthorized. Invalid token." });
    }

    const job = await prisma.job.create({
      data: {
        position: jobDetailsInfo.position,
        discription: jobDetailsInfo.description,
        company_id: companyId,
      }
    });

    return res.json({ msg: "Your job is posted!!", job });
  } catch (err) {
    console.error("Job post error:", err);
    return res.status(500).json({ msg: "Internal error while posting job." });
  }
});


// DELETE Job - protected (changed to DELETE method)
Hrrouter.delete('/JobDelete', authentication, async (req: Request, res: Response) => {
  const { jobId } = req.body;
  if (!jobId) return res.json({ msg: "Job id is not valid." });

  try {
    await prisma.job.delete({
      where: {
        job_id: jobId
      }
    });
    return res.json({ msg: "Your job is removed!!" });
  } catch (error) {
    console.error(error);
    return res.json({ msg: "Could not remove the job. Try again!" });
  }
});
Hrrouter.get('/viewDashBoard', authentication, async (req: Request, res: Response) => {
  return res.json({ msg: 'Hey, your stats are empty for now.' });
});

export default Hrrouter;
