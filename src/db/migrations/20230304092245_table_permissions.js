export const up = async (knex) => {
  await knex.schema.createTable("permissions", (table) => {
    table.increments("id").primary()
    table.integer("idRole").notNullable()
    table.integer("idFeature").notNullable()
    table.integer("idAction").notNullable()
    table.boolean("ownerOnly").notNullable().defaultTo(false)
    table.foreign("idRole").references("roles.id")
    table.foreign("idFeature").references("features.id")
    table.foreign("idAction").references("actions.id")
  })

  await knex("permissions").insert([
    { idRole: 4, idAction: 1, idFeature: 1 },
    { idRole: 4, idAction: 4, idFeature: 1 },
    { idRole: 1, idAction: 2, idFeature: 1, ownerOnly: true },
    { idRole: 4, idAction: 2, idFeature: 1 },
    { idRole: 1, idAction: 3, idFeature: 1, ownerOnly: true },
    { idRole: 4, idAction: 3, idFeature: 1 },
    { idRole: 3, idAction: 1, idFeature: 2 },
    { idRole: 1, idAction: 2, idFeature: 2 },
    { idRole: 1, idAction: 3, idFeature: 2 },
    { idRole: 3, idAction: 4, idFeature: 2 },
    { idRole: 3, idAction: 1, idFeature: 3 },
    { idRole: 1, idAction: 2, idFeature: 3 },
    { idRole: 3, idAction: 3, idFeature: 3 },
    { idRole: 3, idAction: 4, idFeature: 3 },
  ])
}

export const down = async (knex) => {
  await knex.schema.dropTable("permissions")
}
