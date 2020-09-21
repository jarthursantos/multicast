export class Employee {
  public code: number
  public name: string
  public sector: string
  public func?: string
  public type?: 'F' | 'M' | 'A'
  public situation?: 'I' | 'A'

  constructor(data: Employee) {
    Object.assign(this, data)
  }
}
