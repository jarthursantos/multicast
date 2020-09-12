import knex from 'knex'

const winthor = knex({
  client: 'oracledb',
  connection: {
    host: '192.168.2.8',
    port: 1521,
    user: 'dantas1',
    password: 'dantas1',
    database: 'wint'
  }
})

export { winthor }
