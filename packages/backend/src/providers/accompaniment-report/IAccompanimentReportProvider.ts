import { IAccompaniment } from '~/domain/IAccompaniment'
import { IFile } from '~/domain/IFile'
import { IOptions } from '~/models/accompaniment-products/IAccompanimentProductsModel'

export interface IAccompanimentReportProvider {
  generate(accompaniment: IAccompaniment, options?: IOptions): Promise<IFile>
}
