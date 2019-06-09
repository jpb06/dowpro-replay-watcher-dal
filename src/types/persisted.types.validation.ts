import { GameResult, GamePlayer } from "../exports/types.export";

/* ---------------------------------------------------------------------------------------------------------------
   Game result
   ---------------------------------------------------------------------------------------------------------------*/

export function validateGameResult(obj: any): obj is GameResult {

    if (
        typeof obj.PlayersCount !== "number" ||
        typeof obj.WinCondition !== "string" ||
        typeof obj.TeamsCount !== "number" ||
        typeof obj.Duration !== "number" ||
        typeof obj.MapName !== "string" ||
        !Array.isArray(obj.Players)
    ) {
        return false;
    }

    for (let i = 0; i < obj.Players.length; i++) {
        if (!validateGamePlayer(obj.Players[i])) return false;
    }

    return true;
}

/* ---------------------------------------------------------------------------------------------------------------
   Game player
   ---------------------------------------------------------------------------------------------------------------*/

export function validateGamePlayer(obj: any): obj is GamePlayer {

    if (
        typeof obj.Race !== "string" ||
        typeof obj.IsHuman !== "boolean" ||
        typeof obj.IsAmongWinners !== "boolean" ||
        typeof obj.Team !== "number" ||
        typeof obj.Name !== "string" ||
        typeof obj.PTtlSc !== "number"
    ) {
        return false;
    }

    return true;
}
