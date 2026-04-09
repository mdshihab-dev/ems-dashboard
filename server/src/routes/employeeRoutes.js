const { Router } = require('express')
const { getEmployees, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeControllers')
const employeeRouter = Router()


employeeRouter.get('/', getEmployees)
employeeRouter.post('/', createEmployee)
employeeRouter.put('/', updateEmployee)
employeeRouter.delete('/', deleteEmployee)

module.exports = employeeRouter