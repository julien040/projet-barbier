import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import AutoComplete from "@/pages/autoComplete";
import AutoCompleteCities from "@/autoCompleteCities";

export default function Home() {
    return (
        <main>
            <NavBar />
            <h1 className="text-2xl md:text-3xl font-bold mt-8 tracking-tight text-black">
                Créer un nouvel entretien
            </h1>
            <p className="text-sm mt-1 text-black/60">
                Remplissez ce formulaire pour créer un nouvel entretien vidéo.
                Notre service vous fournira ensuite un lien unique à partager
                avec le candidat.
            </p>
            <form
                className="p-7 rounded-lg border border-black/10 bg-white/40 w-full mt-4 text-black"
                action="/candidature/link"
                method="GET"
            >
                <div>
                    <h2 className="text-xl font-bold mb-3 tracking-tighter">
                        Candidat
                    </h2>
                    <div className="flex gap-3 w-full justify-between">
                        <div className="flex flex-col gap-1 w-full">
                            <label
                                className="text-sm font-bold"
                                htmlFor="candidat_prenom"
                            >
                                Prénom *
                            </label>
                            <input
                                type="text"
                                id="candidat_prenom"
                                placeholder="John"
                                className="border border-black/10 p-2  bg-white rounded-md text-sm"
                                name="candidat_prenom"
                                required
                                autoComplete="nickname"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full mt-4">
                        <label
                            className="text-sm font-bold"
                            htmlFor="candidat_nom"
                        >
                            Nom *
                        </label>
                        <input
                            type="text"
                            id="candidat_nom"
                            placeholder="Doe"
                            className="border border-black/10 p-2 bg-white rounded-md text-sm"
                            name="candidat_nom"
                            required
                            autoComplete="family-name"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full mt-4">
                        <label
                            className="text-sm font-bold"
                            htmlFor="candidat_email"
                        >
                            Email *
                        </label>
                        <input
                            type="email"
                            id="candidat_email"
                            placeholder="john.doe@example.com"
                            className="border border-black/10 p-2 bg-white rounded-md text-sm"
                            name="candidat_email"
                            required
                            autoComplete="email"
                        />
                    </div>
                </div>
                <div className="pt-4 mt-6 border-t border-black/10">
                    <h2 className="text-xl font-bold mb-3 tracking-tighter ">
                        Employeur
                    </h2>
                    <div className="flex gap-3 justify-between">
                        <div className="flex flex-col gap-1 w-full">
                            <label
                                className="text-sm font-bold"
                                htmlFor="recruteur_nom"
                            >
                                Nom *
                            </label>
                            <input
                                type="text"
                                id="recruteur_nom"
                                placeholder="Doe"
                                className="border border-black/10 p-2 bg-white rounded-md text-sm"
                                name="recruteur_nom"
                                required
                                autoComplete="family-name"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1  mt-4">
                        <label
                            className="text-sm font-bold"
                            htmlFor="recruteur_email"
                        >
                            Email *
                        </label>
                        <input
                            type="email"
                            id="recruteur_email"
                            placeholder="john.doe@example.com"
                            className="border border-black/10 p-2 bg-white rounded-md text-sm"
                            name="recruteur_email"
                            required
                            autoComplete="email"
                        />
                    </div>
                </div>

                <div className="pt-4 mt-6 border-t border-black/10">
                    <h2 className="text-xl font-bold mb-3 tracking-tighter ">
                        Fiche d&apos;emploi
                    </h2>

                    <div className="flex gap-3 w-full justify-between">
                        <AutoComplete />
                    </div>

                    <div className="mt-4">
                        <AutoCompleteCities />
                    </div>

                    <div className="flex flex-col gap-1 w-full mt-4">
                        <label
                            className="text-sm font-bold"
                            htmlFor="informations_supplementaires"
                        >
                            Informations supplémentaires
                        </label>
                        <textarea
                            id="informations_supplementaires"
                            placeholder="expérience requise, compétences recherchées, etc."
                            className="border border-black/10 p-2 bg-white rounded-md text-sm"
                            name="informations_supplementaires"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-white text-black/90 rounded-md p-3 w-full mt-6 font-semibold text-sm"
                >
                    Créer l&apos;entretien
                </button>
            </form>
            <Footer />
        </main>
    );
}
