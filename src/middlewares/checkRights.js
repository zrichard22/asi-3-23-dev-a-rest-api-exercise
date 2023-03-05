import PermissionModel from "../db/models/PermissionModel.js"
import { InvalidAccessError, SelfAccessOnlyError } from "../errors.js"
import mw from "./mw.js"

const checkRights = mw(async (req, res, next) => {
  const { method, path } = req

  const rights = await PermissionModel.getPermission(
    req.session.user.idRole,
    path.split("/")[1],
    method
  )

  if (!rights) {
    throw new InvalidAccessError()
  }

  if (!req.params.idUser && path.split("/")[1] != "users") {
    rights.ownerOnly = false
  }

  req.params.id = req.params.id ? req.params.id : req.session.user.id

  if (rights.ownerOnly && req.params.id !== req.session.user.id) {
    throw new SelfAccessOnlyError()
  }

  req.session.rights = rights
  next()
})

export default checkRights
