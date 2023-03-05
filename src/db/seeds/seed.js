import { faker } from "@faker-js/faker"
import config from "../../config.js"
import knex from "knex"

const db = knex(config.db)

await db("users").insert(
  [...Array(10)].map(() => {
    return {
      email: faker.internet.email(),
      passwordHash: faker.internet.password(),
      passwordSalt: faker.internet.password(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
    }
  })
)

await db("pages").insert(
  [...Array(20)].map(() => {
    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      slugURL: faker.lorem.slug(),
      idCreator: faker.datatype.number({ min: 1, max: 10 }),
      publishedAt: faker.date.past(),
    }
  })
)

await db("pageHistories").insert(
  [...Array(20)].map(() => {
    return {
      idPage: faker.datatype.number({ min: 1, max: 20 }),
      idUser: faker.datatype.number({ min: 1, max: 10 }),
      modifiedAt: faker.date.past(),
    }
  })
)

await db("navMenus").insert(
  [...Array(10)].map(() => {
    return {
      name: faker.lorem.word(),
    }
  })
)

await db("navMenus").insert(
  [...Array(10)].map(() => {
    return {
      name: faker.lorem.word(),
      idParent: faker.datatype.number({ min: 1, max: 10 }),
    }
  })
)

await db("navMenus").insert(
  [...Array(10)].map(() => {
    return {
      name: faker.lorem.word(),
      idParent: faker.datatype.number({ min: 1, max: 20 }),
    }
  })
)

await db("navMenuPages").insert(
  [...Array(10)].map(() => {
    return {
      idNavMenu: faker.datatype.number({ min: 1, max: 30 }),
      idPage: faker.datatype.number({ min: 1, max: 20 }),
    }
  })
)

process.exit(0)
