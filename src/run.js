import cors from "cors"
import express from "express"
import knex from "knex"
import morgan from "morgan"
import handleError from "./middlewares/handleError.js"
import BaseModel from "./db/models/BaseModel.js"
import * as routes from "./routes/export.js"

const run = async (config) => {
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use(morgan("dev"))
  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${config.port}`)
  })

  const db = knex(config.db)
  BaseModel.knex(db)
  routes.makeRoutesUsers({ app, db })
  routes.makeRoutesPages({ app, db })
  routes.makeRoutesNavMenus({ app, db })
  routes.makeRoutesSign({ app, db })

  app.use(handleError)

  app.use("*", (req, res) => {
    res.status(404).send({ error: ["Not found"], errorCode: "not_found" })
  })
}

export default run
