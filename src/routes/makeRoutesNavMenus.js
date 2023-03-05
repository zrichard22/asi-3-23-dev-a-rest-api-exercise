import auth from "../middlewares/auth.js"
import checkRights from "../middlewares/checkRights.js"
import mw from "../middlewares/mw.js"
import NavMenuModel from "../db/models/NavMenuModel.js"
import validate from "../middlewares/validate.js"
import {
  queryLimitValidator,
  queryOffsetValidator,
  titleValidator,
  idValidator,
} from "../validators/validator.js"

const makeRoutesNavMenus = ({ app }) => {
  app.get(
    "/nav-menus",
    auth,
    validate({
      query: {
        limit: queryLimitValidator,
        offset: queryOffsetValidator,
      },
    }),
    checkRights,
    mw(async (req, res) => {
      res.send(await NavMenuModel.getMenus())
    })
  )

  app.get(
    "/nav-menus/:id",
    auth,
    validate({
      params: {
        id: idValidator.required(),
      },
      query: {
        limit: queryLimitValidator,
        offset: queryOffsetValidator,
      },
    }),
    checkRights,
    mw(async (req, res) => {
      res.send(await NavMenuModel.getMenu(req.params.id))
    })
  )

  app.post(
    "/nav-menus",
    auth,
    validate({
      body: {
        name: titleValidator.label("Name").required(),
        idParent: idValidator.label("idParent"),
      },
    }),
    checkRights,
    mw(async (req, res) => {
      res.send(await NavMenuModel.postMenu(req.body))
    })
  )
  app.patch(
    "/nav-menus/:id",
    auth,
    validate({
      body: {
        name: titleValidator.label("Name"),
        idParent: idValidator,
      },
    }),
    checkRights,
    mw(async (req, res) => {
      res.send(await NavMenuModel.patchMenu(req.params.id, req.body))
    })
  )

  app.patch(
    "/nav-menus/:id/add-page/:idPages",
    auth,
    validate({
      params: {
        id: idValidator.required(),
        idPages: idValidator.required(),
      },
    }),
    checkRights,
    mw(async (req, res) => {
      res.send(
        await NavMenuModel.patchMenuPage(req.params.id, req.params.idPages)
      )
    })
  )

  app.patch(
    "/nav-menus/:id/remove-page/:idPages",
    auth,
    validate({
      params: {
        id: idValidator.required(),
        idPages: idValidator.required(),
      },
    }),
    checkRights,
    mw(async (req, res) => {
      res.send(
        await NavMenuModel.deleteMenuPage(req.params.id, req.params.idPages)
      )
    })
  )

  app.delete(
    "/nav-menus/:id",
    auth,
    validate({
      params: {
        id: idValidator.required(),
      },
    }),
    checkRights,
    mw(async (req, res) => {
      res.send(await NavMenuModel.deleteMenu(req.params.id))
    })
  )
}

export default makeRoutesNavMenus
