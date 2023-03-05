import jsonwebtoken from "jsonwebtoken"
import config from "../config.js"
import { InvalidSessionError } from "../errors.js"
import mw from "./mw.js"

const auth = mw(async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    req.session = { user: { idRole: 1 } }
    req.session.isLogged = false
    next()

    return
  }

  try {
    const { payload } = jsonwebtoken.verify(
      token.slice(7),
      config.security.jwt.secret
    )
    req.session = payload
    req.session.isLogged = true
  } catch (err) {
    if (err instanceof jsonwebtoken.JsonWebTokenError) {
      throw new InvalidSessionError()
    }

    throw err
  }

  next()
})

export default auth
