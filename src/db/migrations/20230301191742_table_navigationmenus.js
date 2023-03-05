export const up = async (knex) => {
  await knex.schema.createTable("navMenus", (table) => {
    table.increments("id").primary()
    table.integer("idParent").references("navMenus.id").nullable()
    table.text("name").notNullable()
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("navMenus")
}
