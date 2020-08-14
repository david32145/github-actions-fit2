import path from 'path'
import { exec } from 'child_process'
import rimraf from 'rimraf'
import { promisify } from 'util'

async function run () {
  const sqlitePath = path.resolve(__dirname, 'src', 'tmp', 'database.sqlite')
  await promisify(rimraf)(sqlitePath)
  await promisify(exec)('NODE_ENV=testing yarn knex --knexfile=./src/config/knexfile.ts migrate:latest')
}

export default async () => {
  await run()
}
