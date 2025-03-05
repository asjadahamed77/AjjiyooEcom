import express from "express"
import mongoose, { mongo } from "mongoose"

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    subscribedAt: {
        type: Date,
        default: Date.now,
    }
})

const subscribeModel = mongoose.models.subscribe || mongoose.model("subscribe", subscriberSchema);

export default subscribeModel;