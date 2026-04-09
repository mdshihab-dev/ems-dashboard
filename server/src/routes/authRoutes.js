const { Router } = require('express')
const { login, session, changePassword } = require('../controllers/authControllers')
const { protect } = require('../middlewares/auth')
const authRouter = Router()

authRouter.post('/login',login)
authRouter.get('/session',protect,session)
authRouter.post('/change-password',protect,changePassword)

module.exports = authRouter