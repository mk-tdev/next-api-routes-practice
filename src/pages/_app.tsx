import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="m-5">
      <Component {...pageProps} />
    </div>
  );
}
