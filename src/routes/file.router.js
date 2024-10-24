import express from "express";
import multer from "multer";
import * as fileController from "../controllers/file.controller.js";
const fileRouter = express.Router();
const fileUpload = multer({ dest: "public/" })


fileRouter.post("/", fileUpload.single("file"), fileController.create);
fileRouter.patch("/", fileController.updateFileName);
fileRouter.get("/", fileController.listFiles)
fileRouter.delete("/:fileId", fileController.deleteFile)

export default fileRouter