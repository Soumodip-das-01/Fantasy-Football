import express from "express"
import Team from "../models/Team.js";
import FootballPlayer from "../models/FootballPlayer.js";
import { createPlayerController } from "../controllers/playerControllers.js";
import { sellPlayerController } from "../controllers/auctionController.js";

const router = express.Router()

//PLAYERS   
router.post("/players", createPlayerController);
router.get("/players", async(req, res)=>{
    try{
        const players = await FootballPlayer.find().sort({rating: -1})
        res.status(200).json(players)
    }catch(err){
        console.error(err)
        res.status(500).json({error: err.message})
    }
})


//AUCTION
router.post("/sell-player", sellPlayerController)

// TEAMS
router.post("/teams", async (req, res)=>{
    try{
        const {teamName, purse} = req.body;

        if (!teamName || purse == null){
            return res.status(400).json({error: "Team name and purse required"})
        }

        const team = await Team.create({
            teamName,
            purse
        })

        res.status(201).json(team)
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
})


router.get("/teams", async (req, res)=>{
    try{
        const teams = await Team.find().sort({teamRating: -1})
        res.status(200).json(teams)
    }catch(err){
        res.status(500).json({error: "failed to fetch teams"})
    }
})

// DELETE PLAYER

router.delete("/players/:id", async(req, res)=>{
    try{
        const {id} = req.params

        const deletedPlayer = await FootballPlayer.findByIdAndDelete(id)

        if(!deletedPlayer){
            return res.status(404).json({error:"Player not found"})
        }

        res.status(200).json({message:"Player deleter succesfully"})
    }catch(err){
        console.error(err)
        res.status(500).json({error: err.message})
    }
})

export default router
