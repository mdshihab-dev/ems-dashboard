const bcrypt = require('bcryptjs')

const mongoose =  require('mongoose')
const DEPARTMENTS = require('../constants/departments')
const EmployeeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },
    firstname: { type: String, required: [true , 'First name is required'] },
    lastname: { type: String, required: [true, 'Last name is required']},
    email: { type: String, required:[true, 'Email is required'], unique: true },
    password: { type: String, required: [true, 'Password number is required'] },
    phone: { type: String, required: [true, 'Phone number is required'] },
    position: { type: String, required: [true, 'Position is required'] },
    role: { type: String, enum: ["ADMIN", "EMPLOYEE"], default: "EMPLOYEE" },
    basicSalary: { type: Number, default: 0},
    allowances: { type: Number, default: 0},
    deductions: { type: Number, default: 0},
    status: {type: String , enum : ["ACTIVE","INACTIVE"] , default: 'ACTIVE'},
    joinDate: { type: Date , required: true},
    isDeleted: {type: Boolean, default: false},
    bio: {type: String, default: ''},
    department: {type: String , enum: DEPARTMENTS, default: "Engineering"}

}, { timestamps: true })

const Employee = mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema)

module.exports = Employee

 EmployeeSchema.pre('save', async function(next){
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next()
 })