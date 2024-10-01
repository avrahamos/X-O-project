import { Server, Socket } from "socket.io";
import { Game } from "../types/models/gameModel";
import { getFileData, saveFileData } from "../config/getData";
import { GameStatus } from "../utils/statusEnum";
import { checkGameOver, checkTie } from "../utils/XOlogic";

export default class GameService {
  public async handleMove(
    io: Server,
    socket: Socket,
    gameId: string,
    player: string,
    position: number[]
  ) {
    try {
      const games: Game[] = (await getFileData<Game>("games")) || [];
      const game = games.find((game) => game.id === gameId);

      if (!game) {
        return socket.emit("error", { message: "game not found" });
      }

      if (!game.board) {
        game.board = this.createEmptyBoard();
      }

      const [x, y] = position;
      if (game.board[x][y] !== "") {
        return socket.emit("error", { message: "The place is already taken" });
      }
      game.board[x][y] = player;

      io.to(gameId).emit("moveMade", {
        gameId,
        move: { player, position },
        status: GameStatus.Ongoing,
      });

      if (checkGameOver(game.board, player)) {
        game.status = GameStatus.Finished;
        io.to(gameId).emit("gameOver", {
          gameId,
          move: { player, position },
          status: GameStatus.Finished,
          result: `${player} wins`,
        });

        await saveFileData("games", games);
      } else if (checkTie(game.board)) {
        game.status = GameStatus.Finished;
        io.to(gameId).emit("gameOver", {
          gameId,
          move: { player, position },
          status: GameStatus.Finished,
          result: "draw",
        });

        await saveFileData("games", games);
      } else {
        await saveFileData("games", games);
      }
    } catch (error) {
      console.log("Error managing the move:", error);
    }
  }

  private createEmptyBoard(): string[][] {
    return [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }
}
