import "dotenv/config"
import { resolve } from "node:path"
import * as yup from "yup"

const validationConfigSchema = yup.object().shape({
  port: yup.number().min(80).max(65535).required(),
  db: yup.object().shape({
    client: yup.string().oneOf(["pg", "mysql"]).default("pg"),
    connection: yup.object().shape({
      database: yup.string().min(1).required(),
    }),
  }),
  security: yup.object().shape({
    jwt: yup.object().shape({
      secret: yup.string().min(30).required(),
    }),
  }),
})

let config = null

try {
  config = validationConfigSchema.validateSync({
    port: process.env.PORT,
    db: {
      client: process.env.DB_CLIENT,
      connection: {
        database: process.env.DB_CONNECTION_DATABASE,
        user: process.env.DB_CONNECTION_USER,
        password: process.env.DB_CONNECTION_PASSWORD,
      },
      migrations: {
        directory: resolve("./src/db/migrations"),
        stub: resolve("./src/db/migration.stub"),
      },
      seeds: {
        directory: "./src/db/seeds",
      },
    },
    security: {
      jwt: {
        secret: process.env.SECURITY_JWT_SECRET,
        expiresIn: "2 hours",
      },
      password: {
        saltlen: 32,
        iterations: 8888,
        keylen: 256,
        digest: "sha384",
      },
    },
    pagination: {
      limit: {
        min: 1,
        max: 50,
        default: 10,
      },
    },
  })
} catch (error) {
  // eslint-disable-next-line no-console
  throw new Error(`Invalid config params :  ${error.errors.join("\n- ")}
`)
}

export default config
