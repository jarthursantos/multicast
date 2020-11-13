export interface IClassRepository {
  findMany(): Promise<string[]>
}
