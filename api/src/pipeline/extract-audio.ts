type ExtractAudioResult = {
    audioPath: string;
    duration: number;
};

async function extractAudio(videoPath: string): Promise<ExtractAudioResult> {
    return {
        audioPath: "audioPath",
        duration: 0,
    };
}

/**
- Utiliser https://github.com/fluent-ffmpeg/node-fluent-ffmpeg?tab=readme-ov-file
- Extraire l'audio en mp3 à partir de la vidéo

*/
