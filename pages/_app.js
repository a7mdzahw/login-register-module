import App from "next/app";
import ProgressBar from "nextjs-progressbar";

import Navbar from "../components/shared/Navbar";
import { LangContextProvider } from "../context/LangContext";

function MyApp({ Component, pageProps, lang }) {
  return (
    <LangContextProvider lang={lang}>
      <ProgressBar />
      <Navbar user={pageProps.user || null} />
      <Component {...pageProps} />
    </LangContextProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const lang = appContext.ctx.req.cookies.lang;

  return { ...appProps, lang };
};

export default MyApp;
