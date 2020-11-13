import { Accompaniment } from 'entities/Accompaniment'
import { File } from 'entities/File'
import { Options } from 'repositories/IAccompanimentProductsRepository'

export interface IAccompanimentReportProvider {
  generate(accompaniment: Accompaniment, options?: Options): Promise<File>
}
