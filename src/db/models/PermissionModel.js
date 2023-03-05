import BaseModel from "./BaseModel.js"

class PermissionModel extends BaseModel {
  static tableName = "permissions"

  static getPermission = async (idRole, routes, method) => {
    const permission = await PermissionModel.query()
      .innerJoin("roles", "permissions.idRole", "roles.id")
      .innerJoin("features", "permissions.idFeature", "features.id")
      .innerJoin("actions", "permissions.idAction", "actions.id")
      .where("roles.id", "<=", idRole)
      .andWhere("features.route", routes)
      .andWhere("actions.method", method)
      .orderBy("roles.id", "desc")
      .first()

    return permission
  }

  static relationMappings = {
    role: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: "RoleModel",
      join: {
        from: "permissions.idRole",
        to: "roles.id",
      },
    },
    feature: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: "FeatureModel",
      join: {
        from: "permissions.idFeature",
        to: "features.id",
      },
    },
    action: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: "ActionModel",
      join: {
        from: "permissions.idAction",
        to: "actions.id",
      },
    },
  }
}

export default PermissionModel
