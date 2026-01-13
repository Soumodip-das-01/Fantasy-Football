import Team from "../models/Team.js";
import FootballPlayer from "../models/FootballPlayer.js";

export const sellPlayerToTeam = async({playerId, teamId, soldPrice})=>{
    const player = await FootballPlayer.findById(playerId)
    if(!player){
        throw new Error("Player not Found")
    }

    if(player.isSold){
        throw new Error("Player already Sold")
    }

    const team = await Team.findById(teamId)
    if (!team){
        throw new Error("Team not found")
    }
    if(team.locked){
        throw new Error("Team is already Full")
    }
    if (team.purse < soldPrice){
        throw new Error("Insufficient Purse")
    }

    team.players.push({
        playerId: player._id,
        name: player.name,
        position: player.position,
        price: soldPrice,
        rating: player.rating
    })

    team.purse -= soldPrice,
    team.teamRating += player.rating

    await team.save()

    player.isSold = true
    player.soldPrice = soldPrice
    player.soldTo = team._id

    await player.save()

    return{
        team,
        player,
    }

}