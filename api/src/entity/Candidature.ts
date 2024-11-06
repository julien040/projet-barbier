import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Candidature {
    @PrimaryGeneratedColumn()
    id!: number;

    // Candidat
    @Column()
    candidat_prenom!: string;

    @Column()
    candidat_nom!: string;

    @Column()
    candidat_email!: string;

    // Employeur
    @Column()
    employeur_nom!: string;

    @Column()
    employeur_email!: string;

    // Formulaire
    @Column()
    formulaire_metier!: string;

    @Column()
    formulaire_emplacement!: string;

    @Column()
    formulaire_info_supplementaire!: string;

    // Données de la vidéo
    @Column()
    video_path!: string;

    @Column()
    video_remodele_path!: string;

    @Column()
    transcription!: string;

    @Column()
    date_soumission!: Date;

    @Column()
    status!: string;

    // Résultat de l'analyse
    // JSON
    @Column({ type: "json" })
    resultat!: ResultatCandidature;
}

interface ResultatCandidature {
    scoreDistance: number;
    scoreMetier: number;
    scoreConfiance: number;
    conclusion: string;
}
