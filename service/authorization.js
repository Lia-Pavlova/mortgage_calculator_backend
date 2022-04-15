import jwt from 'jsonwebtoken'
import usersRepository from '../repository/authorization.js'

const SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthService {
  async isUserExist(email) {
    const user = await usersRepository.findByEmail(email)
    return !!user
  }

  async create(body) {
    const { email } = await usersRepository.create(body)
    return { email }
  }

  async getUser(email, password) {
    const user = await usersRepository.findByEmail(email)
    const isValidPassword = await user?.isValidPassword(password)
    if (!isValidPassword) {
      return null
    }
    return user
  }

  getToken(user) {
    const id = user.id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '6h' })
    return token
  }

  async setToken(id, token) {
    await usersRepository.updateToken(id, token)
  }
}

export default AuthService
