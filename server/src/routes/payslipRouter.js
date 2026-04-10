const { Router } = require('express')
const { createPayslip, getPayslips, getPayslipsById } = require('../controllers/payslipController')
const { protect, protectAdmin } = require('../middlewares/auth')
const payslipRouter = Router()

payslipRouter.post('/',protect,protectAdmin ,createPayslip)
payslipRouter.get('/',protect ,getPayslips)
payslipRouter.get('/:id',protect, getPayslipsById)

module.exports = payslipRouter