import express from 'express';
import subscribeModel from '../models/Subscriber.js';

const subscribeRouter = express.Router();

// Handle newsletter subscription
subscribeRouter.post('/', async (req, res) => {
    const { email } = req.body;
    if(!email) {
        return res.status(400).json({ message: "Email is required." });
    }
    try {
       // Check if email is already subscribed
         const subscriber = await subscribeModel.findOne({email});
            if(subscriber) {
                return res.status(400).json({ message: "Email is already subscribed." });
            }
            // Create a new subscriber
            subscriber = new subscribeModel({email});
            await subscriber.save();

            res.status(201).json({message: "Subscribed successfully."});
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error.");
    }
});



export default subscribeRouter;