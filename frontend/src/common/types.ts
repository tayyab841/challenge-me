export interface Player {
  _id: string;
  name: string;
  status: string;
  games_won: number;
  games_played: number;
}

export interface User {
  token: string;
  userId: string;
  userName: string;
}

export interface Challenge {
  id: string;
  name: string;
  status: string;
}

export interface PlayerChallenge {
  id: string,
  name: string;
  onlineStatus: string;
  challengeStatus: string;
}

export interface Game {
  id: string;
  playerOne: { id: string; name: string };
  playerTwo: { id: string; name: string };
}