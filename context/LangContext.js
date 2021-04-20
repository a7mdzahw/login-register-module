import React, { createContext, useContext, useEffect } from "react";
import local from "../public/assets/Localization.json";
import localErrs from "../public/assets/errors-messages.json";
import { useCookie } from "react-use";

const LangContext = createContext();

const handleHTMLDir = (lang) => {
  const html = document.querySelector("html");
  if (lang === "en" || lang === "fr") {
    html.removeAttribute("dir");
  } else {
    html.setAttribute("dir", "rtl");
  }
};

export const LangContextProvider = ({ children, lang: serverLang }) => {
  const [lang, setLangCookie] = useCookie("lang");
  useEffect(() => {
    console.log(lang);
    handleHTMLDir(lang);
  }, [lang]);
  return (
    <LangContext.Provider value={{ lang: lang || serverLang || "en", setLangCookie, local, localErrs }}>
      {children}
    </LangContext.Provider>
  );
};

export default function useLang() {
  return useContext(LangContext);
}
