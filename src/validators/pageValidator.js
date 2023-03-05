import * as yup from "yup"

export const pageValidator = {
  contentValidator: yup.string().label("Content"),
  slugUrlValidator: yup
    .string()
    .label("Slug")
    .matches(/^[a-z0-9-]+$/u, "Slug is invalid"),
  publishValidator: yup.boolean().label("Publish"),
}
