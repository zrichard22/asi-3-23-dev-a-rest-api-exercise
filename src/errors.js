export class AppError extends Error {
  #errors = null
  #httpCode = null
  #errorCode = "error.app"

  constructor(errors = ["An error has occurred"], httpCode = 500, errorCode) {
    super(errors.join(" | "))

    this.#errors = errors
    this.#httpCode = httpCode
    this.#errorCode = errorCode
  }

  get errors() {
    return this.#errors
  }

  get httpCode() {
    return this.#httpCode
  }

  get errorCode() {
    return this.#errorCode
  }
}

export class NotFoundError extends AppError {
  constructor(errors = ["Not found"]) {
    super(errors, 404, "error.app.notFound")
  }
}

export class InvalidArgumentError extends AppError {
  constructor(errors = ["Invalid arguments"]) {
    super(errors, 422, "error.app.InvalidArgumentError")
  }
}

export class InvalidCredentialsError extends AppError {
  constructor(errors = ["Invalid credentials"]) {
    super(errors, 401, "error.app.InvalidCredentialsError")
  }
}

export class InvalidSessionError extends AppError {
  constructor(errors = ["Invalid session"]) {
    super(errors, 403, "error.app.InvalidSessionError")
  }
}

export class InvalidAccessError extends AppError {
  constructor(errors = ["Not enough permission."]) {
    super(errors, 403, "error.app.InvalidAccessError")
  }
}

export class SelfAccessOnlyError extends AppError {
  constructor(errors = ["You can only access your own data."]) {
    super(errors, 403, "error.app.InvalidAccessError")
  }
}

export class ExistSlugError extends AppError {
  constructor(errors = ["Slug already exist"]) {
    super(errors, 403, "error.app.InvalidAccessError")
  }
}

export class EmailAlreadyExistError extends AppError {
  constructor(errors = ["Email already exist"]) {
    super(errors, 409, "error.app.InvalidAccessError")
  }
}

export class NotConnectedError extends AppError {
  constructor(errors = ["Not connected"]) {
    super(errors, 403, "error.app.InvalidAccessError")
  }
}
