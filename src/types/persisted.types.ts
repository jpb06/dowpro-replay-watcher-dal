/* ---------------------------------------------------------------------------------------------------------------
   Persisted
   ---------------------------------------------------------------------------------------------------------------*/
export class Game {
    Hash: string;
    Result: GameResult;
    Version: string;
    PostedToDiscord: boolean;
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
    Version: string;
    Players: Array<GamePlayer & Member>;
    ModName: string;
}