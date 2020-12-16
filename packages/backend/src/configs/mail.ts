import { normalizeInt } from '~/utilities/normalizations'

const options = {
  host: String(process.env.MAIL_HOST),
  port: normalizeInt(process.env.MAIL_PORT || ''),
  secure: false,
  auth: {
    user: String(process.env.MAIL_USER),
    pass: String(process.env.MAIL_PASS)
  }
}

export default options
