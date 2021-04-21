import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Navbar as BSNav, Nav, NavDropdown } from "react-bootstrap";

import useLang from "../../context/LangContext";

const Navbar = ({ user }) => {
  const router = useRouter();

  const { lang, setLangCookie, local } = useLang();
  const [currentLang, setCurrentLang] = useState(lang);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    console.log(navbar.clientHeight);
    setCurrentLang(lang);
  }, [lang]);

  return (
    <BSNav className="fixed-top" id="navbar" expand="lg">
      <Link href="/">
        <a className="navbar-brand">
          <img src="/img/dexef_logo.svg" alt="logo" className="dexef" />
        </a>
      </Link>

      <BSNav.Toggle aria-controls="basic-navbar-nav" />
      <BSNav.Collapse id="basic-navbar-nav">
        <Nav className="d-flex align-items-center">
          <NavDropdown
            className="lang"
            title={lang === "en" ? "English" : lang === "ar" ? "عربي" : "French"}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item onClick={() => setLangCookie("ar")}>عربي</NavDropdown.Item>
            <NavDropdown.Item onClick={() => setLangCookie("en")}>English</NavDropdown.Item>
            <NavDropdown.Item onClick={() => setLangCookie("fr")}>France</NavDropdown.Item>
          </NavDropdown>

          <noscript>
            <li className="nav-item mx-4">
              <form action="/changeLang" method="POST" className="d-flex gap-2 align-items-center outline-none">
                <input
                  type="text"
                  name="redirect"
                  value={router.pathname}
                  className="visually-hidden"
                  onChange={() => null}
                />
                <select
                  name="language"
                  id="language"
                  value={lang}
                  onChange={({ target }) => setLangCookie(target.value)}
                  className="nav-link"
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
          </noscript>
          {!user && (
            <>
              <li className="nav-item">
                <Link href="/login">
                  <a className="btn-login"> {local.navLogin[lang]}</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/signup">
                  <a className="btn-signUp">{local.navSignUp[lang]}</a>
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
        </Nav>
      </BSNav.Collapse>
    </BSNav>
  );
};

export default Navbar;
