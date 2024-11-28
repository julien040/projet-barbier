import Footer from "../../components/footer";
import NavBar from "../../components/navbar";

export default function Result({}) {
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
                <a
                    className="mt-4 bg-[#f9eb7d] hover:bg-[#ffed67] transition-all rounded-lg text-sm px-6 py-3 font-semibold border border-black/10"
                    href="/"
                >
                    Retourner à l&apos;accueil
                </a>
            </div>
            <Footer />
        </main>
    );
}
