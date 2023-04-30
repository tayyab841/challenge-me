import { Request, Response } from 'express';

import Player from '../models/player';
import Challenge from '../models/challenge';

export async function newChallenge(req: Request, res: Response) {
  const { challengedId } = req.body;
  const challengerId = res.locals.signedInUser;

  if (!challengedId || !challengerId) {
    return res.status(400).json("Need two Players to create a challenge!");
  }

  // try {
  //   const challenges = await Challenge.find({
  //     $or: [
  //       { player_one: { $in: [challengedId, challengerId] } },
  //       { player_two: { $in: [challengedId, challengerId] } }
  //     ]
  //   }).exec();
  //   if (challenges.length > 0) throw('');

  // } catch (error) {
  //   return res.sta
  // }

  try {
    await Challenge.create({ player_one: challengerId, player_two: challengedId });
    res.status(200).json("Challenge Created!");
  } catch (error) {
    res.status(500).json("Something went wrong! Probably wrong ids");
  }
}

export async function getChallenges(req: Request, res: Response) {
  const playerId = res.locals.signedInUser;

  try {
    const challenges = await Challenge.find({ player_two: playerId }).exec();
    const allChallengerIds = challenges.map((challenge) => challenge.player_one);
    const allChallengers = await Player.find({ _id: { $in: allChallengerIds } });
    const formattedChallenges = challenges.map((challenge) => {
      const playerName = allChallengers.find((player) => player._id.toString() === challenge.player_one?.toString())?.name;
      return {
        id: challenge._id,
        name: playerName,
        status: challenge.status
      };
    });
    res.status(200).json(formattedChallenges);
  }
  catch (error) {
    res.status(400).json("Something went wrong!")
  }
}