import Footer from "../components/footer";
import NavBar from "../components/navbar";
import type { GetServerSideProps } from "next";
import type { candidature } from "../other/types";

export const getServerSideProps = (async () => {
    const urlToFetch = "http://127.0.0.1:3001/v1/getVideos";

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
            candidatures: data,
        },
    };
}) satisfies GetServerSideProps<{ candidatures?: candidature[] }>;

function shaveString(str: string | null | undefined, max: number) {
    if (!str || str.length == 0)
        return "Le candidat n'a pas encore enregistré de vidéo";
    else return str.length > max ? str.substring(0, max) + "..." : str;
}

export default function Admin({
    candidatures,
}: {
    candidatures?: candidature[];
}) {
    return (
        <main className="text-black">
            <NavBar />
            <h1 className="text-2xl font-bold tracking-tight mt-4">
                Vue administrateur
            </h1>
            <p className="text-sm text-black/60">
                Cette page liste l&apos;ensemble des candidatures reçues et
                permet de les traiter.
            </p>
            <h1 className="text-lg font-bold tracking-tight mt-4">
                Candidatures créées
            </h1>
            <div className="grid gap-2 mt-1">
                {candidatures &&
                    candidatures.map((candidature) => {
                        return (
                            <a
                                key={candidature.id}
                                className="bg-white/20 border border-black/10 p-5 rounded-lg flex justify-between gap-4"
                                href={
                                    candidature.video_remodele_path ||
                                    candidature.video_remodele_path !== ""
                                        ? "/candidature/result?id=" +
                                          candidature.id
                                        : "/candidature/record?id=" +
                                          candidature.id
                                }
                            >
                                <div>
                                    <div className="flex flex-wrap items-center gap-4">
                                        <h2 className="font-semibold tracking-tight text-black">
                                            {candidature.candidat_prenom}{" "}
                                            {candidature.candidat_nom}
                                        </h2>
                                        <p className="text-xs text-black px-2 py-1 rounded-lg bg-yellow-500/70">
                                            {candidature.status}
                                        </p>
                                    </div>
                                    <p className="text-sm text-black/50 mt-1">
                                        {shaveString(
                                            candidature.resultat.conclusion,
                                            150
                                        )}
                                    </p>
                                    <div className="flex gap-2">
                                        <div className="bg-black max-w-fit px-3 py-1 rounded-md flex mt-4 items-center">
                                            <svg
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="text-white h-4 w-4"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    fill-rule="evenodd"
                                                    d="M12.556 23h-1.1l-1.008-1.217c-1.358-1.64-2.932-3.739-4.177-5.916C5.063 13.755 4 11.293 4 9c0-4.605 3.395-8 8-8s8 3.395 8 8c0 2.305-1.096 4.768-2.313 6.867c-1.256 2.166-2.83 4.258-4.137 5.89zM16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0"
                                                    clip-rule="evenodd"
                                                />
                                                <path
                                                    fill="currentColor"
                                                    d="M12 11a2 2 0 1 1 0-4a2 2 0 0 1 0 4"
                                                />
                                            </svg>
                                            <p className="text-white text-xs ml-1">
                                                {
                                                    candidature.formulaire_emplacement
                                                }
                                            </p>
                                        </div>
                                        <div className="bg-black max-w-fit px-3 py-1 rounded-md flex mt-4 items-center">
                                            <svg
                                                viewBox="0 0 48 48"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="text-white h-4 w-4"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="4"
                                                    d="M24 20a7 7 0 1 0 0-14a7 7 0 0 0 0 14M6 40.8V42h36v-1.2c0-4.48 0-6.72-.872-8.432a8 8 0 0 0-3.496-3.496C35.92 28 33.68 28 29.2 28H18.8c-4.48 0-6.72 0-8.432.872a8 8 0 0 0-3.496 3.496C6 34.08 6 36.32 6 40.8"
                                                />
                                            </svg>
                                            <p className="text-white text-xs ml-1">
                                                {candidature.formulaire_metier}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
            </div>
            <Footer />
        </main>
    );
}
