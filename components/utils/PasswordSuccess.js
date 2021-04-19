import React from "react";
import Link from "next/link";
import useLang from "../../context/LangContext";

const PasswordSuccess = () => {
  const { lang, local } = useLang();
  return (
    <div className="bg-white rounded shadow flex flex-col py-6 px-12 items-center justify-center gap-4 w-11/12 md:w-2/3 max-w-lg">
      <div>
        <img src="/img/succefull.svg" alt="logo" />
      </div>
      <h1 className="text-3xl text-green-400">{local.passwordRestTitle[lang]}</h1>
      <p className="text-gray-600 text-center">{local.passwordRestContent[lang]}</p>
      <Link href="/login">
        <a className="w-full px-4 py-2 bg-green-500 text-green-100 rounded text-center hover:text-green-800">
          {local.passwordRestbtn[lang]}
        </a>
      </Link>
    </div>
  );
};

export default PasswordSuccess;
