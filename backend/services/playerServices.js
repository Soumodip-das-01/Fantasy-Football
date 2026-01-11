import Team from "../models/Team.js";
import FootballPlayer from "../models/FootballPlayer.js";

export const createPlayer = async (data) =>{
    return await FootballPlayer.create(data)
}