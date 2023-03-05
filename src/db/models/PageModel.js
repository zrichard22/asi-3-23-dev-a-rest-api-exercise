import BaseModel from "./BaseModel.js"
import PageHistoryModel from "./PageHistoryModel.js"
import { ExistSlugError, NotFoundError } from "../../errors.js"
import NavMenuItemModel from "./NavMenuPageModel.js"

class PageModel extends BaseModel {
  static tableName = "pages"

  static slugAlredyExist = async (slugURL) => {
    const result = await this.query().where("slugURL", slugURL)

    return result.length > 0
  }

  static getIdbySlug = async (slugURL) => {
    const page = await this.query().where("slugURL", slugURL).first()

    return page ? page.id : null
  }

  static getAllPages = async (isLogged = false, { limit, offset }) => {
    const pages = this.query().limit(limit).offset(offset)
    isLogged ? pages : pages.whereNotNull("publishedAt")

    return await pages
  }

  static getPage = async (slugURL, isLogged = false) => {
    const page = this.query().where("slugURL", slugURL)
    isLogged ? page : page.whereNotNull("publishedAt")

    return await page
  }

  static postPage = async (data, idUser) => {
    const { title, content, publish, slugURL } = data

    if (await this.slugAlredyExist(slugURL)) {
      throw new ExistSlugError()
    }

    const page = await this.query().insert({
      title,
      content,
      slugURL,
      idCreator: idUser,
      publishedAt: publish ? new Date() : null,
    })

    return page
  }

  static patchPage = async (slugURL, data, idUser) => {
    const { title, content, publish } = data

    const page = await this.query()
      .where("slugURL", slugURL)
      .patch({
        title,
        content,
        publishedAt: publish ? new Date() : null,
      })
      .returning("*")
      .first()

    await PageHistoryModel.insertHistory({
      idPage: page.id,
      idUser: idUser,
      modifiedAt: new Date(),
    })

    return page
  }

  static deletePage = async (slugURL) => {
    const id = await this.getIdbySlug(slugURL)

    if (!id) {
      throw new NotFoundError()
    }

    await PageHistoryModel.deleteHistory(id)
    await NavMenuItemModel.deletePageMenu(id)

    return await this.query()
      .where("slugURL", slugURL)
      .delete()
      .returning("*")
      .first()
  }
}

export default PageModel
