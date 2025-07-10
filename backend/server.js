import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

const app= express()
const port= process.env.PORT || 4000;
connectDB()
connectCloudinary()
//  middlewares
app.use(express.json())  //request is passed using this method
app.use(cors()) // connect fronted with backend

// api endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user',userRouter)
//local host: 4000/api/add-doctor
app.get('/', (req, res)=>{
    res.send('API WORKING');
})
app.listen(port, ()=>console.log('Server Started', port));