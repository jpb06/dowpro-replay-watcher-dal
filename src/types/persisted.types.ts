/* ---------------------------------------------------------------------------------------------------------------
   Persisted
   ---------------------------------------------------------------------------------------------------------------*/
export class Game {
    Hash: string;
    Result: GameResult;
    DateAddedUTC: string;
}

export class Member {
    Name: string;
    EloRating: number;
    FavoriteRace: string;
    Wins: number;
    Losses: number;
    RaceStats: Array<RaceStats>;
}

export class AuthorizedUser {
    login: string;
    password: string;
    roles: string[];
    dateGenerated: string;
}

/* ---------------------------------------------------------------------------------------------------------------
   Subsets
   ---------------------------------------------------------------------------------------------------------------*/
export class GameResult {
    PlayersCount: number;
    WinCondition: number;
    TeamsCount: number;
    Duration: number;
    MapName: string;
    Players: Array<GamePlayer>;
    ModVersion: string;
    ModName: string;
}

export class GamePlayer {
    Race: string;
    IsHuman: boolean;
    IsAmongWinners: boolean;
    Team: number;
    Name: string;
    PTtlSc: number;
}

export class RaceStats {
    Race: string;
    Wins: number;
    losses: number;
}

/* ---------------------------------------------------------------------------------------------------------------
   IPC
   ---------------------------------------------------------------------------------------------------------------*/

export class QueuedReplay {
    Hash: string;
    MapName: string;
    Duration: number;
    Players: Array<GamePlayer & Member>;
    ModVersion: string;
    ModName: string;
}