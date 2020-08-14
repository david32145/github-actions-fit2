import knex from 'knex'
const connection = require('../config/knexfile')

let Database: knex<any, unknown[]> | null = null

if (process.env.NODE_ENV === 'testing') {
  Database = knex(connection.testing)
}

if (process.env.NODE_ENV === 'development') {
  Database = knex(connection.development)
}

if (process.env.NODE_ENV === 'staging') {
  Database = knex(knex(connection.staging))
}

if (process.env.NODE_ENV === 'production') {
  Database = knex(knex(connection.development))
}

if (Database === null) {
  throw new Error("The NODE_ENV env var must be one last in 'testing', 'development', 'staging', 'production'")
}

export default Database!
