import Bank from '../../models/bank.js'
import { HttpCode } from '../../libs/constants.js'

const deleteBank = async (req, res, _next) => {
  try {
    const { id: userId } = req.user
    const { id } = req.params
    const deletedBank = await Bank.findOneAndRemove({
      _id: id,
      owner: userId,
    })
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: deletedBank,
    })
  } catch (err) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      code: HttpCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    })
  }
}

export default deleteBank
