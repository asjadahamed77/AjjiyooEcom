import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import connectDB from './config/mongodb.js';
const app = express()
app.use(express.json())
app.use(cors())




const PORT = process.env.PORT || 3000

connectDB()

app.get('/',(req,res)=>{
    res.send("Welcome to Ajjiyoo API")
})

app.listen(PORT, ()=>{
    console.log(`Server is Running on ${PORT} PORT`);
    
})