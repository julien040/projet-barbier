import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next";
import type { candidature } from "../../other/types";
import { useState } from "react";
import { clsx } from "clsx";
import {
    useRecordWebcam,
    ERROR_MESSAGES,
} from "../../components/react-record-webcam/dist/index.js";
import ErrorComponent from "../../components/error";

type Recording = {
    /**
     * @property {string} id - The ID of the recording.
     */
    id: string;
    /**
     * @property {string} id - The ID of the audio device.
     */
    audioId: string;
    /**
     * @property {string} [audioLabel] - The label of the audio device.
     */
    audioLabel?: string;
    /**
     * @property {Blob} [blob] - The blob of the recording.
     */
    blob?: Blob;
    /**
     * @property {Blob[]} blobChunks - Single blob or chunks per timeslice of the recording.
     */
    blobChunks: Blob[];
    /**
     * @property {string} fileName - The name of the file.
     */
    fileName: string;
    /**
     * @property {string} fileType - The type of the file.
     */
    fileType: string;
    /**
     * @property {boolean} isMuted - Whether the recording is muted.
     */
    isMuted: boolean;
    /**
     * @property {string} mimeType - The MIME type of the recording.
     */
    mimeType: string;
    /**
     * @property {string | null} objectURL - The object URL of the recording.
     */
    objectURL: string | null;
    /**
     * @property {React.RefObject<HTMLVideoElement>} previewRef - React Ref for the preview element.
     */
    previewRef: React.RefObject<HTMLVideoElement>;
    /**
     * @property {MediaRecorder | null} recorder - The MediaRecoder instance of the recording.
     */
    recorder: MediaRecorder | null;
    /**
     * @property {string} videoId - The ID of the video device.
     */
    videoId: string;
    /**
     * @property {string} [videoLabel] - The label of the video device.
     */
    videoLabel?: string;
    /**
     * @property {React.RefObject<HTMLVideoElement>} webcamRef - React Ref for the webcam element.
     */
    webcamRef: React.RefObject<HTMLVideoElement>;
};

export const getServerSideProps = (async (
    context: GetServerSidePropsContext
) => {
    const params = new URLSearchParams(context.query as Record<string, string>);

    const urlToFetch =
        "http://127.0.0.1:3001/v1/getVideo" + "?" + params.toString();

    console.log("URL to fetch: ", urlToFetch);
    const res = await fetch(urlToFetch);
    const data = await res.json();
    if (!res.ok) {
        return {
            props: {
                candidature: null,
            },
        };
    }
    return {
        props: {
            candidature: data,
        },
    };
}) satisfies GetServerSideProps<{ candidature?: candidature }>;

