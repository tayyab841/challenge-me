import { Request, Response } from 'express';

import Game from '../models/game';
import Player from '../models/player';

interface Game {
  id: string;
  playerOne: { id: string | undefined; name: string | undefined };
  playerTwo: { id: string | undefined; name: string | undefined };
}

export async function getGames(req: Request, res: Response) {
  const playerId = res.locals.signedInUser;
  try {
    const allGames: Game[] = [];
    const challengerGames = await Game.find({ player_one: playerId, in_progress: true });
    const challenger = await Player.findOne({ _id: playerId }).exec();
    const challengedIds = challengerGames.map((game) => game.player_two?.toString());
    const challengedNames = await Player.find({ _id: { $in: challengedIds } }, 'name');

    challengerGames.forEach((game) => {
      allGames.push({
        id: game._id.toString(),
        playerOne: { id: game.player_one?._id.toString(), name: challenger?.name },
        playerTwo: { id: game.player_two?._id.toString(), name: challengedNames.find((player) => game.player_two?._id.toString() === player._id.toString())?.name }
      });
    });

    const challengedGames = await Game.find({ player_two: playerId, in_progress: true });
    const challenged = await Player.findOne({ _id: playerId }).exec();
    const challengerIds = challengedGames.map((game) => game.player_one?.toString());
    const challengerNames = await Player.find({ _id: { $in: challengerIds } }, 'name');

    challengedGames.forEach((game) => {
      allGames.push({
        id: game._id.toString(),
        playerTwo: { id: game.player_two?._id.toString(), name: challenged?.name },
        playerOne: { id: game.player_one?._id.toString(), name: challengerNames.find((player) => game.player_one?._id.toString() === player._id.toString())?.name }
      });
    });
    res.status(200).json(allGames);
  } catch (error) {
    res.status(500).json("Something went wrong!");
  }
}

export async function endGame(req: Request, res: Response) {
  const { gameId, winnerId, losserId, drawn } = req.body;

  try {
    const winner = await Player.findOne({ _id: winnerId }).exec();
    const losser = await Player.findOne({ _id: losserId }).exec();

    if (!winner || !losser) {
      return res.status(400).json("Wrong player Ids.");
    }

    const winnerPercentage = Math.round(((winner.games_won + (drawn ? 0 : 1)) / (winner.games_played + 1)) * 100);
    const losserPercentage = Math.round(((losser.games_won) / (losser.games_played + 1)) * 100);

    Game.findByIdAndUpdate(gameId, { in_progress: false, winner: winnerId })
      .then(game => game?.save())
      .catch(error => console.log(error));

    Player.findByIdAndUpdate(losserId, { $inc: { games_played: 1 }, win_percentage: losserPercentage })
      .then(losser => losser?.save())
      .catch(error => console.log(error));

    Player.findByIdAndUpdate(winnerId, { $inc: { games_played: 1, games_won: drawn ? 0 : 1 }, win_percentage: winnerPercentage })
      .then(winner => winner?.save())
      .catch(error => console.log(error));

    // res.status(200).json(winner?.name + ' Wins & ' + losser?.name + ' Loses');
    res.status(200).json('Game result Recorded!');
  } catch (error) {
    res.status(500).json(error);
  }
}