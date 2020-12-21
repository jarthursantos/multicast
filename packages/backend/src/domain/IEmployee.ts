export interface IEmployee {
  code: number
  name: string
  sector: string
  func?: string
  type?: 'F' | 'M' | 'A'
  situation?: 'I' | 'A'
}
