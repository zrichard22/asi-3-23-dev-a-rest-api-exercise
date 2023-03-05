export const up = async (knex) => {
  await knex.schema.createTable("navMenuPages", (table) => {
    table.increments("id").primary()
    table.integer("idNavMenu").references("navMenus.id").nullable()
    table.integer("idPage").references("pages.id")
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("navMenuItems")
}
