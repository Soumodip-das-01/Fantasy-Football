import { getLeaderboard } from "../services/leaderboardService.js";

export const getLeaderboardController = async (req, res) => {
    try{
        const leaderboard = await getLeaderboard()
        res.status(200).json(leaderboard)
    }catch(err){
        res.status(500).json({error: "failed to reach leaderboard"})
    }
}