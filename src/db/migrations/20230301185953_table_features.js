export const up = async (knex) => {
  await knex.schema.createTable("features", (table) => {
    table.increments("id").primary()
    table.text("name").notNullable()
    table.text("route").notNullable()
  })

  await knex("features").insert([
    { name: "Users", route: "users" }, // 1
    { name: "Pages", route: "pages" }, // 2
    { name: "NavigationMenus", route: "nav-menus" }, // 3

  ])
}

export const down = async (knex) => {
  await knex.schema.dropTable("features")
}
