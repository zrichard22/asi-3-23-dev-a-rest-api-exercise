export const up = async (knex) => { 
    await knex.schema.createTable("actions", (table) => {
        table.increments("id").primary()
        table.text("name").notNullable()
        table.text("method").notNullable()
    })
    
    await knex("actions").insert([
      { name: "Create", method: "POST" },
      { name: "Read", method: "GET" },
      { name: "Update", method: "PATCH" },
      { name: "Delete", method: "DELETE" },
    ])
}

export const down = async (knex) => {
    await knex.schema.dropTable("actions")
}