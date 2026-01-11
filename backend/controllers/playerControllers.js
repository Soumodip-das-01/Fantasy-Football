import { createPlayer } from "../services/playerServices.js";

export const createPlayerController = async(req, res)=>{
    try{
        const player = await createPlayer(req.body);
        res.status(201).json(player)
    }catch (err){
        res.status(400).json({error:err.message})
    }
}