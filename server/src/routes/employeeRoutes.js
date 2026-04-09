const { Router } = require('express')
const { getEmployees, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeControllers')
const { protect, protectAdmin } = require('../middlewares/auth')
const employeeRouter = Router()


employeeRouter.get('/', protect,protectAdmin, getEmployees)
employeeRouter.post('/',protect,protectAdmin, createEmployee)
employeeRouter.put('/id:',protect,protectAdmin, updateEmployee)
employeeRouter.delete('/id:',protect,protectAdmin, deleteEmployee)

module.exports = employeeRouter