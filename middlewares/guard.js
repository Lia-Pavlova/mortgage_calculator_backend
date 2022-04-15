import jwt from 'jsonwebtoken'
import repositoryUsers from '../repository/authorization.js'
import { HttpCode } from '../libs/constants.js'

const SECRET_KEY = process.env.JWT_SECRET_KEY

const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, SECRET_KEY)
    return !!verify
  } catch (error) {
    return false
  }
}

const guard = async (req, res, next) => {
  const token = req.get('authorization')?.split(' ')[1]
  const isValidToken = verifyToken(token)
  if (!isValidToken) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Not authorized',
    })
  }
  const payload = jwt.decode(token)
  const user = await repositoryUsers.findById(payload.id)
  if (!user || user.token !== token) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Not authorized',
    })
  }
  req.user = user
  next()
}

export default guard
