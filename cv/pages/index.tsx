import Footer from "../components/footer";
import NavBar from "../components/navbar";

export default function Home() {
    return (
        <main>
            <NavBar />
            <div className="p-7 rounded-lg bg-[url(/header.png)] bg-cover bg-center text-white w-full my-6 transition-all">
                <div className="max-w-[500px] mb-4">
                    <h1 className="text-2xl font-bold">
                        Analysez les CV vidéos de vos potentiels futurs
                        collaborateurs
                    </h1>
                    <p className="text-white/80 text-sm mt-1">
                        Nous analysons les CV vidéos de vos candidats pour vous
                        aider à faire un choix, de façon impartiale et
                        automatisée
                    </p>
                </div>
                <div className="flex gap-4">
                    <a
                        className="px-6 py-2 bg-[#ffee6f] rounded-md text-black text-sm font-semibold hover:bg-[#fce745] transition-all"
                        href="/candidature/start"
                    >
                        Commencer
                    </a>
                    <a
                        className="px-6 py-2 rounded-md text-white text-sm font-semibold bg-white/10  transition-all border  border-yellow-300"
                        href="#fonctionnement"
                    >
                        En apprendre plus
                    </a>
                </div>
                <div className="h-60"></div>
            </div>
            <div id="fonctionnement" className="text-black flex-col flex gap-4">
                <h2 className="font-bold text-2xl tracking-tight">
                    Comment ça marche ?
                </h2>
                <div className="flex flex-row flex-wrap justify-between gap-4 items-center">
                    <div className="flex-1">
                        <h3 className="font-bold text-xl tracking-tight">
                            1. Fiche de poste
                        </h3>
                        <p className="text-sm text-black/70">
                            Rentrez les informations sur la fiche de poste dans
                            le formulaire. Soyez le plus exhaustif possible
                        </p>
                    </div>
                    <img
                        className=" max-w-full md:max-w-[25%] grow-0"
                        src="/first.png"
                    />
                </div>
                <div className="flex flex-col md:flex-row-reverse flex-wrap justify-between gap-4 items-center">
                    <div className="flex-1">
                        <h3 className="font-bold text-xl tracking-tight">
                            2. Partage du lien
                        </h3>
                        <p className="text-sm text-black/70">
                            Envoyer le lien généré à votre candidat afin qu’il
                            s’enregistre pour son CV vidéo
                        </p>
                    </div>
                    <img
                        className=" max-w-full md:max-w-[25%] grow-0"
                        src="/second.png"
                    />
                </div>
                <div className="flex flex-row flex-wrap justify-between gap-4 items-center">
                    <div className="flex-1">
                        <h3 className="font-bold text-xl tracking-tight">
                            3. Enregistrement de la vidéo
                        </h3>
                        <p className="text-sm text-black/70">
                            Le candidat s’enregistre avec sa webcam ou son
                            téléphone. Il transmet ensuite à la vidéo à notre
                            service
                        </p>
                    </div>
                    <img
                        className=" max-w-full md:max-w-[25%] grow-0"
                        src="/third.png"
                    />
                </div>
            </div>
            <Footer />
        </main>
    );
}
