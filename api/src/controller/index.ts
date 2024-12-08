import NewVideo from "./newVideo";
import RetrieveVideo from "./retrieveVideo";
import UploadVideo from "./uploadVideo";
import GetVideo from "./getVideo";
import GetVideos from "./getVideos";
import express from "express";

const apiV1 = express.Router();
apiV1.get("/newVideo", NewVideo);
apiV1.get("/retrieveVideo", RetrieveVideo);
apiV1.post("/uploadVideo", UploadVideo);
apiV1.get("/getVideo", GetVideo);
apiV1.get("/getVideos", GetVideos);

export { apiV1 };
