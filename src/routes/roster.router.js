import express from "express";
import * as playerController from "../controllers/player.controller.js";
import fileRouter from "./file.router.js";

const rosterRouter = express.Router();

rosterRouter.patch("/", playerController.updatePlayer);
rosterRouter.get("/:fileId", playerController.listPlayersByFile)
rosterRouter.delete("/:playerId", playerController.deletePlayer)

export default rosterRouter