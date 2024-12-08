/**
https://francetravail.io/produits-partages/catalogue/romeo-2

- Résumé du transcript ✅
- Extraire le job et la ville ✅
- Extraire les timestamps des segments qui parlent du job et de la ville ✅
- Retourner un score de pertinence de la candidature ✅
- Appel de l'API pole emploi pour extraire les compétences
*/

import { AzureOpenAI } from "openai";
import type { speechToTextResponse } from "./speech-to-text";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { ResultatCandidature } from "../entity/Candidature";

const openai = new AzureOpenAI({
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    deployment: "gpt-4o",
    apiVersion: "2024-10-21",
    endpoint: "https://alexandria.openai.azure.com/",
});

type ExtractJobResult = {
    job: string;
    city: string;

    jobSegments: { start: number; end: number }[];
};

const extractJobCitySchema = z.object({
    job: z.string(),
    city: z.string(),
    jobSegments: z.array(z.object({ start: z.number(), end: z.number() })),
});

async function extractJobAndCity(
    transcript: speechToTextResponse,
    jobType: string
): Promise<ExtractJobResult> {
    // Create a prompt
    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content:
                    "You are a recruiter looking for a " +
                    jobType +
                    " in a city. You've received a video application and you want to evaluate it. " +
                    "From the transcript below, you want to extract the job and the city the candidate is applying for." +
                    "The city can also be a region, a department or a country if a city is not mentioned." +
                    "You also want to extract the timestamps of the segments that talk about the job and the city." +
                    'You might put "Inconnu" if the job or the city is not mentioned in the transcript.' +
                    "You must always return at least one segment, even if the job or the city is not mentioned.",
            },
            {
                role: "user",
                content: transcript.segments
                    .map(
                        (segment) =>
                            `[${segment.start}s-${segment.end}s] ${segment.text}`
                    )
                    .join("\n"),
            },
        ],
        response_format: zodResponseFormat(
            extractJobCitySchema,
            "extractJobCity"
        ),
    });

    if (!completion.choices[0].message.parsed) {
        throw new Error("No message in completion");
    }

    return completion.choices[0].message.parsed;
}

const resumeTranscriptSchema = z.object({
    summary: z.string(),
    relevanceScore: z.number(),
    competences: z.array(z.string()),
});

type ResumeTranscriptResult = z.infer<typeof resumeTranscriptSchema>;

async function resumeTranscript(
    transcript: speechToTextResponse,
    jobType: string
): Promise<ResumeTranscriptResult> {
    // Create a prompt
    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content:
                    "Vous êtes un recruteur à la recherche d'un " +
                    jobType +
                    ". Vous avez reçu une candidature vidéo et vous souhaitez l'évaluer. " +
                    "À partir du transcript ci-dessous, vous devez extraire un résumé expliquant pourquoi le candidat est ou n'est pas un bon choix pour le poste." +
                    "Vos critères sont l'expérience du candidat, ses compétences, sa motivation et comment il correspond à la description du poste." +
                    "Vous retournerez également un score de pertinence pour la candidature, de 0 à 100." +
                    "Vous devez aussi extraire les compétences du candidat qui sont pertinentes pour le poste." +
                    "Si le texte n'a pas de sens, ou aucune information n'est donnée par rapport au poste, vous pouvez mettre 'Inconnu', mettre un score de pertinence de 0, et écrire Candidature non conforme comme conclusion" +
                    "Votre résumé doit toujours être retourné en français.",
            },
            {
                role: "user",
                content: transcript.text,
            },
        ],
        response_format: zodResponseFormat(
            resumeTranscriptSchema,
            "resumeTranscript"
        ),
    });

    if (!completion.choices[0].message.parsed) {
        throw new Error("No message in completion");
    }

    return completion.choices[0].message.parsed;
}

async function extractDataFromTranscript(
    transcript: speechToTextResponse,
    jobType: string
): Promise<ResultatCandidature> {
    const results = await Promise.all([
        extractJobAndCity(transcript, jobType),
        resumeTranscript(transcript, jobType),
    ]);

    return {
        metierCandidat: results[0].job,
        villeCandidat: results[0].city,
        segments: results[0].jobSegments,
        score: results[1].relevanceScore,
        conclusion: results[1].summary,
        competences: results[1].competences,
    };
}

export { extractDataFromTranscript };
