import type { Request, Response } from "express";
import { Formidable } from "formidable";
import { cp, rm } from "fs/promises";
import { join } from "path";
import { AppDataSource } from "../data-source";
import { Candidature } from "../entity/Candidature";
import { computePipeline } from "../pipeline/pipeline";

const Controller = async (req: Request, res: Response) => {
    const form = new Formidable();
    const [fields, files] = await form.parse(req);
    console.log("Fields", fields);
    console.log("Files", files);

    // Save the video file
    // Because formidable automatically saves the file, we don't need to do anything here
    // excepting copying the file to the storage folder
    if (files.file?.length !== 1) {
        res.status(400).json({ message: "Aucun fichier n'a été envoyé" });
        return;
    }

    const file = files.file[0];
    const oldPath = file.filepath;

    if (
        !file.mimetype?.startsWith("video/mp4") &&
        !file.mimetype?.startsWith("video/webm")
    ) {
        console.log("Received file with wrong mimetype", file.mimetype);
        res.status(400).json({
            message: "Le fichier doit être un fichier vidéo (mp4 ou webm)",
        });
        return;
    }

    if (!fields.id) {
        console.log("Missing ID on the request");
        res.status(400).json({ message: "ID manquant" });
        return;
    }

    // Generate a new filename

    const newFilename = `${Date.now()}-${file.newFilename}.${
        file.mimetype.startsWith("video/mp4") ? "mp4" : "webm"
    }`;

    // Move the file to the storage folder
    const newPath = join(__dirname, "../../storage", newFilename);
    console.log("Moving file", oldPath, newPath);
    await cp(oldPath, newPath);

    // Remove the temporary file
    console.log("Removing temporary file", oldPath);
    await rm(oldPath);

    // Update the database
    const candidatureRepository = await AppDataSource.createQueryBuilder()
        .update(Candidature)
        .set({ status: "CV soumis", video_path: newFilename })
        .where("id = :id", { id: fields.id })
        .execute();

    if (candidatureRepository.affected === 0) {
        res.status(400).json({ message: "Candidature non trouvée" });
        return;
    }

    console.log("Candidature updated in the database");

    // Respond with the new path
    res.json({ message: "Fichier reçu", path: newPath });

    // Asynchronously process the video
    console.log("Processing the video");
    computePipeline(newFilename, fields.id[0]);
};

export default Controller;
