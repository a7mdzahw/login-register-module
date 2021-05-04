import React from "react";
import Head from "next/head";

import PasswordSuccess from "@Components/utils/PasswordSuccess";

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

export default PasswordReseted;
