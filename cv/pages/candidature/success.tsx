import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

type Links = {
    Homepage: string;
    Result: string;
};

export const getServerSideProps = (async ({ query }) => {
    // Get the ID from the URL params
    const { id } = query;

    if (typeof id !== "string") {
        return {
            notFound: true,
        };
    }

    const links: Links = {
        Homepage: "/",
        Result: `/candidature/result?id=${id}`,
    };

    return {
        props: {
            links,
        },
    };
}) satisfies GetServerSideProps<{ links: Links }>;

export default function Result({
    links,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <main>
            <NavBar />
            <div className="min-h-96 flex items-center justify-center flex-col">
                <h2 className="text-2xl font-bold  tracking-tight text-black">
                    Félicitations 🎉 Votre candidature a bien été envoyée !
                </h2>
                <p className="text-sm text-black/60 mt-1">
                    Votre recruteur l&apos;a bien reçue et vous donnera un
                    retour sous peu.
                </p>
                <div className="flex gap-4 mt-4">
                    <a
                        className="transition-all rounded-lg text-sm px-6 py-3 font-semibold border border-black/10"
                        href={links.Homepage}
                    >
                        Retourner à l&apos;accueil
                    </a>
                    <a
                        className=" bg-[#f9eb7d] hover:bg-[#ffed67] transition-all rounded-lg text-sm px-6 py-3 font-semibold border border-black/10"
                        href={links.Result}
                    >
                        Voir le résultat
                    </a>
                </div>
            </div>
            <Footer />
        </main>
    );
}
