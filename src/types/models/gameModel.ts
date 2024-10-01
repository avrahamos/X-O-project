import { GameStatus } from "../../utils/statusEnum";

export class Game {
  constructor(
    public id: string,
    public playerX: string,
    public playerO: string,
    public userId: string,
    public board: string[][] = this.createEmptyBoard(),
    public status: string = GameStatus.Ongoing
  ) {}

  private createEmptyBoard(): string[][] {
    return [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }
}
