import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Navbar as BSNav, Nav, NavDropdown } from "react-bootstrap";

import useLang from "../../context/LangContext";

const Navbar = ({ user, authState }) => {
  const router = useRouter();

  const { lang, setLangCookie, local } = useLang();
  const [currentLang, setCurrentLang] = useState(lang);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
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
          {/* <NavDropdown
            className="lang"
            title={lang === "en" ? "English" : lang === "ar" ? "عربي" : "French"}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item onClick={() => setLangCookie("ar")}>عربي</NavDropdown.Item>
            <NavDropdown.Item onClick={() => setLangCookie("en")}>English</NavDropdown.Item>
            <NavDropdown.Item onClick={() => setLangCookie("fr")}>France</NavDropdown.Item>
          </NavDropdown> */}

          <li className="nav-item mb-2 mb-lg-0">
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
                id="change_lang"
                value={lang}
                onChange={({ target }) => setLangCookie(target.value)}
                className="dropdown nav-item lang py-1 px-2 text-center"
              >
                <option value="ar" className="dropdown-toggle  py-2 nav-link">
                  عربي
                </option>
                <option value="en" className="dropdown-toggle nav-link">
                  English
                </option>
                <option value="fr" className="dropdown-toggle nav-link">
                  France
                </option>
              </select>
              <noscript>
                <button type="submit" className="rounded">
                  Change
                </button>
              </noscript>
            </form>
          </li>

          {!user && (
            <>
              {authState === "signup" && (
                <li className="nav-item">
                  <Link href="/login">
                    <a className="btn-login"> {local.navLogin[lang]}</a>
                  </Link>
                </li>
              )}
              {authState === "login" && (
                <li className="nav-item">
                  <Link href="/signup">
                    <a className="btn-signUp">{local.navSignUp[lang]}</a>
                  </Link>
                </li>
              )}
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
                  <a className="btn-signUp">logout</a>
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
