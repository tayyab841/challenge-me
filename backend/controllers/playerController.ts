import { Request, Response } from 'express';

import Player from '../models/player';
import Challenge from '../models/challenge';

export async function getPlayerStats(req: Request, res: Response) {
  try {
    const allUsers = await Player.find({}, 'name games_played games_won status win_percentage').sort({ 'win_percentage': 'desc' }).limit(5).exec();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json("Something went wrong!");
  }
}

export async function getPlayers(req: Request, res: Response) {
  const requestingUser = res.locals.signedInUser;

  try {
    const allPlayers = await Player.find({ _id: { $nin: [requestingUser._id] } }).exec();
    const challengePending = await Challenge.find({ player_one: requestingUser }).exec();
    const accepChallenges = await Challenge.find({ player_two: requestingUser }).exec();

    const whoHasNotResponded = challengePending.map((challenge) => challenge.player_two?.toString());
    const toWhomIHaveNotResponded = accepChallenges.map((challenge) => challenge.player_one?.toString());

    // no challenge related to you => challenge
    // challenges you sent and waiting response => pending
    // challenges your received and need to responsd => accept
    const formattedPlayers = allPlayers.map((player) => {
      const challengeStatus = whoHasNotResponded.includes(player._id.toString())
        ? 'pending' : toWhomIHaveNotResponded.includes(player._id.toString()) ? 'accept' : 'challenge';
      return ({
        id: player._id,
        name: player.name,
        onlineStatus: player.status,
        challengeStatus: challengeStatus
      });
    });

    res.status(200).json(formattedPlayers);
  }
  catch (error) {
    res.status(400).json(error);
  }
}