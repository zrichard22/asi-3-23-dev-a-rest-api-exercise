const extract = (keys) => {
  const subExtract = (obj) =>
    Array.isArray(obj)
      ? obj.map(subExtract)
      : keys.reduce((sanitized, key) => ({ ...sanitized, [key]: obj[key] }), {})

  return subExtract
}

export const sanitizeUser = extract([
  "id",
  "firstname",
  "lastname",
  "email",
  "idRole",
])

export const sanitizePage = extract([
    "id",
    "title",
    "content",
    "slugURL",
    "idCreator",
    "publishedAt",
    ])


