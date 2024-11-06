import { AppDataSource } from "./data-source";
import { Candidature } from "./entity/Candidature";
import express from "express";
import dotenv from "dotenv";
import NewVideo from "./controller/newVideo";
import RetrieveVideo from "./controller/retrieveVideo";
import UploadVideo from "./controller/uploadVideo";

dotenv.config({
    path: "../.env",
});

const app = express();

const apiV1 = express.Router();
apiV1.get("/newVideo", NewVideo);
apiV1.get("/retrieveVideo", RetrieveVideo);
apiV1.post("/uploadVideo", UploadVideo);

app.use("/v1", apiV1);

const port = process.env.API_PORT || 3000;

AppDataSource.initialize()
    .then(async () => {
        await AppDataSource.synchronize();
        console.log("Database initialized");
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => console.log(error));
