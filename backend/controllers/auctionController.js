import { sellPlayerToTeam } from "../services/auctionServices.js";

export const sellPlayerController = async (req, res)=>{
    try{
        const {playerId, teamId, soldPrice} =  req.body

        if(!playerId || !teamId || soldPrice == null){
            return res.status(400).json({error: "playerId, teamId and soldPrice are required"})
        }

        const result = await sellPlayerToTeam({
            playerId,
            teamId,
            soldPrice,
        })

        return res.status(200).json({
            message: "player sold successfully",
            data: result
        })
    }catch(err){
        return res.status(400).json({
            error: err.message
        })
    }
}