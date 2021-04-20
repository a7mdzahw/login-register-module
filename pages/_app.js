import App from "next/app";
import { useRouter } from "next/router";
import ProgressBar from "nextjs-progressbar";

import Navbar from "../components/shared/Navbar";
import { LangContextProvider } from "../context/LangContext";

function MyApp({ Component, pageProps, lang, js }) {
  const router = useRouter();
  return (
    <LangContextProvider lang={lang}>
      <ProgressBar />
      <Navbar user={pageProps.user || null} />
      <Component {...pageProps} />

      {js === "false" ? null : (
        <noscript>
          <div className="alert alert-warning flex flex-col space-y-1 items-center mt-2 fixed top-12 left-0">
            <img src="/delet_trai_acc.svg" alt="alert" className="me-2" />
            Please enable javascript for better experience
            <form action="/closeJSPopup" method="GET" className="w-full">
              <input
                className="visually-hidden"
                type="text"
                value={router.pathname}
                name="redirect"
                onChange={() => null}
              />
              <button className="btn btn-danger mt-1 d-block w-full">Agree and Close</button>
            </form>
          </div>
        </noscript>
      )}
    </LangContextProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const req = appContext.ctx.req;
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const lang = req.cookies.lang;

  return { ...appProps, lang, js: req.cookies.js };
};

export default MyApp;
