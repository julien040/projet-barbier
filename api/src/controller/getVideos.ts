import type { Request, Response } from "express";
import { Candidature } from "../entity/Candidature";
import { AppDataSource } from "../data-source";

const Controller = async (req: Request, res: Response) => {
    // Retrieve the video from the database
    const candidature = await AppDataSource.getRepository(Candidature).find({});

    if (!candidature) {
        res.status(404).json({ message: "Candidature non trouvée" });
        return;
    }

    res.json(candidature);
};

export default Controller;
