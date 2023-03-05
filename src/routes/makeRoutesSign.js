import jsonwebtoken from "jsonwebtoken"
import config from "../config.js"
import mw from "../middlewares/mw.js"
import userValidator from "../validators/userValidator.js"
import validate from "../middlewares/validate.js"
import hashPassword from "../passwordSecurity.js"
import UserModel from "../db/models/UserModel.js"
import { InvalidCredentialsError, EmailAlreadyExistError } from "../errors.js"
import { sanitizeUser } from "../sanitizers.js"

const makeRoutesSign = ({ app, db }) => {
  app.post(
    "/sign-up",
    validate({
      body: {
        firstname: userValidator.firstNameValidator.required(),
        lastname: userValidator.lastNameValidator.required(),
        email: userValidator.emailValidator.required(),
        password: userValidator.passwordValidator.required(),
      },
    }),
    mw(async (req, res) => {
      if (await UserModel.checkEmailExist(req.data.body.email)) {
        throw new EmailAlreadyExistError()
      }

      res.send(sanitizeUser(await UserModel.postUser(req.data.body)))
    })
  )

  app.post(
    "/sign-in",
    validate({
      body: {
        email: userValidator.emailValidator.required(),
      },
    }),
    mw(async (req, res) => {
      const { email, password } = req.data.body
      const [user] = await db("users")
        .where({ email })
        .whereNull("deletedAt")

      if (!user) {
        throw new InvalidCredentialsError()
      }

      const [passwordHash] = hashPassword(password, user.passwordSalt)

      if (passwordHash !== user.passwordHash) {
        throw new InvalidCredentialsError()
      }

      const token = jsonwebtoken.sign(
        {
          payload: {
            user: {
              id: user.id,
              fullname: `${user.firstname} ${user.lastname}`,
              idRole: user.idRole,
            },
          },
        },
        config.security.jwt.secret,
        { expiresIn: config.security.jwt.expiresIn }
      )

      res.send({ result: "Bearer " + token })
    })
  )
}
export default makeRoutesSign
