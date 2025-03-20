import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import checkoutRouter from './routes/checkoutRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import subscribeRouter from './routes/subscriberRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import productAdminRouter from './routes/productAdminRoutes.js';
import adminOrderRouter from './routes/adminOrderRoutes.js';
const app = express()
app.use(express.json())
app.use(cors())




const PORT = process.env.PORT || 3000

connectDB()

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/checkout', checkoutRouter)
app.use('/api/orders', orderRouter)
app.use('/api/upload', uploadRouter)
app.use('/api', subscribeRouter)
app.use('/api/admin/users', adminRouter)
app.use('/api/admin/products', productAdminRouter)
app.use('/api/admin/orders', adminOrderRouter)

app.get('/',(req,res)=>{
    res.send("Welcome to Ajjiyoo API")
})

app.listen(PORT, ()=>{
    console.log(`Server is Running on ${PORT} PORT`);
    
})