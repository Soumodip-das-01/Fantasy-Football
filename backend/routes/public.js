import express from "express";
import { getLeaderboardController } from "../controllers/leaderboardController.js";

const router = express.Router();

router.get("/leaderboard", getLeaderboardController);

export default router;
