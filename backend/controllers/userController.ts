import { Request, Response } from 'express';

import User from '../models/user';

export async function getPlayerStats(req: Request, res: Response) {
  try {
    const allUsers = await User.find({}, 'name games_played win_percentage status').sort({ 'win_percentage': 'desc' }).exec();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json("Something went wrong!");
  }
}