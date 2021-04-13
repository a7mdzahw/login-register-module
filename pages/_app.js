import ProgressBar from "nextjs-progressbar";

import Navbar from "../components/shared/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ProgressBar />
      <Navbar user={pageProps.user || null} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
