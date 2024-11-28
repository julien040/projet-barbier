import { basename, join, resolve } from "path";
import { ResultatCandidature } from "../entity/Candidature";
import ffmpeg from "fluent-ffmpeg";
import { rmSync } from "fs";
import { storageFolder } from "./folder";

type computeNewVideoParams = {
    resultat: ResultatCandidature;
    videoPath: string;
};

function computeNewVideo(params: computeNewVideoParams): Promise<string> {
    return new Promise((resolve, reject) => {
        // To compute the new video, we will cut the video in how many segments we have in the transcript
        // then, we will add the text of the segment in the video
        // and finally, we will merge all the segments together

        const videoPath = params.videoPath;
        const segments = params.resultat.segments;

        const ffmpegCommand = ffmpeg(videoPath);

        Promise.all(
            segments.map((segment, i) => {
                return new Promise<string>((resolve, reject) => {
                    const start = segment.start;
                    const duration = segment.end - segment.start;
                    const output = join(
                        storageFolder,
                        `segment-${i}-${basename(videoPath)}`
                    );
                    ffmpegCommand
                        .setStartTime(start)
                        .setDuration(duration)
                        .output(output)
                        .on("end", () => {
                            resolve(output);
                        })
                        .on("error", (err: any) => {
                            reject(err);
                        })
                        .run();
                });
            })
        ).then((segments) => {
            const finalDestination = join(
                storageFolder,
                `final-${basename(videoPath)}`
            );

            // Merge the videos
            let finalResult = ffmpeg();
            segments.forEach((video) => {
                finalResult = finalResult.input(video);
            });
            console.log("Merging videos into", finalDestination);

            finalResult.on("end", () => {
                // Delete the segments
                segments.forEach((video) => {
                    console.log("Deleting", video);
                    try {
                        rmSync(video);
                    } catch (e) {}
                });

                resolve(finalDestination);
            });

            finalResult.mergeToFile(finalDestination, storageFolder);
        });
    });
}

export { computeNewVideo };
