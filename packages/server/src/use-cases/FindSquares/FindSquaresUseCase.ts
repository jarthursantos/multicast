import { ISquareRepository } from 'repositories/ISquareRepository'

export class FindSquaresUseCase {
  constructor(private squareRepository: ISquareRepository) {}

  async execute() {
    const squares = await this.squareRepository.findMany()

    return squares
  }
}
