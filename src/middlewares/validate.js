import * as yup from "yup"
import mw from "./mw.js"

const validate = (validators) =>
  mw(async (req, res, next) => {
    const { body, params, query } = validators

    try {
      ;[body, params, query].forEach((key) => {
        if (validators[key] && !req[key]) {
          throw new Error(`Missing ${key}`)
        }
      })

      req.data = await yup
        .object()
        .shape({
          ...(body ? { body: yup.object().shape(body) } : {}),
          ...(params ? { params: yup.object().shape(params) } : {}),
          ...(query ? { query: yup.object().shape(query) } : {}),
        })
        .validate(
          {
            params: req.params,
            query: req.query,
            body: req.body,
          },
          { abortEarly: false }
        )

      next()
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        res.status(400).json({ error: error.errors })
      }
    }
  })

export default validate
