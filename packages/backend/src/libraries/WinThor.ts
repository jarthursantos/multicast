import knex from 'knex'

import winthorConfigs from '~/configs/winthor'

const winthor = knex({ client: 'oracledb', connection: winthorConfigs })

export { winthor }
