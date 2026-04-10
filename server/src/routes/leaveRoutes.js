const {Router} = require('express')
const { createLeave, getLeaves, updateLeaveStatus } = require('../controllers/leaveController')
const { protect, protectAdmin } = require('../middlewares/auth')
const leaveRouter = Router()

leaveRouter.post('/', protect,createLeave)
leaveRouter.get('/',protect,getLeaves)
leaveRouter.patch('/',protect, protectAdmin ,updateLeaveStatus)

module.exports = leaveRouter