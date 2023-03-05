import * as yup from "yup"
import config from "../config.js"

export const idValidator = yup.number().integer().positive().label("Id")

export const nameValidator = yup
  .string()
  .matches(/^[\p{L} -]+$/u, "Name is invalid")
  .label("Name")

export const titleValidator = yup.string().label("Name")

export const queryLimitValidator = yup
  .number()
  .integer()
  .min(config.pagination.limit.min)
  .default(config.pagination.limit.default)
  .label("Query Limit")

export const queryOffsetValidator = yup
  .number()
  .integer()
  .min(0)
  .label("Query Offset")
