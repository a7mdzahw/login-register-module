import React from "react";
import Head from "next/head";
import { applySession } from "next-session";
import PasswordSuccess from "../components/utils/PasswordSuccess";

const PasswordReseted = () => {
  return (
    <div className="flex mt-12 items-center justify-center">
      <Head>
        <title>Success</title>
      </Head>
      <PasswordSuccess />
    </div>
  );
};

export async function getServerSideProps({ req, res, query }) {
  await applySession(req, res);
  console.log(req.session.mtid);
  req.session.mtid = 12354;
  // const oneReq;
  // console.log(req.cookies);
  return { props: { main: "ter" } };
}

export default PasswordReseted;
