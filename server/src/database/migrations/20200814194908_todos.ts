import * as Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('todos', table => {
    table.increments('id')
    table.string('title')
      .notNullable()
    table.boolean('completed')
      .defaultTo(false)
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('todos')
}
