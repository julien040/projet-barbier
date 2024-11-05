function NavBar() {
    return (
        <div className="flex justify-between w-full items-center">
            <div className="flex gap-2 items-center">
                <img src="/favicon.svg" alt="Logo" className="h-8 w-8" />
                <h1 className="text-md font-bold">Curriculum Video</h1>
            </div>
            <div className="flex gap-6 text-sm">
                <a
                    href="/#fonctionnement"
                    className="text-black/60 hover:text-black/80"
                >
                    Fonctionnement
                </a>
                <a
                    href="/#fonctionnement"
                    className="text-black/60 hover:text-black/80"
                >
                    Résultats
                </a>
                <a
                    href="/#fonctionnement"
                    className="text-black/60 hover:text-black/80"
                >
                    S’enregistrer
                </a>
            </div>
        </div>
    );
}

export default NavBar;
