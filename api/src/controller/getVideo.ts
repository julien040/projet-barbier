import type { Request, Response } from "express";
import { Candidature } from "../entity/Candidature";
import { AppDataSource } from "../data-source";
const Controller = async (req: Request, res: Response) => {
    // Get the ID of the video to retrieve
    const id = req.query.id;
    if (!id) {
        res.status(400).json({ message: "ID manquant" });
        return;
    }
    if (typeof id !== "string") {
        res.status(400).json({ message: "ID invalide" });
        return;
    }

    // Convert the ID to a number
    let idNumber: number = parseInt(id);
    if (isNaN(idNumber)) {
        res.status(400).json({ message: "ID invalide" });
        return;
    }

    // Retrieve the video from the database
    const candidature = await AppDataSource.getRepository(Candidature).findOne({
        where: {
            id: idNumber,
        },
    });

    if (!candidature) {
        res.status(404).json({ message: "Candidature non trouvée" });
        return;
    }

    res.json(candidature);
};

export default Controller;
