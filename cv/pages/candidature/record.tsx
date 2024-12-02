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

// TODO: récupérer les informations depuis l'API et vérifier que la vidéo n'est pas déjà enregistrée

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

const WebcamRecorder = ({ candidature }: { candidature: candidature }) => {
    const urlToUpload = "/api/upload?id=" + candidature.id;
    console.log(urlToUpload);
    return (
        <div
            id="videomirror"
            className="mt-4 aspect-video w-full bg-white/40 rounded-xl
                    border border-black/10"
        ></div>
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
        if (file.type !== "video/mp4") {
            setMessage(
                "Fichier invalide. Nous supportons uniquement les vidéos au format MP4"
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
                        window.location.href = "/candidature/success";
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
