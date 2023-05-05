export interface Player {
    id: string;
    name: string;
    status: string;
    gamesWon: string;
    gamesPlayed: string,
    winPercentage: string;
}

export interface Game {
    id: string;
    playerOne: { id: string | undefined; name: string | undefined };
    playerTwo: { id: string | undefined; name: string | undefined };
}