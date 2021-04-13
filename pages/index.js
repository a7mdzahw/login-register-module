import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Dexef</title>
      </Head>

      <div className="container">
        <h1>DEXEF Home Page</h1>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  // checking user login state and redirect if not logged in
  if (!req.cookies.email) {
    res.clearCookie("token");
    return { redirect: { destination: "/login", fallback: "blocking" } };
  } else {
    return {
      props: { user: true },
    };
  }
}
