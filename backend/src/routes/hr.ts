import express, { Request, Response } from 'express';
//@ts-ignore
import {jwt} from 'jsonwebtoken';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { create } from 'domain';

const Hrrouter = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = "Aryan";

const hrDetails= z.object({
    company: z.string(),
    companyVerified: z.boolean(),
    mail: z.string().email(),
    contact: z.string().min(10).max(10),



})

const jobDetails= z.object({
    position: z.string(),
    description:z.string()


})

Hrrouter.post('/RegisterCompany', async ( req: Request, res: Response)=>{
    const HrDeatils= req.body();
    const result= hrDetails.safeParse(HrDeatils);
    if(!result.success) return res.json({msg: 'infomation is invlaid check again'});
    try {
        const result= prisma.company.findUnique({
            where:{
                mail: HrDeatils.mail
            }
        })
        if(result) return res.json({msg: 'hey you are alredy registred!.'})
        await prisma.company.create({
         company: HrDeatils.company,
         mail: HrDeatils.mail ,
         contact: HrDeatils.contact,

    })
        
    } catch (error) {
        return res.json({msg: 'hey could not register you company!'})
        
    }



}) 


Hrrouter.post('/JobPosting', async ( req: Request, res: Response)=>{
    const jobDetailsInfo= req.body;
    const result= jobDetails.safeParse(jobDetailsInfo);
    if(!result.success) return res.json({msg: 'hey could not post the job'});
    await prisma.job.create({
        position: jobDetailsInfo.position,
        discription: jobDetailsInfo.position,
    })

    return res.json({msg:" your job is posted !!"});



})

Hrrouter.post('/JobDelete', async ( req: Request, res: Response)=>{
    const {jobId}= req.body;
    if(!jobId) return res.json({msg: "Job id is not valid make sure it exists."})
    try {
        await prisma.job.delete({
            where:{
               id: jobId
            }
        })
    } catch (error) {
        return res.json({msg:"could not remove the job now try again!"});

        
    }


    return res.json({msg:" your job is removed  !!"});
    


})

