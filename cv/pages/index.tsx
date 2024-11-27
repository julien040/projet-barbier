import Footer from "../components/footer";
import NavBar from "../components/navbar";

export default function Home() {
    return (
        <main>
            <NavBar/>
            <div
                className="p-7 rounded-lg bg-[url(/header.png)] bg-cover bg-center text-white w-full my-6 transition-all">
                <div className="max-w-[500px] mb-4">
                    <h1 className="text-2xl font-bold">
                        Analysez les CV vidéos de vos potentiels futurs
                        collaborateurs
                    </h1>
                    <p className="text-white/70 text-sm mt-1">
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
                    <div
                        className="h-[37px] px-[15px] py-3 bg-[#f8eb91]/0 rounded-md border border-[#f8eb91] justify-center items-center gap-2.5 inline-flex">
                        <div className="text-white text-[11px] font-semibold font-['Inter']">En apprendre plus</div>
                    </div>
                </div>
                <div className="h-60"></div>
            </div>
            <div className="bg-center w-full my-6" id="fonctionnement">
                <div className="text-black text-[28px] font-bold font-['Inter']">Comment ça marche ?</div>

                <div className="w-[771px] h-[152px] justify-between items-center inline-flex">
                    <div className="w-[452px] flex-col justify-start items-start gap-1.5 inline-flex">
                        <div className="self-stretch text-black text-xl font-bold font-['Inter']">1. Fiche de poste</div>
                        <div className="self-stretch text-black/70 text-base font-medium font-['Inter']">Rentrez les
                            informations sur la fiche de poste dans le formulaire. Soyez le plus exhaustif possible
                        </div>
                    </div>
                    <img className="w-[212px] h-[152px] rounded-[14px]" src="/first.png"/>
                </div>

                <div className="w-[771px] h-[152px] justify-between items-center inline-flex">
                    <img className="w-[212px] h-[152px] rounded-[14px]" src="/second.png"/>
                    <div className="w-[452px] flex-col justify-start items-start gap-1.5 inline-flex">
                        <div className="self-stretch text-right text-black text-xl font-bold font-['Inter']">2. Partage du
                            lien
                        </div>
                        <div
                            className="self-stretch text-right text-black/70 text-base font-medium font-['Inter']">Envoyer
                            le lien généré à votre candidat afin qu’il s’enregistre pour son CV vidéo
                        </div>
                    </div>
                </div>


                <div className="w-[771px] h-[152px] justify-between items-center inline-flex">
                    <div className="w-[452px] flex-col justify-start items-start gap-1.5 inline-flex">
                        <div className="self-stretch text-black text-xl font-bold font-['Inter']">3. Enregistrement de la
                            vidéo
                        </div>
                        <div className="self-stretch text-black/70 text-base font-medium font-['Inter']">Le candidat
                            s’enregistre avec sa webcam ou son téléphone. Il transmet ensuite à la vidéo à notre service
                        </div>
                    </div>
                    <img className="w-[212px] h-[152px] rounded-[14px]" src="/third.png"/>
                </div>


                <div className="w-[771px] h-[152px] justify-between items-center inline-flex">
                    <img className="w-[212px] h-[152px] rounded-[14px]" src="/fourth.png"/>
                    <div className="w-[452px] flex-col justify-start items-start gap-1.5 inline-flex">
                        <div className="self-stretch text-right text-black text-xl font-bold font-['Inter']">4. Analyse du
                            résultat
                        </div>
                        <div
                            className="self-stretch text-right text-black/70 text-base font-medium font-['Inter']">Notre
                            service analyse le CV vidéo, et vous envoie les résultats pour que vous puissiez prendre une
                            décision basée sur les données
                        </div>
                    </div>
                </div>

                <p></p>
            </div>
            <Footer/>
        </main>
    );
}

