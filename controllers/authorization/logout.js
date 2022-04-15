import { HttpCode } from '../../libs/constants.js'
import AuthService from '../../service/authorization.js'

const authService = new AuthService()

const logout = async (req, res, next) => {
  try {
    await authService.setToken(req.user.id, null)
    res
      .status(HttpCode.NO_CONTENT)
      .json({ status: 'success', code: HttpCode.NO_CONTENT })
  } catch (err) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      code: HttpCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    })
  }
}

export default logout
