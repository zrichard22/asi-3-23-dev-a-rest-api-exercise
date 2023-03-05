import * as yup from "yup"
import { nameValidator } from "./validator.js"

const userValidator = {
  firstNameValidator: nameValidator.label("First name"),
  lastNameValidator: nameValidator.label("Last name"),
  emailValidator: yup.string().email().label("Email"),
  passwordValidator: yup
    .string()
    .matches(
      /^(?=.*[^\p{L}0-9])(?=.*[0-9])(?=.*\p{Lu})(?=.*\p{Ll}).{8,}$/u,
      "Password must be at least 8 chars & contain at least one of each: lower case, upper case, digit, special char."
    )
    .label("Password"),
}

export default userValidator
