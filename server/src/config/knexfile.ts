import 'ts-node/register'
import './env'
import path from 'path'

export default {
  testing: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, '..', 'tmp', 'database.sqlite')
    },
    useNullAsDefault: true,
    pool: { min: 0, max: 10, idleTimeoutMillis: 500 },
    migrations: {
      directory: path.resolve(__dirname, '..', 'database', 'migrations'),
      tableName: 'knex_migrations'
    }
  },
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      ssl: false
    },
    migrations: {
      directory: path.resolve(__dirname, '..', 'database', 'migrations'),
      tableName: 'knex_migrations'
    }
  },
  staging: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname, '..', 'database', 'migrations'),
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname, '..', 'database', 'migrations'),
      tableName: 'knex_migrations'
    }
  }
}
