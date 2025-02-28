import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
const app = express()
app.use(express.json())
app.use(cors())




const PORT = process.env.PORT || 3000

connectDB()

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)

app.get('/',(req,res)=>{
    res.send("Welcome to Ajjiyoo API")
})

app.listen(PORT, ()=>{
    console.log(`Server is Running on ${PORT} PORT`);
    
})