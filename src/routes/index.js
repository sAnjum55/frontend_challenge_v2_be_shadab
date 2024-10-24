import express from "express";
import fileRouter from "./file.router.js";
import rosterRouter from "./roster.router.js";

const router = express.Router();

// log URL
router.use((req, res, next) => {
    console.log(`URL: ${req.method} ${req.originalUrl}`);
    next();
});

router.use('/file', fileRouter);
router.use('/roster', rosterRouter);
export default router;