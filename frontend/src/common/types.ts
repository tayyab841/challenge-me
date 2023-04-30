export interface Player {
  _id: string;
  name: string;
  status: string;
  games_played: number;
  games_won: number;
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