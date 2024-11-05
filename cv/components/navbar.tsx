function NavBar() {
    return (
        <div className="flex justify-between w-full items-center">
            <a className="flex gap-2 items-center" href="/">
                <img src="/favicon.svg" alt="Logo" className="h-8 w-8" />
                <h1 className="text-md font-bold text-black">
                    Curriculum Video
                </h1>
            </a>
            <div className="flex gap-6 text-sm items-center">
                <a
                    href="/#fonctionnement"
                    className="text-black/70 hover:text-black/80"
                >
                    Fonctionnement
                </a>
                <a
                    href="/#fonctionnement"
                    className="text-black/70 hover:text-black/80"
                >
                    Résultats
                </a>
                <a
                    href="/start"
                    className="text-black/70 bg-[#f9eb7d] rounded-lg text-sm px-6 py-2 font-semibold border border-black/10"
                >
                    Commencer
                </a>
            </div>
        </div>
    );
}

export default NavBar;
