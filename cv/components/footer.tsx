export default function Footer() {
    return (
        <>
            <footer className="p-4 rounded-lg border border-black/10 bg-white/30 mt-6">
                <a className="flex gap-2 items-center" href="/">
                    <img src="/favicon.svg" alt="Logo" className="h-4 w-4" />
                    <h1 className="text-sm font-semibold text-black/90">
                        Curriculum Video
                    </h1>
                </a>
                <p className="text-xs text-black/40 mt-1 mb-3">
                    Copyright © 2024 <br />
                    Ulyana Yasiukaitsis et Julien Cagniart
                </p>

                <div className="flex gap-4 items-center"></div>

                <a href="https://github.com/julien040/projet-barbier">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className=" text-black/80 hover:text-black transition-all"
                    >
                        <path
                            fill="currentColor"
                            d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                        />
                    </svg>
                </a>
            </footer>
            <div className="h-4"></div>
        </>
    );
}
