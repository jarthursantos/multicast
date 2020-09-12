import { config } from 'dotenv'

config()

const secret = process.env.APP_SECRET

export { secret }
