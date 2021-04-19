import React from "react";
import Head from "next/head";
import http from "../../lib/serverHttp";
import ChangePassword from "../../components/utils/ChangePassword";

const VerifyPassword = ({ currentPage, token, error }) => {
  const errObj = JSON.parse(error);
  function content() {
    switch (currentPage) {
      case "ChangePassword":
        return <ChangePassword token={token} error={errObj.error} body={errObj.body} />;
        break;
      case "ServerDown":
        return <h2 className="text-danger fs-2">Server Error</h2>;
      default:
        return <h1>Loading...</h1>;
    }
  }
  return (
    <>
      <Head>
        <title>Change Password</title>
      </Head>
      {content()}
    </>
  );
};

export async function getServerSideProps({ params, query }) {
  const changePasswordToken = params.id;

  try {
    const { data } = await http.get("/ValidateForgetPasswordToken?Token=" + changePasswordToken);
    console.log("result ", data);
    if (data.state.code === "Status-System-1013") {
      return {
        props: {
          currentPage: "ChangePassword",
          token: changePasswordToken,
          error: JSON.stringify(query),
        },
      };
    } else {
      return {
        redirect: {
          destination: "/not_found",
          fallback: "blocking",
        },
      };
    }
  } catch (err) {
    console.log(err.message);
    return {
      props: {
        currentPage: "ServerDown",
        error: JSON.stringify(query),
      },
    };
  }
}
export default VerifyPassword;
