import jwtDecode from "jwt-decode";
import React from "react";
import Head from "next/head";
import CountDown, { zeroPad } from "react-countdown";
import http from "../lib/clientHttp";
import useLang from "../context/LangContext";

function LinkSent({ time }) {
  const { lang, local } = useLang();
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <>
          <span className="countDown">00:00:00</span>
          <form action="/ResendEmailVerification" method="POST" className="w-100">
            <button className="btn-resend btn-blue d-block w-100 " disabled={false}>
              {local.linkSentBtn[lang]}
            </button>
          </form>
        </>
      );
    } else {
      // Render a countdown
      return (
        <>
          <span className="countDown">{`${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`}</span>
          <button className="btn-resend btn-blue d-block w-100" disabled={true}>
            {local.linkSentBtn[lang]}
          </button>
        </>
      );
    }
  };

  return (
    <div className="linkSend">
      <Head>
        <title>Link Sent</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 d-lg-block d-none">
            <div className="background">
              <img src="/img/link_sent_back.svg" alt="background" />
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="boxLinkSent text-center">
              <img src="/img/link_sent.svg" alt="icon" />
              <h2 className="headTitle">{local.linkSentTitle[lang]}</h2>
              <p className="content">{local.linkSentContent[lang]}</p>
              <CountDown date={Date.now() + (time * 60 * 1000 - 1000)} renderer={renderer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res, query }) {
  if (!req.cookies.token) return { redirect: { destination: "/signup", fallback: "blocking" } };
  const user = jwtDecode(req.cookies.token);
  if (user.email_verified) return { redirect: { destination: "/login", fallback: "blocking" } };
  try {
    const { data } = await http.post(`/EmailVerificationCountDown/${user.sub}`);
    return { props: { time: data.time } };
  } catch (err) {
    return { props: { time: 50 } };
  }
}

export default LinkSent;
