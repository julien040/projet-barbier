import type { Request, Response } from "express";
import { Candidature } from "../entity/Candidature";
import { AppDataSource } from "../data-source";

function checkString(value: any): string {
    if (typeof value !== "string") {
        throw new Error("Un paramètre est manquant, ou en double");
    }

    if (value === "") {
        throw new Error("Un paramètre est vide");
    }

    return value;
}

const Controller = async (req: Request, res: Response) => {
    // Create a new Candidature
    const candidature = new Candidature();

    // Retrieve in the request url parameters the values of the candidature
    try {
        console.log(req.query);
        candidature.candidat_prenom = checkString(req.query.candidat_prenom);
        candidature.candidat_nom = checkString(req.query.candidat_nom);
        candidature.candidat_email = checkString(req.query.candidat_email);

        candidature.employeur_nom = checkString(req.query.recruteur_nom);
        candidature.employeur_email = checkString(req.query.recruteur_email);

        candidature.formulaire_metier = checkString(req.query.type_emploi);
        candidature.formulaire_emplacement = checkString(req.query.emplacement);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
        return;
    }

    candidature.formulaire_info_supplementaire =
        typeof req.query.informations_supplementaires === "string"
            ? req.query.informations_supplementaires
            : "";

    candidature.video_path = "";
    candidature.video_remodele_path = "";
    candidature.transcription = "";
    candidature.date_soumission = new Date();
    candidature.status = "En attente";
    candidature.resultat = {
        conclusion: "",
        scoreConfiance: 0,
        scoreDistance: 0,
        scoreMetier: 0,
    };

    // Validate the Candidature
    if (
        !candidature.candidat_email ||
        !candidature.candidat_nom ||
        !candidature.candidat_prenom ||
        !candidature.employeur_email ||
        !candidature.employeur_nom ||
        !candidature.formulaire_emplacement ||
        !candidature.formulaire_metier
    ) {
        console.log(candidature);
        res.status(400).json({ message: "Des paramètres sont manquants" });
        return;
    }

    // Save the Candidature
    try {
        const data = await AppDataSource.manager.save(candidature);
        // Return the Candidature
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:
                "Une erreur est survenue lors de la sauvegarde à la base de données",
        });
        return;
    }
};

export default Controller;
