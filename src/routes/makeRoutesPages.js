import checkRights from "../middlewares/checkRights.js"
import mw from "../middlewares/mw.js"
import auth from "../middlewares/auth.js"
import PageModel from "../db/models/PageModel.js"
import validate from "../middlewares/validate.js"
import {
  queryLimitValidator,
  queryOffsetValidator,
} from "../validators/validator.js"
import { pageValidator } from "../validators/pageValidator.js"
import { titleValidator } from "../validators/validator.js"
import { NotConnectedError } from "../errors.js"

const makeRoutesPages = ({ app }) => {
  app.get(
    "/pages",
    auth,
    checkRights,
    validate({
      query: {
        limit: queryLimitValidator,
        offset: queryOffsetValidator,
      },
    }),
    mw(async (req, res) => {

      const limit = req.data.query.limit
      const offset = req.data.query.offset

      res.send(await PageModel.getAllPages(req.session.isLogged, { limit, offset }))
    })
  )

  app.get(
    "/pages/:slugURL",
    auth,
    checkRights,
    validate({
      params: {
        slugURL: pageValidator.slugUrlValidator.required(),
      },
      query: {
        limit: queryLimitValidator,
        offset: queryOffsetValidator,
      },
    }),
    mw(async (req, res) => {
      res.send(
        await PageModel.getPage(req.params.slugURL, req.session.isLogged)
      )
    })
  )

  app.post(
    "/pages",
    auth,
    checkRights,
    validate({
      body: {
        title: titleValidator.label("Title").required(),
        content: pageValidator.contentValidator.required(),
        slugURL: pageValidator.slugUrlValidator.required(),
        publish: pageValidator.publishValidator,
      },
    }),
    mw(async (req, res) => {
      res.send(await PageModel.postPage(req.body, req.session.user.id))
    })
  )

  app.patch(
    "/pages/:slugURL",
    auth,
    checkRights,
    validate({
      body: {
        title: titleValidator,
        content: pageValidator.contentValidator,
        publish: pageValidator.publishValidator,
      },
    }),
    mw(async (req, res) => {
      const slugURL = req.params.slugURL

      if (!req.session.isLogged) {
        throw new NotConnectedError()
      }

      res.send(
        await PageModel.patchPage(slugURL, req.body, req.session.user.id)
      )
    })
  )

  app.delete(
    "/pages/:slugURL",
    auth,
    checkRights,
    validate({
      params: {
        slugURL: pageValidator.slugUrlValidator.required(),
      },
    }),
    mw(async (req, res) => {
      res.send(
        await PageModel.deletePage(req.params.slugURL, req.session.user.id)
      )
    })
  )
}

export default makeRoutesPages
