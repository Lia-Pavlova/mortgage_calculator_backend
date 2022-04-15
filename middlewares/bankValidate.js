import Joi from 'joi'

const createBankSchema = Joi.object({
  bankName: Joi.string().required(),
  interestRate: Joi.number().positive().required(),
  maximumLoan: Joi.number().positive().required(),
  minimumDownPayment: Joi.number().positive().required(),
  loanTerm: Joi.number().positive().required(),
})

const editBankSchema = Joi.object({
  bankName: Joi.string().optional(),
  interestRate: Joi.number().positive().optional(),
  maximumLoan: Joi.number().positive().optional(),
  minimumDownPayment: Joi.number().positive().optional(),
  loanTerm: Joi.number().positive().optional(),
})

export const createBankValidate = async (req, res, next) => {
  try {
    await createBankSchema.validateAsync(req.body)
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Field : ${err.message.replace(/"/g, '')}` })
  }
  next()
}

export const editBankValidate = async (req, res, next) => {
  try {
    await editBankSchema.validateAsync(req.body)
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Field : ${err.message.replace(/"/g, '')}` })
  }
  next()
}
