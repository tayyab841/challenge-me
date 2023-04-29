export interface Player {
    _id: string;
    name: string;
    status: string;
    games_played: number;
    win_percentage: number;
}

export interface User {
    token: string;
    userId: string;
    userName: string;
}