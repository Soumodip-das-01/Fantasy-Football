import Team from "../models/Team.js";

export const getLeaderboard = async () =>{
    const teams = await Team.find().sort({teamRating: -1}).select("teamName teamRating purse players").lean()

    return teams.map((team, index)=>({
        rank: index + 1,
        teamName: team.teamName,
        teamRating: team.teamRating,
        purseRemaining: team.purse,
        playersCount: team.players.length,
    }))

}