import Router from 'express'
import guard from '../../middlewares/guard.js'
import {
  createBank,
  editBank,
  deleteBank,
  banksList,
} from '../../controllers/banks/index.js'
import {
  createBankValidate,
  editBankValidate,
} from '../../middlewares/bankValidate.js'

const router = new Router()

router.get('/', guard, banksList)
router.post('/create', guard, createBankValidate, createBank)
router.put('/edit/:id', guard, editBankValidate, editBank)
router.delete('/delete/:id', guard, deleteBank)

export default router
