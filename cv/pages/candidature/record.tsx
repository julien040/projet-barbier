import Footer from "../../components/footer";
import NavBar from "../../components/navbar";

// TODO: récupérer les informations depuis l'API et vérifier que la vidéo n'est pas déjà enregistrée

export default function Record() {
    return (
        <main>
            <NavBar />
            <div>
                <h1 className="text-3xl font-bold mt-8 tracking-tight text-black">
                    Enregistrez votre CV vidéo
                </h1>
                <p className="text-sm mt-1 text-black/60">
                    Enregistrez votre CV vidéo pour que nous puissions
                    l&apos;analyser et que votre employeur vous donne un retour.{" "}
                    <br />
                </p>

                <div
                    id="videomirror"
                    className="mt-4 aspect-video w-full bg-white/40 rounded-xl
                    border border-black/10"
                ></div>
                <div
                    className="items-center flex justify-center min-h-16 w-full bg-gray-400/30 rounded-md mt-4
                border-dashed border-black/10 border-4
                "
                >
                    <p className="text-sm text-black/40 ">
                        Glissez-déposez votre vidéo ici
                    </p>
                </div>
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
                            “euhhhhh”. Nous vous conseillons de répéter votre
                            texte avant de commencer
                        </p>
                    </li>
                    <li>
                        <p className="text-xl font-bold mt-3 tracking-tight text-black">
                            Donnez vos disponibilités
                        </p>
                        <p className="text-sm text-black/60">
                            Incluez dans l’enregistrement les secteurs auxquels
                            vous pouvez vous rendre
                        </p>
                    </li>
                </ol>
            </div>
            <Footer />
        </main>
    );
}
