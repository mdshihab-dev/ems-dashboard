require('dotenv' ).config()
const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const connectDB = require('./config/connectDB')
const authRouter = require('./routes/authRoutes')
const employeeRouter = require('./routes/employeeRoutes')
const profileRouter = require('./routes/profileRoutes')
const { PORT , ORIGIN} = process.env

app.use(express.json())
app.use(multer().none())
app.use(cors({
    origin : ORIGIN || "http://localhost:5173",
    credentials: true
}))

// Database connetion is currently pause 
// connectDB() 

// Routes
app.use('api/auth',authRouter)
app.use('api/employee',employeeRouter)
app.use('api/profile',profileRouter)

app.listen(PORT , ()=> {
    console.log(`server is running on port ${PORT}`)
})