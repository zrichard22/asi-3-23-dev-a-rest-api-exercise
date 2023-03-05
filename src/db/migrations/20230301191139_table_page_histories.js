export const up = async (knex) => {
  await knex.schema.createTable("pageHistories", (table) => {
    table.increments("id").primary()
    table.integer("idPage").notNullable()
    table.integer("idUser").notNullable()
    table.foreign("idPage").references("pages.id")
    table.foreign("idUser").references("users.id")
    table.datetime("modifiedAt").notNullable()
  })
}

export const down = async (knex) => {
    await knex.schema.dropTable("pageHistories")
}
