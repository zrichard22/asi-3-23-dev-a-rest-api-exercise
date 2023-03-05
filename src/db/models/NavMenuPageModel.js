import BaseModel from "./BaseModel.js"
import NavMenuModel from "./NavMenuModel.js"
import PageModel from "./PageModel.js"

class NavMenuPageModel extends BaseModel {
  static tableName = "navMenuPages"


  static get relationMappings() {
    return {
      navMenu: {
        relation: BaseModel.HasOneRelation,
        modelClass: NavMenuModel,
        join: {
          from: "navMenuPages.idNavMenu",
          to: "navMenus.id",
        },
      },
      page: {
        relation: BaseModel.HasOneRelation,
        modelClass: PageModel,
        join: {
          from: "navMenuPages.idPage",
          to: "pages.id",
        },
      },
    }
  }

  static deletePageMenu = async (id) => {
    return await NavMenuPageModel.query().where("idPage", id).delete()
  }

  static insertPageMenu = async (idNavMenu, idPage) => {
    return await NavMenuPageModel.query().insert({ idNavMenu, idPage })
  }

  static deletePage = async (idNavMenu, idPage) => {
    return await NavMenuPageModel.query()
      .where("idNavMenu", idNavMenu)
      .andWhere("idPage", idPage)
      .delete()
      .returning("*")
      .first()
  }

  static deleteMenu = async (idNavMenu) => {
    return await NavMenuPageModel.query().where("idNavMenu", idNavMenu).delete()
  }
}

export default NavMenuPageModel
