export interface IBranchRepository {
  findMany(): Promise<string[]>
}
