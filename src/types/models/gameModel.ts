import { GameStatus } from "../../utils/statusEnum";

export class Game {
  constructor(
    public id: string,
    public playerX: string,
    public playerO: string,
    public status: string = GameStatus.Ongoing
  ) {}
}
