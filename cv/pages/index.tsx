import NavBar from "../components/navbar";

export default function Home() {
    return (
        <main>
            <NavBar />
            <div className="p-7 rounded-lg bg-[url(/header.png)] bg-cover bg-center text-white w-full my-6">
                <div className="max-w-96 mb-4">
                    <h1 className="text-2xl font-bold">
                        Analysez les CV vidéos de vos potentiels futurs
                        collaborateurs
                    </h1>
                    <p className="text-white/70 text-sm">
                        Nous analysons les CV vidéos de vos candidats pour vous
                        aider à faire un choix, de façon impartiale et
                        automatisée
                    </p>
                </div>
                <div className="flex gap-4">
                    <a
                        className="px-6 py-3 bg-[#F9EC91] rounded-md text-black text-sm font-semibold"
                        href="/start"
                    >
                        Commencer
                    </a>
                    <a className="px-6 py-3 rounded-md border border-white/20 text-white/80 text-sm font-semibold">
                        En apprendre plus
                    </a>
                </div>
                <div className="h-60"></div>
            </div>
            <div id="fonctionnement">
                <h1>Hello World</h1>
                <p></p>
            </div>
        </main>
    );
}
