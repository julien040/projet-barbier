export default function Footer() {
    return (
        <>
            <footer className="p-4 rounded-lg border border-black/10 bg-white/30 mt-6">
                <a className="flex gap-2 items-center" href="/">
                    <img src="/favicon.svg" alt="Logo" className="h-4 w-4" />
                    <h1 className="text-sm font-semibold text-black/80">
                        Curriculum Video
                    </h1>
                </a>
                <p className="text-xs text-black/60 mt-1">
                    Curriculum Video est une plateforme qui vous permet
                    d&apos;analyser les CV vidéos de candidats.
                </p>
                <p className="text-xs text-black/40 mt-3">
                    Copyright © 2024 <br />
                    Ulyana Yasiukaitsis et Julien Cagniart
                </p>
            </footer>
            <div className="h-4"></div>
        </>
    );
}
