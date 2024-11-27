import Footer from "../components/footer";
import NavBar from "../components/navbar";
import AutoComplete from "@/pages/autoComplete";
import metiers from "../public/metiers.json";
import AutoCompleteCities from "@/autoCompleteCities";

export default function Home() {
    return (
        <main>
            <NavBar />
            <h1 className="text-3xl font-bold mt-12 tracking-tight text-black">
                Créer un nouvel entretien
            </h1>
            <form
                className="p-7 rounded-lg border border-black/10 bg-white/40 w-full mt-4 text-black"
                action="/api/create-interview"
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
                                htmlFor="prenom_candidat"
                            >
                                Prénom
                            </label>
                            <input
                                type="text"
                                id="prenom_candidat"
                                placeholder="John"
                                className="border border-black/10 p-2  bg-white rounded-md text-sm"
                                name="prenom_candidat"
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label
                                className="text-sm font-bold"
                                htmlFor="nom_candidat"
                            >
                                Nom
                            </label>
                            <input
                                type="text"
                                id="nom_candidat"
                                placeholder="Doe"
                                className="border border-black/10 p-2 bg-white rounded-md text-sm"
                                name="nom_candidat"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full mt-4">
                        <label
                            className="text-sm font-bold"
                            htmlFor="email_candidat"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email_candidat"
                            placeholder="john.doe@example.com"
                            className="border border-black/10 p-2 bg-white rounded-md text-sm"
                            name="email_candidat"
                        />
                    </div>
                </div>
                <div className="pt-4 mt-6 border-t border-black/10">
                    <h2 className="text-xl font-bold mb-3 tracking-tighter ">
                        Employeur
                    </h2>
                    <div className="flex gap-3 w-full justify-between">
                        <div className="flex flex-col gap-1 w-full">
                            <label
                                className="text-sm font-bold"
                                htmlFor="prenom_recruteur"
                            >
                                Prénom
                            </label>
                            <input
                                type="text"
                                id="prenom_recruteur"
                                placeholder="John"
                                className="border border-black/10 p-2  bg-white rounded-md text-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label
                                className="text-sm font-bold"
                                htmlFor="nom_recruteur"
                            >
                                Nom
                            </label>
                            <input
                                type="text"
                                id="nom_recruteur"
                                placeholder="Doe"
                                className="border border-black/10 p-2 bg-white rounded-md text-sm"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full mt-4">
                        <label
                            className="text-sm font-bold"
                            htmlFor="email_recruteur"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email_recruteur"
                            placeholder="john.doe@example.com"
                            className="border border-black/10 p-2 bg-white rounded-md text-sm"
                        />
                    </div>
                </div>

                <div className="pt-4 mt-6 border-t border-black/10">
                    <h2 className="text-xl font-bold mb-3 tracking-tighter ">
                        Fiche d&apos;emploi
                    </h2>

                    <div className="flex gap-3 w-full justify-between">
                       <AutoComplete/>
                        <AutoCompleteCities/>
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
