type candidature = {
    id: number;
    candidat_prenom: string;
    candidat_nom: string;
    candidat_email: string;
    recruteur_nom: string;
    recruteur_email: string;
    formulaire_metier: string;
    formulaire_emplacement: string;
    informations_supplementaires: string;
    resultat: {
        score: number;
        villeCandidat: string;
        metierCandidat: string;
        conclusion: string;
        segments: Array<{
            start: number;
            end: number;
        }>;
        competences: Array<string>;
    };
    video_path: string;
    video_remodele_path: string;
    message: string;
    status: string;
    transcription: string;
};

export type { candidature };
