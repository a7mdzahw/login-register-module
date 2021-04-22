import App from "next/app";
import { useRouter } from "next/router";
import ProgressBar from "nextjs-progressbar";
import Footer from "../components/shared/footer";

import Navbar from "../components/shared/Navbar";
import { LangContextProvider } from "../context/LangContext";

function MyApp({ Component, pageProps, lang, js }) {
  const router = useRouter();
  return (
    <div className="App">
      <LangContextProvider lang={lang}>
        <ProgressBar options={{ showSpinner: false }} />
        <Navbar user={pageProps.user || null} authState={pageProps.authState || "login"} />
        <div className="container-fluid">
          <Component {...pageProps} />
        </div>

        {js === "false" ? null : (
          <noscript>
            <div className="js-container">
              <div className="js-content">
                <img src="/delet_trai_acc.svg" alt="alert" className="js-alert" />
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
        <div className="mt-2"></div>
        <Footer />
      </LangContextProvider>
    </div>
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