export default function Record({
    candidature,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log(candidature);
    return (
        <main>
            <NavBar />
            {candidature && !candidature.video_path && (
                <div>
                    <h1 className="text-3xl font-bold mt-8 tracking-tight text-black">
                        Enregistrez votre CV vidéo
                    </h1>
                    <p className="text-sm mt-1 text-black/60">
                        Enregistrez votre CV vidéo pour que nous puissions
                        l&apos;analyser et que votre employeur vous donne un
                        retour. <br />
                    </p>
                    <WebcamRecorder candidature={candidature} />
                    <DragAndDrop candidature={candidature} />

                    <h1 className="text-3xl font-bold mt-8 tracking-tight text-black">
                        Conseils pour un bon CV vidéo
                    </h1>
                    <ol className="list-decimal ml-4">
                        <li>
                            <p className="text-xl font-bold mt-3 tracking-tight text-black">
                                Parlez de vos compétences
                            </p>
                            <p className="text-sm text-black/60">
                                N’hésitez pas à détailler vos compétences. Plus
                                elles sont précises, mieux c’est.
                            </p>
                        </li>
                        <li>
                            <p className="text-xl font-bold mt-3 tracking-tight text-black">
                                Évitez les hésitations
                            </p>
                            <p className="text-sm text-black/60">
                                Notre algorithme est capable de détecter les
                                “euhhhhh”. Nous vous conseillons de répéter
                                votre texte avant de commencer
                            </p>
                        </li>
                        <li>
                            <p className="text-xl font-bold mt-3 tracking-tight text-black">
                                Donnez vos disponibilités
                            </p>
                            <p className="text-sm text-black/60">
                                Incluez dans l’enregistrement les secteurs
                                auxquels vous pouvez vous rendre
                            </p>
                        </li>
                    </ol>
                </div>
            )}
            {!candidature && (
                <div
                    className="flex flex-col bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full mt-4"
                    role="alert"
                >
                    <strong className="font-bold">Erreur !</strong>
                    <p className="text-sm">
                        Impossible de récupérer les informations de la
                        candidature. Vérifiez que le lien est correct.
                    </p>
                </div>
            )}
            {candidature && candidature.video_path && (
                <div
                    className="flex flex-col bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full mt-4 text-sm"
                    role="alert"
                >
                    <strong className="font-bold">Erreur !</strong>
                    <p className="">Vous avez déjà enregistré votre vidéo</p>
                    <br />
                    <a
                        className="hover:underline"
                        href={"/candidature/result?id=" + candidature.id}
                    >
                        🔗 Voir le résultat
                    </a>
                </div>
            )}
            <Footer />
        </main>
    );
}

enum WebcamRecorderState {
    NOT_STARTED,
    STARTED,
    RECORDING,
    PAUSED,
    UPLOADING,
    UPLOADED,
    ERROR,
}

const WebcamRecorder = ({ candidature }: { candidature: candidature }) => {
    const [Recording, setRecording] = useState<Recording | null>(null);
    const [Error, setError] = useState("");
    const [WebcamState, setWebcamState] = useState(
        WebcamRecorderState.NOT_STARTED
    );
    const {
        createRecording,
        openCamera,
        startRecording,
        stopRecording,
        resumeRecording,
        pauseRecording,
        errorMessage,
    } = useRecordWebcam({
        mediaTrackConstraints: {
            aspectRatio: 1.7777777778,
            facingMode: "user",
            noiseSuppression: true,
            echoCancellation: true,
        },
    });
    const handleFirstRecording = () => {
        if (WebcamState !== WebcamRecorderState.NOT_STARTED) {
            return;
        }
        createRecording()
            .then((recording) => {
                console.log("Recording created");
                console.log(recording);
                if (!recording) {
                    return;
                }
                setRecording(recording);
                return openCamera(recording.id);
            })
            .then((r) => {
                console.log("Camera opened");
                console.log(r);
                if (!r) {
                    return;
                }
                return startRecording(r.id);
            })
            .then((r) => {
                console.log("Recording started");
                console.log(r);
                if (!r) {
                    return;
                }
                setWebcamState(WebcamRecorderState.STARTED);
            })
            .catch((e) => {
                setError("Erreur lors de l'ouverture de la caméra" + e);
                setWebcamState(WebcamRecorderState.ERROR);
            });
    };

    const handleStartRecording = () => {
        if (!Recording) {
            return;
        }
        if (WebcamState === WebcamRecorderState.PAUSED) {
            resumeRecording(Recording.id);
            setWebcamState(WebcamRecorderState.RECORDING);
            return;
        }

        if (WebcamState !== WebcamRecorderState.STARTED) {
            return;
        }

        startRecording(Recording.id);
        setWebcamState(WebcamRecorderState.RECORDING);
    };

    const handleStopRecording = () => {
        if (!Recording) {
            return;
        }
        if (WebcamState !== WebcamRecorderState.RECORDING) {
            return;
        }
        pauseRecording(Recording.id);
        setWebcamState(WebcamRecorderState.PAUSED);
    };

    const handleDownloadRecording = () => {
        if (!Recording) {
            return;
        }
        if (WebcamState !== WebcamRecorderState.PAUSED) {
            return;
        }
        stopRecording(Recording.id)
            .then((r) => {
                if (!r) {
                    return;
                }
                const body = new FormData();
                if (!r.blob) {
                    return;
                }
                body.append("file", r.blob);
                body.append("id", candidature.id.toString());
                setWebcamState(WebcamRecorderState.UPLOADING);
                return fetch("/api/upload", {
                    method: "POST",
                    body: body,
                });
            })
            .then((res) => {
                if (!res) {
                    return;
                }
                if (res.ok) {
                    setWebcamState(WebcamRecorderState.UPLOADED);
                    setTimeout(() => {
                        window.location.href =
                            "/candidature/success?id=" + candidature.id;
                    }, 1500);
                }
            })
            .catch((e) => {
                setError("Erreur lors du téléchargement de la vidéo" + e);
                setWebcamState(WebcamRecorderState.ERROR);
            });
    };

    if (errorMessage == ERROR_MESSAGES.NO_USER_PERMISSION) {
        // Request permission
        navigator.mediaDevices.getUserMedia({ video: true }).then(() => {
            // Permission granted
            console.log("Permission granted");
        });
        return (
            <ErrorComponent message="Vous devez autoriser l'accès à la caméra" />
        );
    }

    if (Error) {
        return <ErrorComponent message={Error} />;
    }

    return (
        <div
            id="videomirror"
            className="mt-4 w-full text-black rounded-xl bg-white/40  border border-black/10 p-5"
        >
            <video
                ref={Recording?.webcamRef}
                autoPlay
                playsInline
                muted
                className="w-full aspect-video border border-black/10 rounded-md"
            />
            <p className="text-xs text-black/40 mt-4">Menu</p>
            <div className="flex gap-4 mt-1">
                {!Recording && (
                    <button
                        onClick={handleFirstRecording}
                        className="bg-[#f9eb7d] transition-all rounded-lg text-sm px-3 md:px-6 py-2 font-semibold border border-black/10"
                    >
                        Ouvrir la caméra
                    </button>
                )}
                {WebcamState === WebcamRecorderState.STARTED && (
                    <button
                        onClick={handleStartRecording}
                        className="bg-[#f9eb7d] transition-all rounded-lg text-sm px-3 md:px-6 py-2 font-semibold border border-black/10"
                    >
                        Commencer l&apos;enregistrement
                    </button>
                )}
                {WebcamState === WebcamRecorderState.RECORDING && (
                    <button
                        onClick={handleStopRecording}
                        className="bg-[#f9eb7d] transition-all rounded-lg text-sm px-3 md:px-6 py-2 font-semibold border border-black/10"
                    >
                        Mettre en pause
                    </button>
                )}
                {WebcamState === WebcamRecorderState.PAUSED && (
                    <button
                        onClick={handleStartRecording}
                        className="bg-[#f9eb7d] transition-all rounded-lg text-sm px-3 md:px-6 py-2 font-semibold border border-black/10"
                    >
                        Reprendre l&apos;enregistrement
                    </button>
                )}
                {WebcamState === WebcamRecorderState.PAUSED && (
                    <button
                        onClick={handleDownloadRecording}
                        className="bg-[#f9eb7d] transition-all rounded-lg text-sm px-3 md:px-6 py-2 font-semibold border border-black/10"
                    >
                        Upload
                    </button>
                )}
                {WebcamState === WebcamRecorderState.UPLOADING && (
                    <button
                        disabled
                        className="bg-[#f9eb7d] transition-all rounded-lg text-sm px-3 md:px-6 py-2 font-semibold border border-black/10"
                    >
                        En cours de téléchargement...
                    </button>
                )}
            </div>
        </div>
    );
};

enum DragAndDropState {
    NOT_STARTED,
    DRAG_OVER,
    UPLOADING,
    ERROR,
    SUCCESS,
}

const DragAndDrop = ({ candidature }: { candidature: candidature }) => {
    const [Message, setMessage] = useState("Glissez-déposez votre vidéo ici");
    const [State, setState] = useState(DragAndDropState.NOT_STARTED);
    const urlToUpload = "/api/upload?id=" + candidature.id;

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setMessage("Fichier déposé");

        if (e.dataTransfer.files.length !== 1) {
            setMessage("Déposez un seul fichier");
            setState(DragAndDropState.ERROR);
            return;
        }

        const file = e.dataTransfer.files[0];
        if (file.type !== "video/mp4" && file.type !== "video/webm") {
            setMessage(
                "Fichier invalide. Nous supportons uniquement les vidéos au format MP4 ou WEBM"
            );
            setState(DragAndDropState.ERROR);
            return;
        }

        setState(DragAndDropState.UPLOADING);
        setMessage("En cours de téléchargement...");

        // Create a new FormData object
        const formData = new FormData();
        formData.append("file", file);
        formData.append("id", candidature.id.toString());

        // Create a new fetch request
        fetch(urlToUpload, {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    setMessage(
                        "Fichier téléchargé avec succès. Redirection..."
                    );
                    setState(DragAndDropState.SUCCESS);

                    // Reload the page to /candidature/success
                    setTimeout(() => {
                        window.location.href =
                            "/candidature/success?id=" + candidature.id;
                    }, 1500);
                } else {
                    setMessage("Erreur lors du téléchargement");
                    setState(DragAndDropState.ERROR);
                }
            })
            .catch(() => {
                setMessage("Erreur lors du téléchargement");
                setState(DragAndDropState.ERROR);
            });
    };

    console.log(urlToUpload);
    return (
        <div
            /* className="items-center flex justify-center min-h-64 w-full bg-gray-400/30 rounded-md mt-4
                border-dashed border-black/10 border-4" */
            className={clsx(
                "items-center flex flex-col justify-center min-h-64 w-full  rounded-md mt-4 ",
                "border-dashed border-black/10 border-4",
                {
                    "bg-green-100": State === DragAndDropState.SUCCESS,
                    "bg-red-100": State === DragAndDropState.ERROR,
                    "bg-gray-400/30": State === DragAndDropState.NOT_STARTED,
                    "bg-gray-400/50": State === DragAndDropState.DRAG_OVER,
                    "bg-gray-400/70": State === DragAndDropState.UPLOADING,
                }
            )}
            onDragEnter={(e) => {
                e.preventDefault();
                setMessage("Déposez votre vidéo ici");
                setState(DragAndDropState.DRAG_OVER);
            }}
            onDragLeave={(e) => {
                e.preventDefault();
                setMessage("Glissez-déposez votre vidéo ici");
                setState(DragAndDropState.NOT_STARTED);
            }}
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDrop={handleDrop}
        >
            <p className="text-sm text-black/40 ">{Message}</p>
            {State === DragAndDropState.UPLOADING && (
                <div className="rounded-full bg-white/40 p-2 animate-bounce mt-4">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-current text-purple-600"
                    >
                        <path
                            fill="currentColor"
                            d="M10 16h4c.55 0 1-.45 1-1v-5h1.59c.89 0 1.34-1.08.71-1.71L12.71 3.7a.996.996 0 0 0-1.41 0L6.71 8.29c-.63.63-.19 1.71.7 1.71H9v5c0 .55.45 1 1 1m-4 2h12c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1"
                        />
                    </svg>
                </div>
            )}
        </div>
    );
};
