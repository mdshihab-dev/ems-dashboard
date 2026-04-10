const mongoose = require("mongoose");

const payslipSchema = new mongoose.Schema({
  employeeId: {type: mongoose.Schema.Types.ObjectId,ref: "Employee",required:true },
  month: {type: Number, required: true},
  year: {type: Number, required: true},
  basicSalary: { type: Number, default: 0},
  allowances: { type: Number, default: 0},
  deductions: { type: Number, default: 0},
  netSalary: {type: Number, required: true}
}, { timestamps: true });


const Payslip = mongoose.models.payslipSchema || mongoose.model("Attendance", payslipSchema);

module.exports = Payslip;