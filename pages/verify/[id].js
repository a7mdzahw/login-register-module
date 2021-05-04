import React from "react";
import AccountVerified from "@Components/login/AccountVerified";
import LinkExpired from "@Components/login/LinkExpired";
import * as http from "lib/http";

const Verify = ({ currentPage }) => {
  function content() {
    switch (currentPage) {
      case "AccountVerified":
        return <AccountVerified />;
        break;
      case "LinkExpired":
        return <LinkExpired />;
        break;
      default:
        return <h1>Loading...</h1>;
    }
  }
  return content();
};

export default Verify;

export async function getServerSideProps({ req, res, query, params }) {
  res.clearCookie("token");
  let EmailToken = params.id;
  try {
    const { data } = await http.client.post("/VerifyUserEmail", { EmailToken });
    if (data.state.code === "Status-System-1013") {
      return { props: { currentPage: "AccountVerified" } };
    } else if (data.errors[0].code === "Error-UserProfile-1033") {
      return {
        redirect: {
          destination: "/login",
        },
      };
    } else if (data.errors[0].code === "Error-System-1035") {
      return {
        props: {
          currentPage: "LinkExpired",
        },
      };
    } else {
      return { redirect: { destination: "/signup" } };
    }
  } catch (err) {
    return { redirect: { destination: "/signup" } };
  }
}
