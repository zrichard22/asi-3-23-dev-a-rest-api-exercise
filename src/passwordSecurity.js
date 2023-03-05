import { pbkdf2Sync, randomBytes } from "node:crypto"
import config from "./config.js"

const { saltlen, iterations, keylen, digest } = config.security.password

const hashPassword = (
  password,
  salt = randomBytes(saltlen).toString("hex")
) => [pbkdf2Sync(password, salt, iterations, keylen, digest).toString("hex"), salt]

export default hashPassword
