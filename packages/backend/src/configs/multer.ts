import multer, { Options } from 'multer'
import { resolve, extname } from 'path'
import { v4 as uuid } from 'uuid'

const options: Options = {
  dest: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    },
    filename: (_req, file, callback) => {
      const uniqueId = uuid()

      callback(null, `${uniqueId}${extname(file.originalname)}`)
    }
  })
}

export default options
