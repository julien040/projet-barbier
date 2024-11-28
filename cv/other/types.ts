type candidature = {
    id: number;
    candidat_prenom: string;
    candidat_nom: string;
    candidat_email: string;
    recruteur_nom: string;
    recruteur_email: string;
    type_emploi: string;
    emplacement: string;
    informations_supplementaires: string;
    resultat: {
        scoreDistance: number;
        scoreMetier: number;
        scoreConfiance: number;
        conclusion: string;
    };
    video_path: string;
    video_remodele_path: string;
    message: string;
};

export type { candidature };
