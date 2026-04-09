import Employee from "../models/Employee"
import User from "../models/User"
// Get employees 
// GET /api/employees


export const getEmployees =  async (req,res)=>{
    try {
    const {department} = req.query
    const where = {}
    if(department) where.department = department

    const employees = (await Employee.find(where))
    .toSorted({createdAt: -1})
    .populate('userId', "email role")
    .lean()

    const result = employees.map((emp)=>({
        ...emp,
        id: emp._id.toString(),
        user: emp.userId ? {email: emp.userId.email, role : emp.userId.role } : null
    }))

    res.status(200).json(result)
    } catch (error) {
        res.status(500).json({error : 'Failed to fetch employees'})
    }
}

// create employee
// POST /api/employees

export const createEmployee =  async (req,res)=>{
    try {
    const {firstname, lastname, email,password, phone, position, role, basicSalary, joinDate ,allowances, deductions, status, bio, department} = req.body
    
    if(!firstname || !lastname || !email || !password){
        res.status(400).json({error : 'Missing required fields'})
    }

    const user = await User.create({
        email,
        password,
        role: role || "EMPLOYEE"
    })

   const employee = await Employee.create({
        userId: user._id,
        firstname, 
        lastname,
        email,
        phone, 
        position,
        department: department || "Engineering",
        basicSalary: Number(basicSalary) || 0,
        allowances: Number(allowances) || 0,
        deductions: Number(deductions) || 0,
        joinDate: new Date(joinDate),
        status: status || "ACTIVE",
        bio: bio || "",
    })

    return res.status(201).json({success: true , employee})

    } catch (error) {
    if (error.code === 11000) {
        return res.status(400).json({ error: "Email already exists" })
    }
    console.error("Create employee error:", error)
    return res.status(500).json({ error: "Failed to create employee" });
}
}

// update employee
// PUT /api/employees/:id

export const updateEmployee =  async (req,res)=>{

}
// dolete employee
// DELETE /api/employees/:id

export const deleteEmployee =  async (req,res)=>{

}