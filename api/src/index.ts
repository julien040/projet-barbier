// Load environment variables before importing any other modules
import dotenv from "dotenv";
dotenv.config({
    path: "../.env",
});

import { mkdir } from "fs";

import { AppDataSource } from "./data-source";
import express from "express";

import { apiV1 } from "./controller/index";

// Define the HTTP server
const app = express();
app.use("/v1", apiV1);

// Ensure settings are correct
const port = process.env.API_PORT || 3000;
if (process.env.DATABASE_URL === undefined) {
    throw new Error("DATABASE_URL is not defined");
}

// Create the storage folder if it does not exist
const storageFolder = "storage";
mkdir(storageFolder, { recursive: true }, (error) => {
    if (error) {
        throw error;
    }
});

// Initialize the database
AppDataSource.initialize()
    .then(async () => {
        await AppDataSource.synchronize();
        console.log("Database initialized");

        // Start the server once the database is ready
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => console.log(error));
