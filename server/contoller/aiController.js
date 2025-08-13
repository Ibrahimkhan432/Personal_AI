import OpenAI from "openai";
import sql from "../configs/db.js"
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary"
import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js'
import FormData from 'form-data';

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({ success: false, message: 'you have reached your limit , please upgrade your package to continue' })
        }
        // gemini api
        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: length,
        });

        const content = response.choices[0].message.content

        await sql`INSERT INTO creations (user_id,prompt,content,type)
        VALUES (${userId},${prompt},${content},'article')`;

        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }
        res.json({ success: true, content })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }

}
export const generateBlogTitle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({ success: false, message: 'you have reached your limit , please upgrade your package to continue' })
        }
        // gemini api
        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user", content: prompt,
                },],
            temperature: 0.7,
            max_tokens: 100,
        });

        const content = response.choices[0].message.content

        await sql`INSERT INTO creations (user_id,prompt,content,type)
        VALUES (${userId},${prompt},${content},'blog-title')`;

        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }
        res.json({ success: true, content })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }

}
export const generateImage = async (req, res) => {
    console.log("generateImage hit", { path: req.path, method: req.method, authHeader: !!req.headers.authorization });
    try {
        const { userId } = req.auth();
        console.log(userId);
        const { prompt, publish } = req.body;
        const plan = req.plan;

        if (plan !== 'premium') {
            return res.json({ success: false, message: 'you have reached your limit , please upgrade your package to continue' })
        }

        // clipdrop api
        const formData = new FormData()
        formData.append('prompt', prompt)
        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIP_DROP_API_KEY,
            },
            responseType: "arraybuffer"
        })
        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`

        const { secure_url } = await cloudinary.uploader.upload(base64Image)

        console.log(secure_url)

        await sql`INSERT INTO creations (user_id,prompt,content,type,publish)
        VALUES (${userId},${prompt},${secure_url},'image',${publish ?? false})`;

        res.json({ success: true, content: secure_url })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }

}
export const removeImageBackground = async (req, res) => {
    try {
        const { userId } = req.auth();
        console.log('User ID:', userId);
        const image = req.file;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (!image) {
            return res.json({ success: false, message: 'No image file provided' })
        }

        console.log('Image file:', {
            originalname: image.originalname,
            mimetype: image.mimetype,
            size: image.size,
            path: image.path
        });

        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({ success: false, message: 'you have reached your limit , please upgrade your package to continue' })
        }

        // Upload image to Cloudinary
        console.log('Uploading image to Cloudinary...');
        const { public_id } = await cloudinary.uploader.upload(image.path);
        console.log('Image uploaded with public_id:', public_id);
        
        // Use background removal transformation
        const secure_url = cloudinary.url(public_id, {
            transformation: [
                { effect: 'gen_remove:background' }
            ]
        });
        console.log('Generated URL with background removal:', secure_url);
        
        await sql`INSERT INTO creations (user_id,prompt,content,type)
        VALUES (${userId},'Remove background from Image',${secure_url},'image')`;

        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }

        res.json({ success: true, content: secure_url })
    } catch (error) {
        console.error('Error in removeImageBackground:', error);
        res.json({ success: false, message: error.message })
    }

}
export const removeImageObject = async (req, res) => {
    try {
        const { userId } = req.auth();
        console.log('User ID:', userId);
        const image = req.file;
        const { object } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (!image) {
            return res.json({ success: false, message: 'No image file provided' })
        }

        if (!object) {
            return res.json({ success: false, message: 'No object specified to remove' })
        }

        console.log('Image file:', {
            originalname: image.originalname,
            mimetype: image.mimetype,
            size: image.size,
            path: image.path
        });
        console.log('Object to remove:', object);

        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({ success: false, message: 'you have reached your limit , please upgrade your package to continue' })
        }

        console.log('Uploading image to Cloudinary...');
        const { public_id } = await cloudinary.uploader.upload(image.path)
        console.log('Image uploaded with public_id:', public_id);

        const imageurl = cloudinary.url(public_id, {
            transformation: [{ effect: `gen_remove:${object}` }],
            resource_type: 'image'
        })
        console.log('Generated URL with object removal:', imageurl);
        
        await sql`INSERT INTO creations (user_id,prompt,content,type)
        VALUES (${userId},${`Removed ${object} from image`},${imageurl},'image')`;

        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }

        res.json({ success: true, content: imageurl })
    } catch (error) {
        console.error('Error in removeImageObject:', error);
        res.json({ success: false, message: error.message })
    }

}
export const resumeReview = async (req, res) => {
    try {
        const { userId } = req.auth();
        console.log(userId);
        const resume = req.file;
        const { object } = req.body;
        const plan = req.plan;

        if (plan !== 'premium') {
            return res.json({ success: false, message: 'you have reached your limit , please upgrade your package to continue' })
        }

        if (resume.size > 5 * 1024 * 1024) {
            return res.json({ success: false, message: "Resume file size allowed only (5MB)." })
        }

        const dataBuffer = fs.readFileSync(resume.path)
        const pdfData = await pdf(dataBuffer)

        const prompt = `Review the following resume and provide feedback to its strengths and improvement. Resume Contant:\n\n${pdfData.text}`

        // gemini api
        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });

        const content = response.choices[0].message.content


        await sql`INSERT INTO creations (user_id,prompt,content,type)
        VALUES (${userId},${`Review the uploaded Resume`},${content},'resume-review')`;

        res.json({ success: true, content })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }

}