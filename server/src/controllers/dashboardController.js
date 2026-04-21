const Employee = require('../models/Employee')
const Attendence = require('../models/Attendence')
const LeaveApplication = require('../models/LeaveApplication')
const Payslip = require('../models/Payslip')
const DEPARTMENTS = require("../constants/departments");

// Get dashboard for Employee and Admin
// GET /api/dashboard


const getDashboard = async (req,res)=>{
    try {
        const session = req.session;
        console.log(session)
    if (session.role === "ADMIN") {
    const [totalEmployees, todayAttendance, pendingLeaves] = await Promise.all([
        Employee.countDocuments({ isDeleted: { $ne: true } }),
        Attendence.countDocuments({
        date: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
            $lt: new Date(new Date().setHours(24, 0, 0, 0)),
        }
        }),
        LeaveApplication.countDocuments({ status: "PENDING" })
    ])

    return res.json({
        role: "ADMIN",
        totalEmployees,
        totalDepartments: DEPARTMENTS.length,
        todayAttendance,
        pendingLeaves
    })
    } else {
    const employee = await Employee.findOne({
        userId: session.userId,
    }).lean();

  if (!employee) return res.status(404).json({ error: "Employee not found" });

    const today = new Date();

    const [currentMonthAttendance, pendingLeaves, latestPayslip] = await Promise.all([
        Attendence.countDocuments({
        employeeId: employee._id,
        date: {
            $gte: new Date(today.getFullYear(), today.getMonth(), 1),
            $lt: new Date(today.getFullYear(), today.getMonth() + 1, 1),
        }
        }),

        LeaveApplication.countDocuments({
        employeeId: employee._id,
        status: "PENDING",
        }),
        
        Payslip.findOne({ employeeId: employee._id })
        .sort({ createdAt: -1 })
        .lean(),
  ])

  return res.json({
    role: "EMPLOYEE",
    employee: { ...employee, id: employee._id.toString() },
    currentMonthAttendance,
    pendingLeaves,
    latestPayslip: latestPayslip
      ? { ...latestPayslip, id: latestPayslip._id.toString() }
      : null
     })
}

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = getDashboard