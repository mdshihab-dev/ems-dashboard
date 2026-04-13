require('dotenv' ).config()
const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/connectDB')
const authRouter = require('./routes/authRoutes')
const employeeRouter = require('./routes/employeeRoutes')
const profileRouter = require('./routes/profileRoutes')
const attendanceRouter = require('./routes/attendenceRouter')
const leaveRouter = require('./routes/leaveRoutes')
const payslipRouter = require('./routes/payslipRouter')
const dashboardRouter = require('./routes/dashboardRouter')
const { serve } = require("inngest/express");
const { inngest, functions } = require("./inngest/index")
const { PORT , ORIGIN} = process.env

app.use(express.json())
app.use(cookieParser())
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
app.use('api/attendence',attendanceRouter)
app.use('api/leave',leaveRouter)
app.use('api/payslip',payslipRouter)
app.use('api/dashboard',dashboardRouter)

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));

app.listen(PORT , ()=> {
    console.log(`server is running on port ${PORT}`)
})