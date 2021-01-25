import knex from 'knex'

import winthorConfigs from '~/configs/winthor'

const winthor = knex({ client: 'oracledb', connection: winthorConfigs })
const postgreSQL = knex({
  client: 'pg',
  connection: {
    host: '192.168.2.3',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database: 'followup'
  }
})

export { winthor, postgreSQL }
