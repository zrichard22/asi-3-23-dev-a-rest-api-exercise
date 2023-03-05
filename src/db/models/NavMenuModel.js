import BaseModel from "./BaseModel.js"
import NavMenuPageModel from "./NavMenuPageModel.js"

class NavMenuModel extends BaseModel {
  static tableName = "navMenus"

  static get relationMappings() {
    return {
      navMenuPages: {
        relation: BaseModel.HasManyRelation,
        modelClass: NavMenuPageModel,
        join: {
          from: "navMenus.id",
          to: "navMenuPages.idNavMenu",
        },
      },
      navMenus: {
        relation: BaseModel.HasManyRelation,
        modelClass: NavMenuModel,
        join: {
          from: "navMenus.id",
          to: "navMenus.idParent",
        },
      },
    }
  }

  static getMenu = async (id) => {
    const data = await this.query()
      .findById(id)
      .withGraphFetched("navMenuPages.[page]")
      .modifyGraph("navMenuPages", (builder) => {
        builder.select("")
      })
      .withGraphFetched("navMenus")
      .modifyGraph("navMenus", (builder) => {
        builder.select("id")
      })

    let children = []
    data.navMenus = data.navMenus.map((item) => item.id)

    if (data.navMenus.length > 0) {
      for (const item of data.navMenus) {
        const child = await this.getMenu(item)
        children.push(child)
      }
    }

    data.children = children

    return data
  }

  static getMenus = async () => {
    return await this.query()
  }

  static postMenu = async (data) => {
    return await this.query().insert(data)
  }

  static patchMenu = async (id, data) => {
    return await this.query().patchAndFetchById(id, data)
  }

  static deleteMenu = async (id) => {
    await NavMenuPageModel.deleteMenu(id)
    await this.query().patch({ idParent: null }).where("idParent", id)

    return await this.query().deleteById(id).returning("*").first()
  }

  static patchMenuPage = async (id, idPage) => {
    return await NavMenuPageModel.insertPageMenu(id, idPage)
  }
  static deleteMenuPage = async (id, idPage) => {
    return await NavMenuPageModel.deletePage(id, idPage)
  }
}

export default NavMenuModel
