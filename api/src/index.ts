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
app.listen(port, () => {
    console.log(`Le serveur est lancé sur 127.0.0.1:${port}`);
});
