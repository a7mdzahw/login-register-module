import React from "react";
import Link from "next/link";

const PasswordSuccess = () => {
  return (
    <div className="bg-white rounded shadow flex flex-col py-6 px-12 items-center justify-center gap-4 w-11/12 md:w-2/3 max-w-lg">
      <div>
        <img src="/img/succefull.svg" alt="logo" />
      </div>
      <h1 className="text-3xl text-green-400">Password Changed</h1>
      <p className="text-gray-600 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, iure! Laborum
        ratione atque eum ea quo repellendus totam laudantium esse, officia omnis vero
        necessitatibus aspernatur similique eos minus id. Expedita?m
      </p>
      <Link href="/login">
        <a className="w-full px-4 py-2 bg-green-500 text-green-100 rounded text-center hover:text-green-800">
          Sign In
        </a>
      </Link>
    </div>
  );
};

export default PasswordSuccess;
