import { Request, Response } from 'express';

import Game from '../models/game';
import Challenge from '../models/challenge';

export async function newChallenge(req: Request, res: Response) {
  const { challengedId } = req.body;
  const challengerId = res.locals.signedInUser;

  if (!challengedId || !challengerId) {
    return res.status(400).json("Need two Players to create a challenge!");
  }

  try {
    await Challenge.create({ player_one: challengerId, player_two: challengedId });
    res.status(200).json("Challenge Created!");
  } catch (error) {
    res.status(400).json("Something went wrong! Probably wrong ids.");
  }
}

export async function acceptChallenge(req: Request, res: Response) {
  const playerId = res.locals.signedInUser;
  const { challengerId } = req.body;

  Promise.all([
    Challenge.deleteOne({ player_two: playerId, player_one: challengerId }),
    Game.create({ player_one: challengerId, player_two: playerId })
  ])
    .then((responses) => {
      res.status(200).json("Challenge Accepted!");
    })
    .catch((error) => {
      res.status(400).json("Something Went wrong!");
    });
}