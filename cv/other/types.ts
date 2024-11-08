type candidature = {
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
    message: string;
};

export type { candidature };
