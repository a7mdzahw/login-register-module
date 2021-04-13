import React from "react";

const Logout = () => {
  return <div>{null}</div>;
};

export async function getServerSideProps({ req, res }) {
  if (req.cookies.token) {
    res.clearCookie("token");
    res.clearCookie("id");
    res.clearCookie("email");
  }
  return {
    redirect: {
      destination: "/login",
      fallback: "blocking",
    },
  };
}

export default Logout;
