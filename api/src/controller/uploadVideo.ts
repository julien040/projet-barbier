import type { Request, Response } from "express";
import { Formidable } from "formidable";
import { cp, rm } from "fs/promises";
import { join } from "path";
import { AppDataSource } from "../data-source";
import { Candidature } from "../entity/Candidature";

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

    if (file.mimetype !== "video/mp4") {
        res.status(400).json({
            message: "Le fichier doit être un fichier vidéo",
        });
        return;
    }

    const newFilename = `${Date.now()}-${file.newFilename}.mp4`;

    // Move the file to the storage folder
    const newPath = join(__dirname, "../../storage", newFilename);
    await cp(oldPath, newPath);

    // Remove the temporary file
    await rm(oldPath);

    // Update the database
    const candidatureRepository = await AppDataSource.createQueryBuilder()
        .update(Candidature)
        .set({ video_path: newFilename })
        .where("id = :id", { id: fields.id })
        .execute();

    if (candidatureRepository.affected === 0) {
        res.status(400).json({ message: "Candidature non trouvée" });
        return;
    }

    // Respond with the new path
    res.json({ message: "Fichier reçu", path: newPath });
};

export default Controller;
