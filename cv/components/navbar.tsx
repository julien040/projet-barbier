function NavBar() {
    return (
        <div className="flex justify-between w-full items-center">
            <a className="flex gap-2 items-center" href="/">
                <img
                    src="/favicon.svg"
                    alt="Logo"
                    className="h-6 w-6 md:h-8 md:w-8"
                />
                <h1 className="text-sm md:text-base font-bold text-black">
                    Curriculum Video
                </h1>
            </a>
            <div className="flex gap-3 md:gap-6 text-sm items-center">
                <a href="/admin" className="text-black/70 hover:text-black">
                    Administrateur
                </a>
                <a
                    href="/candidature/start"
                    className="text-black/70 bg-[#f9eb7d] hover:bg-[#ffed67] transition-all rounded-lg text-sm px-3 md:px-6 py-2 font-semibold border border-black/10"
                >
                    Nouveau CV
                </a>
            </div>
        </div>
    );
}

export default NavBar;
