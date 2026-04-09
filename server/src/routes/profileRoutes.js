const { Router } = require('express')
const { getProfile } = require('../controllers/profileControllers')
const { protect } = require('../middlewares/auth')
const profileRouter = Router()


profileRouter.get('/',protect,getProfile)
profileRouter.put('/',protect,getProfile)

module.exports = profileRouter
