const mongoose = require('mongoose')

 async function connectDB() {
    try {
       await mongoose.connect(process.env.MONGO_URI, ()=> console.log("Database connected"))
    } catch (error) {
        console.error('Database connetion failed ', error.message)
    }
 }

 module.exports = connectDB