import React from "react";
import Link from "next/link";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand bg">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand fs-3 fw-bold">
            <img src="/img/dexef_logo.svg" alt="logo" height="20px" />
          </a>
        </Link>
        <ul className="navbar-nav">
          {!user && (
            <>
              <li className="nav-item">
                <Link href="/login">
                  <a className="nav-link  Rectangle-609 log-in-nav me-1"> Log In</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/signup">
                  <a className="nav-link Rectangle-608 log-in">sign up</a>
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
