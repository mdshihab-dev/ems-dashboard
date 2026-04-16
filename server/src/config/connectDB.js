const mongoose = require('mongoose')
let dns = require('dns');

// Set DNS servers to Google's public DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

 async function connectDB() {
    try {
       await mongoose.connect(process.env.MONGO_URI,{
        family: 4,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    })
       console.log('Database connected !')
    } catch (error) {
        console.error('Database connetion failed: ', error.message)
    }
 }

 module.exports = connectDB