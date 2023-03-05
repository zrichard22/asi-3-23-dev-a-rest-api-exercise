export const up = async (knex) => {
    await knex.schema.createTable("users", (table) => {
        table.increments("id").primary()
        table.integer("idRole").notNullable().defaultTo(2)
        table.text("email").unique().notNullable()
        table.text("passwordHash").notNullable()
        table.text("passwordSalt").notNullable()
        table.text("firstname").notNullable()
        table.text("lastname").notNullable()
        table.foreign("idRole").references("roles.id")
        table.datetime("deletedAt")
    })
}

export const down = async (knex) => {
    await knex.schema.dropTable("users")
}