
export interface Player {
  id: string;
  name: string;
}

export interface PlayerResult {
    name: string;
    score: number;
}

export interface GameHistoryEntry {
    id: string;
    date: string;
    location: string;
    players: PlayerResult[];
    winnerNames: string[];
}
