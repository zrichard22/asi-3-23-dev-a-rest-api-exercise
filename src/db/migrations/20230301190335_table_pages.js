export const up = async (knex) => {
  await knex.schema.createTable("pages", (table) => {
    table.increments("id").primary()
    table.text("title").notNullable()
    table.text("content")
    table.text("slugURL").notNullable().unique()
    table.integer("idCreator").notNullable()
    table.foreign("idCreator").references("users.id")
    table.dateTime("publishedAt")
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("pages")
}
