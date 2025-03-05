import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from "cloudinary";
import streamifier from 'streamifier';
import 'dotenv/config';

const uploadRouter = express.Router();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

uploadRouter.post('/', upload.single('image'), async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        // Function to handle the stream upload to cloudinary
    const streamUpload = ((fileBuffer)=>{
        return new Promise((resolve, reject)=>{
            let stream = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                }
            );
            streamifier.createReadStream(fileBuffer).pipe(stream);
        })
    })     
    
    // Call the stream upload function
    const result = await streamUpload(req.file.buffer);
    res.status(201).json({image_url: result.secure_url});
    
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error.");
    }
})

export default uploadRouter;