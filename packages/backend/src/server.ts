import '~/env'

import createDebuger from 'debug'
import http from 'http'

import { app } from '~/app'
import { normalizeInt } from '~/utilities/normalizations'
const debug = createDebuger('express:server')
const port = normalizeInt(process.env.PORT || 3000)

app.set('port', port)
app.disable('x-powered-by')

const server = http.createServer(app)

server.listen(port)

server.on('listening', () => {
  const addr = server.address()
  const bind =
    typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port || ''

  debug('Listening on ' + bind)
  console.log('Listening on ' + bind)
})
