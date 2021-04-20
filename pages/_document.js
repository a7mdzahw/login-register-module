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
          <link rel="shortcut icon" href="/dexef.jpg" type="image/x-icon" />
          {/* <link rel="stylesheet" href="/ssr-main.css" /> */}
          <link rel="stylesheet" href="/styles.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
