import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const lang = ctx.req.cookies.lang;
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, lang };
  }
  render() {
    const lang = this.props.lang;
    return (
      <Html dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
        <Head>
          {/* adding styles and favicon */}
          <link rel="shortcut icon" href="/dexe_icon.png" type="image/x-icon" />
          <link rel="stylesheet" href="/ssr-main.css" />
          {/* <link rel="stylesheet" href="/styles.css" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
            crossOrigin="anonymous"
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
