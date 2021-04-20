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
          <div className="alert alert-warning flex space-x-3 justify-between items-center mt-2 fixed inset-x-0 top-14 left-0">
            <div className="flex space-x-2 items-center">
              <img src="/delet_trai_acc.svg" alt="alert" className="me-2 h-8 w-8" />
              Please enable javascript for better experience
            </div>

            <form action="/closeJSPopup" method="GET">
              <input
                className="visually-hidden"
                type="text"
                value={router.pathname}
                name="redirect"
                onChange={() => null}
              />
              <button className="btn btn-danger mt-1">Agree and Close</button>
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
