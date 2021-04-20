import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import useLang from "../../context/LangContext";

const Navbar = ({ user }) => {
  const router = useRouter();
  const { lang, setLangCookie, local } = useLang();
  const [currentLang, setCurrentLang] = useState(lang);

  useEffect(() => {
    setCurrentLang(lang);
  }, [lang]);

  return (
    <nav className="navbar navbar-expand bg shadow-sm">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand fs-3 fw-bold">
            <img src="/img/dexef_logo.svg" alt="logo" height="20px" />
          </a>
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item mx-4">
            <form action="/changeLang" method="POST" className="flex space-x-2 items-center">
              <input type="text" name="redirect" value={router.pathname} className="hidden" onChange={() => null} />
              <select
                name="language"
                id="language"
                value={lang}
                onChange={({ target }) => setLangCookie(target.value)}
                className="focus:outline-none px-3 text-gray-600 nav-link"
              >
                <option value="en">English</option>
                <option value="ar">عربي</option>
                <option value="fr">French</option>
              </select>
              <noscript>
                <button type="submit" className="rounded bg-indigo-400 px-3 py-2">
                  Change
                </button>
              </noscript>
            </form>
          </li>
          {!user && (
            <>
              <li className="nav-item">
                <Link href="/login">
                  <a className="nav-link  Rectangle-609 log-in-nav px-4 me-1 btn-login"> {local.navLogin[lang]}</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/signup">
                  <a className="nav-link Rectangle-608 log-in px-4 bg-blue-500">{local.navSignUp[lang]}</a>
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li className="nav-item">
                <Link href="/">
                  <a className="nav-link">Home</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/logout">
                  <a className="nav-link">logout</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
