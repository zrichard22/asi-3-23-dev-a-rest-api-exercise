import BaseModel from "./BaseModel.js"
import hashPassword from "../../passwordSecurity.js"

class UserModel extends BaseModel {
  static tableName = "users"

  static relationMappings = {
    roles: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: "RoleModel",
      join: {
        from: "users.idRole",
        to: "roles.id",
      },
    },
  }

  static checkEmailExist = async (email) => {
    const result = await UserModel.query()
      .where("email", email)
      .whereNull("deletedAt")

    return result.length > 0
  }

  static getAllUsers = async ({ limit, offset }) => {
    return await UserModel.query()
      .whereNull("deletedAt")
      .limit(limit)
      .offset(offset)
  }

  static getUser = async (idUser) => {
    return await UserModel.query().where("id", idUser).whereNull("deletedAt")
  }

  static postUser = async (userData, canEditRole = false) => {
    if (!canEditRole) {
      delete userData.idRole
    }

    const { password, ...data } = userData
    const [passwordHash, passwordSalt] = await hashPassword(password)

    return await UserModel.query().insert({
      ...data,
      passwordHash,
      passwordSalt,
    })
  }

  static patchUser = async (idUser, userData, canEditRole = false) => {
    if (!canEditRole) {
      delete userData.idRole
    }

    const { password, ...data } = userData
    const [passwordHash, passwordSalt] = await hashPassword(password)

    return await UserModel.query().patchAndFetchById(idUser, {
      ...data,
      passwordHash,
      passwordSalt,
    })
  }

  static deleteUser = async (id) => {
    return await UserModel.query()
      .patch({ deletedAt: new Date() })
      .findById(id)
      .returning("*")
      .first()
  }
}

export default UserModel
