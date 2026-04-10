const { Router } = require('express')
const { session, changePassword, login } = require('../controllers/authControllers')
const {protect} = require('../middlewares/auth')
const authRouter = Router()

authRouter.post('/login', login)
authRouter.get('/session', protect,session)
authRouter.post('/change-password',protect,changePassword)

module.exports = authRouter