export const up = async (knex) => {
  await knex.schema.createTable("roles", (table) => {
    table.increments("id").primary()
    table.text("name").notNullable()
  })

  await knex("roles").insert([
    { name: "all" },
    { name: "editor" },
    { name: "manager" },
    { name: "admin" },
  ])
}

export const down = async (knex) => {
  await knex.schema.dropTable("roles")
}
