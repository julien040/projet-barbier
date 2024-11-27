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
    const data = await res.json();
    return {
        props: {
            candidature: data,
        },
    };
}) satisfies GetServerSideProps<{ candidature: candidature }>;

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
                        <a
                            href={`https://cv-video.julienc.me/candidature/record?id=${candidature.id}`}
                            className="text-blue-500 underline"
                        >
                            {`https://cv-video.julienc.me/candidature/record?id=${candidature.id}`}
                        </a>
                        <p className="text-xs text-black/40">
                            Envoyez ce lien au candidat pour qu&apos;il puisse
                            s&apos;enregistrer
                        </p>
                    </div>
                </>
            )}

            <Footer />
        </main>
    );
}
