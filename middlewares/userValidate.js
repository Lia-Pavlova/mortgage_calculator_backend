import Joi from 'joi'

const addUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
})

export const addUserValidate = async (req, res, next) => {
  try {
    await addUserSchema.validateAsync(req.body)
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Field : ${err.message.replace(/"/g, '')}` })
  }
  next()
}
