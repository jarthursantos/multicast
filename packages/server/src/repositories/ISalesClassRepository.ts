export interface ISalesClassRepository {
  findMany(): Promise<string[]>
}
