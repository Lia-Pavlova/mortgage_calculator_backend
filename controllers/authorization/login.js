import { HttpCode } from '../../libs/constants.js'
import AuthService from '../../service/authorization.js'

const authService = new AuthService()

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await authService.getUser(email, password)
    if (!user) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: 'Invalid credentials',
      })
    }
    const token = authService.getToken(user)
    await authService.setToken(user.id, token)
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      userData: { token, email },
    })
  } catch (err) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      code: HttpCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    })
  }
}

export default login
