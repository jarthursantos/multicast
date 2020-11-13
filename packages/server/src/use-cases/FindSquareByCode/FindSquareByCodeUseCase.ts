import { ISquareRepository } from 'repositories/ISquareRepository'

export class FindSquareByCodeUseCase {
  constructor(private squareRepository: ISquareRepository) {}

  async execute(code: number) {
    const square = await this.squareRepository.findById(code)

    return square
  }
}
