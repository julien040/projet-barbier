/**
Faire une requête à https://platform.openai.com/docs/guides/speech-to-text pour obtenir une transcription de la vidéo
*/
import OpenAI from "openai";
import type { TranscriptionSegment } from "openai/resources/audio/transcriptions";
import { createReadStream } from "fs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

type speechToTextParams = {
    audioPath: string;
    emplacement: string;
    metier: string;
};

type TranscriptSegment = {
    start: number;
    end: number;
    text: string;
};

type speechToTextResponse = {
    text: string;
    segments: TranscriptSegment[];
};

async function speechToText(
    p: speechToTextParams
): Promise<speechToTextResponse> {
    const result = await openai.audio.transcriptions.create({
        file: createReadStream(p.audioPath),
        model: "whisper-1",
        language: "fr",
        prompt:
            "Vous êtes un recruteur français à la recherche d'un " +
            p.metier +
            " à " +
            p.emplacement +
            ". Vous avez reçu une candidature vidéo, et vous souhaitez l'évaluer.",
        timestamp_granularities: ["segment"],
        response_format: "verbose_json",
    });

    if (!result.segments) {
        return {
            text: result.text,
            segments: [],
        };
    }

    const segments = result.segments.map((segment: TranscriptionSegment) => ({
        start: segment.start,
        end: segment.end,
        text: segment.text,
    }));

    return {
        text: result.text,
        segments,
    };
}

export { speechToText, speechToTextResponse };
