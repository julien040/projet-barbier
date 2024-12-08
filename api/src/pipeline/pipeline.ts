import { storageFolder } from "./folder";
import { extractAudio } from "./extract-audio";
import { speechToText } from "./speech-to-text";
import { extractDataFromTranscript } from "./extract-job";
import { computeNewVideo } from "./compute-video";
import { basename, join } from "path";
import { AppDataSource } from "../data-source";
import { Candidature } from "../entity/Candidature";

/**

What it does:

- Extract the audio out of the video
- Analyze the audio
- Compute a condese version of the video and save the result in the database

@param videoName the name of the video to process (without the folder)
@param dbID the id of the video in the database
*/
async function computePipeline(videoName: string, dbID: string): Promise<void> {
    // Get the path of the video
    const videoPath = join(storageFolder, basename(videoName));

    // Extract the audio
    console.log("Extracting audio from", videoPath);
    const { audioPath } = await extractAudio(videoPath);

    // Get the job from the database
    console.log("Getting the job from the database");
    const candidature = await AppDataSource.getRepository(Candidature).findOne({
        where: {
            id: parseInt(dbID),
        },
    });

    if (!candidature) {
        throw new Error("Candidature not found");
    }
    console.log("Candidature found in pipeline", candidature);

    // Extract the transcript
    console.log("Extracting the transcript");
    const transcript = await speechToText({
        audioPath: audioPath,
        emplacement: candidature.formulaire_emplacement,
        metier: candidature.formulaire_metier,
    });

    // Extract the data from the transcript
    console.log("Extracting data from the transcript");
    const data = await extractDataFromTranscript(
        transcript,
        candidature.formulaire_metier
    );

    // Compute the new video
    console.log("Computing the new video");
    const newVideoPath = await computeNewVideo({
        resultat: data,
        videoPath: videoPath,
    });

    // Update the database
    candidature.transcription = transcript.text;
    candidature.resultat = data;
    candidature.video_remodele_path = basename(newVideoPath);
    candidature.status = "Analyse terminée";

    console.log("Saving the result in the database", candidature);
    await AppDataSource.getRepository(Candidature).save(candidature);

    return;
}

export { computePipeline };
