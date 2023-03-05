export const up = async (knex) => {
    await knex.schema.createTable("roles", (table) => {
        table.increments("id").primary()
        table.text("name").notNullable()
    })

    await knex("roles").insert([
      { name: "all" }, // 1
      { name: "editor" }, // 2 
      { name: "manager" }, // 3
      { name: "admin" }, // 4
    ])
}

export const down = async (knex) => {
    await knex.schema.dropTable("roles")
}