import { Router } from 'express'
import {
  registration,
  login,
  logout,
} from '../../controllers/authorization/index.js'
import guard from '../../middlewares/guard.js'
import { addUserValidate } from '../../middlewares/userValidate.js'

const router = Router()

router.post('/registration', addUserValidate, registration)
router.post('/login', login)
router.post('/logout', guard, logout)

export default router
