const mongoose =  require("mongoose");
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "EMPLOYEE"], default: "EMPLOYEE" },
}, { timestamps: true })


// encryt password before storing in database 
userSchema.pre('save', async function(next){
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next
})

const User = mongoose.models.User || mongoose.model("User", userSchema)
module.exports = User;