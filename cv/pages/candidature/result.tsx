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
import ErrorComponent from "../../components/error";

// TODO: récupérer les informations depuis l'API et vérifier que la vidéo n'est pas déjà enregistrée

export const getServerSideProps = (async (
    context: GetServerSidePropsContext
) => {
    const params = new URLSearchParams(context.query as Record<string, string>);

    const urlToFetch =
        "http://127.0.0.1:3001/v1/getVideo" + "?" + params.toString();

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
        <main className="text-black">
            <NavBar />
            {candidature &&
                candidature.video_path &&
                candidature.video_remodele_path && (
                    <VideoPlayer
                        src={"/video/" + candidature.video_path}
                        srcRemod={"/video/" + candidature.video_remodele_path}
                    />
                )}
            <DataInfos candidature={candidature} />
            <Footer />
        </main>
    );
}

const DataInfos = ({ candidature }: { candidature: candidature }) => {
    if (!candidature) {
        return <ErrorComponent message="Aucune candidature trouvée" />;
    }

    if (!candidature.video_path || candidature.video_path === "") {
        return (
            <ErrorComponent message="Le candidat n'a pas encore enregistré de vidéo" />
        );
    }

    if (
        !candidature.video_remodele_path ||
        candidature.video_remodele_path === "" ||
        candidature.status === "CV soumis"
    ) {
        return (
            <ErrorComponent message="La vidéo n'a pas encore été traitée mais l'utilisateur l'a envoyée. Revenez ici dans quelques minutes" />
        );
    }

    return (
        <div className="py-6 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex flex-col md:basis-3/4 basis-full">
                <h1 className="text-2xl tracking-tight font-bold">
                    Candidature de {candidature.candidat_prenom}{" "}
                    {candidature.candidat_nom}{" "}
                </h1>
                <h2 className="font-bold tracking-tight mt-3">Notre analyse</h2>
                <p className="text-sm text-black/70 whitespace-pre-line">
                    {candidature.resultat.conclusion}
                </p>

                {/* <h2 className="font-bold tracking-tight mt-3">Transcription</h2>
                <p className="text-sm text-black/70">
                    {candidature.transcription}
                </p> */}
                <details className="mt-4">
                    <summary className="font-bold tracking-tight">
                        Transcription
                    </summary>
                    <p className="text-sm text-black/70">
                        {candidature.transcription}
                    </p>
                </details>
                <details className="mt-4">
                    <summary className="font-bold tracking-tight">
                        Informations supplémentaires
                    </summary>
                    <p className="text-sm text-black/70">
                        {candidature.informations_supplementaires}
                    </p>
                </details>
            </div>
            <aside className="flex flex-col md:basis-1/4 bg-black/10 rounded-lg p-4 basis-full">
                <h2 className="font-medium text-sm tracking-tight text-black/60">
                    Scores
                </h2>
                <p className="text-5xl font-bold">
                    {candidature.resultat.score}
                    {""}
                    <span className="text-xl">/ 100</span>
                </p>
                <h2 className="font-medium text-sm tracking-tight text-black/60 mt-4">
                    Infos
                </h2>
                <p>
                    <span className="font-semibold">Ville:</span>{" "}
                    {candidature.resultat.villeCandidat}
                </p>
                <p>
                    <span className="font-semibold">Métier:</span>{" "}
                    {candidature.resultat.metierCandidat}
                </p>
                <h2 className="font-medium text-sm tracking-tight text-black/60 mt-2">
                    Compétences
                </h2>
                <ul className="text-sm text-black list-disc list-inside">
                    {candidature.resultat.competences?.map((competence) => (
                        <li key={competence}>{competence}</li>
                    ))}
                </ul>
            </aside>
        </div>
    );
};

const VideoPlayer = ({ src, srcRemod }: { src: string; srcRemod: string }) => {
    console.log("Src of", src, srcRemod);
    const [isRemod, setIsRemod] = useState(false);

    return (
        <div className="flex flex-col items-center mt-5">
            <video
                className="rounded-lg w-full aspect-video"
                src={isRemod ? srcRemod : src}
                controls
            />
            <div className="flex w-full p-2 rounded-md bg-black/10 text-sm mt-2">
                <p
                    className={clsx(
                        "cursor-pointer p-1 text-black flex-1 rounded-lg justify-center items-center flex",
                        {
                            "bg-white/40": !isRemod,
                        }
                    )}
                    onClick={() => setIsRemod(false)}
                >
                    Vidéo originale
                </p>
                <p
                    className={clsx(
                        "cursor-pointer p-1 text-black flex-1 rounded-lg justify-center items-center flex",
                        {
                            "bg-white/40": isRemod,
                        }
                    )}
                    onClick={() => setIsRemod(true)}
                >
                    Vidéo remodélisée
                </p>
            </div>
        </div>
    );
};
