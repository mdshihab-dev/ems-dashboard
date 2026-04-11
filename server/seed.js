require('dotenv').config();
const connectDB = require('./src/config/connectDB');
const User = require('./src/models/User');

const TemporaryPassword = "admin123";

async function registerAdmin() {
    try {
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

        if (!ADMIN_EMAIL) {
            console.error('Missing ADMIN_EMAIL env variable');
            process.exit(1);
        }

        // Database connect kora hocche
        await connectDB();
        console.log("Database connected successfully...");

        const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });

        if (existingAdmin) {
            console.log("User already exists as role", existingAdmin.role);
            process.exit(0);
        }
        const admin = await User.create({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: "ADMIN",
    });

        console.log("Admin user created");
        console.log("\nemail:", admin.email);
        console.log("password:", TemporaryPassword);

        process.exit(0)
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}


registerAdmin();