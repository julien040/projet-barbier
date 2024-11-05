import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div>
            <style global jsx>{`
                html,
                body,
                body > div:first-child,
                div#__next,
                div#__next > div {
                    background: #f3f0e2;
                    height: 100%;
                    max-width: 780px;
                    margin: 0 auto;
                    padding: 4px;
                    margin-bottom: 128px;
                }
            `}</style>
            <Component className={inter.className} {...pageProps} />
        </div>
    );
}
