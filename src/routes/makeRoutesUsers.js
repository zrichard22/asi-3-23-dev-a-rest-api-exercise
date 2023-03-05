import auth from "../middlewares/auth.js"
import checkRights from "../middlewares/checkRights.js"
import mw from "../middlewares/mw.js"
import UserModel from "../db/models/UserModel.js"
import validate from "../middlewares/validate.js"
import { sanitizeUser } from "../sanitizers.js"
import {
  queryLimitValidator,
  queryOffsetValidator,
  idValidator,
} from "../validators/validator.js"
import userValidator from "../validators/userValidator.js"
import { InvalidCredentialsError, SelfAccessOnlyError } from "../errors.js"

const makeRoutesUsers = ({ app }) => {
  app.get(
    "/users",
    auth,
    checkRights,
    validate({
      query: {
        limit: queryLimitValidator,
        offset: queryOffsetValidator,
      },
    }),
    mw(async (req, res) => {
      if (!req.session.isLogged) {
        throw new InvalidCredentialsError()
      }

      const limit = req.data.query.limit 
      const offset = req.data.query.offset

      if (req.session.rights.ownerOnly) {
        res.send(sanitizeUser(await UserModel.getUser(req.session.user.id))[0])
      } else {
        res.send(sanitizeUser(await UserModel.getAllUsers({ limit, offset})))
      }
    })
  )

  app.get(
    "/users/:id",
    auth,
    checkRights,
    validate({
      params: {
        id: idValidator.required(),
      },
      query: {
        limit: queryLimitValidator,
        offset: queryOffsetValidator,
      },
    }),
    mw(async (req, res) => {
      if (
        req.session.rights.ownerOnly &&
        req.params.id !== req.session.user.id
      ) {
        throw new SelfAccessOnlyError()
      }

      res.send(sanitizeUser(await UserModel.getUser(req.params.id)))
    })
  )

  app.post(
    "/users",
    auth,
    checkRights,
    validate({
      body: {
        firstname: userValidator.firstNameValidator.required(),
        lastname: userValidator.lastNameValidator.required(),
        email: userValidator.emailValidator.required(),
        password: userValidator.passwordValidator.required(),
        idRole: idValidator,
      },
      query: {
        limit: queryLimitValidator,
        offset: queryOffsetValidator,
      },
    }),
    mw(async (req, res) => {
      res.send(sanitizeUser(await UserModel.postUser(req.body, true)))
    })
  )

  app.patch(
    "/users",
    auth,
    checkRights,
    validate({
      body: {
        firstname: userValidator.firstNameValidator,
        lastname: userValidator.lastNameValidator,
        email: userValidator.emailValidator,
        password: userValidator.passwordValidator,
        idRole: idValidator,
      },
      query: {
        limit: queryLimitValidator,
        offset: queryOffsetValidator,
      },
    }),
    mw(async (req, res) => {
      res.send(
        sanitizeUser(await UserModel.patchUser(req.session.user.id, req.body))
      )
    })
  )

  app.patch(
    "/users/:id",
    auth,
    checkRights,
    validate({
      params: {
        id: idValidator.required(),
      },
      body: {
        firstname: userValidator.firstNameValidator,
        lastname: userValidator.lastNameValidator,
        email: userValidator.emailValidator,
        password: userValidator.passwordValidator,
        idRole: idValidator,
      },
      query: {
        limit: queryLimitValidator,
        offset: queryOffsetValidator,
      },
    }),
    mw(async (req, res) => {
      if (req.session.rights.ownerOnly) {
        throw new SelfAccessOnlyError()
      }

      res.send(
        sanitizeUser(await UserModel.patchUser(req.params.id, req.body, true))
      )
    })
  )

  app.delete(
    "/users/:id",
    auth,
    checkRights,
    validate({
      params: {
        id: idValidator.required(),
      },
      query: {
        limit: queryLimitValidator,
        offset: queryOffsetValidator,
      },
    }),
    mw(async (req, res) => {
      res.send(sanitizeUser(await UserModel.deleteUser(req.params.id)))
    })
  )
}

export default makeRoutesUsers
