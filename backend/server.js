import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 9000

app.get('/',(req,res)=>{
    res.send("Welcome to Ajjiyoo API")
})

app.listen(PORT, ()=>{
    console.log(`Server is Running on ${PORT} PORT`);
    
})