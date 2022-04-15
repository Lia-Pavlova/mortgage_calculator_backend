import Bank from '../../models/bank.js'
import { HttpCode } from '../../libs/constants.js'

const banksList = async (req, res, _next) => {
  try {
    const { id: userId } = req.user
    const listBanks = await Bank.find({
      owner: userId,
    })
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: listBanks,
    })
  } catch (err) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      code: HttpCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    })
  }
}

export default banksList
