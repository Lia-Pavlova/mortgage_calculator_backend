import Bank from '../../models/bank.js'
import { HttpCode } from '../../libs/constants.js'

const editBank = async (req, res, _next) => {
  try {
    const { id: userId } = req.user
    const { id } = req.params
    const editedBank = await Bank.findOneAndUpdate(
      { _id: id, owner: userId },
      { ...req.body },
      { new: true },
    )
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: editedBank,
    })
  } catch (err) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      code: HttpCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    })
  }
}

export default editBank
