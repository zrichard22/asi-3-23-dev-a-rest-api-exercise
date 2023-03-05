import BaseModel from "./BaseModel.js"

class PageHistoryModel extends BaseModel {
  static tableName = "pageHistories"

  static getHistory = async (idPage) => {
    return await this.query().where("idPage", idPage)
  }

  static insertHistory = async (data) => {
    return await this.query().insert(data)
  }

  static deleteHistory = async (idPage) => {
    return await this.query().where("idPage", idPage).delete()
  }
}

export default PageHistoryModel
