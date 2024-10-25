import express from "express";
import cors from "cors";
import {errorHandler} from "./helpers/errorHandler.js";
import router from "./routes/index.js";

const app = express();

app.use(
    cors({
        origin: true,
    })
);

app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.use(express.json({ limit: '20mb' }));

app.use('/api', router);

//Error Handler
app.use(errorHandler)

const server = app.listen(5001, async () => {
    console.log(`Server running on port 5001`);
});