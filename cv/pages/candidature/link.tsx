import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import type {
    InferGetServerSidePropsType,
    GetServerSideProps,
    GetServerSidePropsContext,
} from "next";
import type { candidature } from "../../other/types";

export const getServerSideProps = (async (
    context: GetServerSidePropsContext
) => {
    const params = new URLSearchParams(context.query as Record<string, string>);

    const urlToFetch =
        "http://127.0.0.1:3001/v1/newVideo" + "?" + params.toString();

    console.log("URL to fetch: ", urlToFetch);
    const res = await fetch(urlToFetch);
    if (!res.ok) {
        return {
            props: {
                candidature: {
                    message:
                        "Une erreur est survenue lors de l'envoi au serveur",
                },
            },
        };
    }
    const data = await res.json();
    return {
        props: {
            candidature: data,
        },
    };
}) satisfies GetServerSideProps<{ candidature: candidature }>;

const CopyButton = ({ text }: { text: string }) => {
    return (
        <span
            onClick={() => {
                navigator.clipboard.writeText(text);
            }}
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:cursor-copy"
            >
                <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                >
                    <path d="M16 3H4v13" />
                    <path d="M8 7h12v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
                </g>
            </svg>
        </span>
    );
};

export default function Result({
    candidature,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log(candidature);
    return (
        <main>
            <NavBar />
            {candidature.message && candidature.message !== "" && (
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full mt-4"
                    role="alert"
                >
                    <strong className="font-bold">Erreur !</strong>
                    <span className="block sm:inline">
                        {candidature.message}
                    </span>
                </div>
            )}

            {(!candidature.message || candidature.message === "") && (
                <>
                    <h1 className="text-3xl font-bold mt-8 tracking-tight text-black">
                        Candidature envoyée
                    </h1>
                    <p className="text-sm mt-1 text-black/60">
                        🎉 Félicitations, votre candidature a bien été envoyée.
                        N&apos;oubliez pas de partager le lien au candidat !
                    </p>
                    <div className="flex flex-col items-center justify-center p-7 rounded-lg border border-black/10 bg-white/40 w-full mt-4 min-h-64">
                        <div className="flex gap-2">
                            <a
                                href={`https://cv-video.julienc.me/candidature/record?id=${candidature.id}`}
                                className="text-blue-500 hover:underline"
                            >
                                {`https://cv-video.julienc.me/candidature/record?id=${candidature.id}`}
                            </a>
                            <CopyButton
                                text={`https://cv-video.julienc.me/candidature/record?id=${candidature.id}`}
                            />
                        </div>
                        <p className="text-xs text-black/40">
                            Envoyez ce lien au candidat pour qu&apos;il puisse
                            s&apos;enregistrer
                        </p>
                        <br />

                        <div className="flex gap-2">
                            <a
                                className="text-blue-500 hover:text-blue-700 hover:underline flex"
                                href={`/candidature/result?id=${candidature.id}`}
                            >
                                {"https://cv-video.julienc.me/candidature/result?id=" +
                                    candidature.id}
                            </a>
                            <CopyButton
                                text={
                                    "https://cv-video.julienc.me/candidature/result?id=" +
                                    candidature.id
                                }
                            />
                        </div>
                        <p className="text-xs text-black/40">
                            Vous pourrez accéder à la vidéo enregistrée sur
                            cette page.
                        </p>

                        <p className="text-sm font-semibold text-black/70 mt-auto">
                            ⚠️ Notez bien ces liens, ils ne seront plus
                            affichés. ⚠️
                        </p>
                    </div>
                </>
            )}

            <Footer />
        </main>
    );
}
