import ffmpeg from "fluent-ffmpeg";
import { basename, join, resolve, extname } from "path";
import { storageFolder } from "./folder";
type ExtractAudioResult = {
    audioPath: string;
};

function extractAudio(videoPath: string): Promise<ExtractAudioResult> {
    return new Promise((resolve, reject) => {
        const extensionName = extname(videoPath);
        const audioPath = join(
            storageFolder,
            `audio-${basename(videoPath).replace(extensionName, ".mp3")}`
        );

        ffmpeg(videoPath)
            .output(audioPath)
            .on("end", () => {
                resolve({ audioPath });
            })
            .on("error", (err: any) => {
                reject(err);
            })
            .run();
    });
}

/**
- Utiliser https://github.com/fluent-ffmpeg/node-fluent-ffmpeg?tab=readme-ov-file
- Extraire l'audio en mp3 à partir de la vidéo

*/

export { extractAudio };
