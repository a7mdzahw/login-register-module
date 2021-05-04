import jwtDecode from "jwt-decode";
import Head from "next/head";

export default function Home({ user }) {
  return (
    <div>
      <Head>
        <title>Dexef</title>
      </Head>

      <div className="container" style={{ minHeight: "80vh" }}>
        <h1>DEXEF Home Page</h1>
        <h2>{JSON.stringify(user, null, 2)}</h2>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  // checking user login state and redirect if not logged in
  const token = req.cookies.token;
  if (!token) {
    return { redirect: { destination: "/login", fallback: "blocking" } };
  } else {
    const user = jwtDecode(token);
    if (!user.email_verified)
      return {
        redirect: {
          destination: "/link-sent",
          fallback: "blocking",
        },
      };

    return {
      props: { user },
    };
  }
}
