import Bank from '../../models/bank.js'
import { HttpCode } from '../../libs/constants.js'

const createBank = async (req, res, _next) => {
  try {
    const { id: userId } = req.user
    const createBank = await Bank.create({ ...req.body, owner: userId })
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: createBank,
    })
  } catch (err) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      code: HttpCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    })
  }
}

export default createBank
