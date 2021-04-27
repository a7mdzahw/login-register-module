import React from "react";
import Head from "next/head";
import * as http from "lib/http";
import CountDown, { zeroPad } from "react-countdown";
import useLang from "../context/LangContext";

const LinkSentPassword = ({ someErr, time }) => {
  const { lang, local } = useLang();
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <>
          <span className="countDown">00:00:00</span>
          <form action="/ForgetPasswordRequest" method="POST">
            <button className="btn-resend btn-blue d-block w-100" disabled={false}>
              {local.linkSentBtn[lang]}
            </button>
          </form>
        </>
      );
    } else {
      // Render a countdown
      return (
        <>
          <span className="countDown">
            {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
          </span>
          <button className="btn-resend  btn-blue d-block w-100" disabled={true}>
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
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-6 d-lg-block d-none">
            <div className="background">
              <img src="/img/link_sent_art (1).svg" alt="background" />
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="boxLinkSent text-center">
              <img src="/img/link_sent.svg" alt="icon" />
              <h2 className="headTitle">{local.linkSentTitle[lang]}</h2>
              <p className="content">{local.linkSentContent[lang]}</p>
              <CountDown date={Date.now() + time * 60 * 1000 - 1000} renderer={renderer} />
            </div>
            {someErr && <div className="alert alert-danger">Something Error Occurred</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  const pass_id = req.cookies.resetPassword_ID;
  if (!pass_id) return { redirect: { destination: "/login", fallback: "blocking" } };
  try {
    const { data } = await http.client.post(`/EmailVerificationCountDown/${pass_id}`);
    return { props: { time: data.time } };
  } catch (err) {
    return { props: { someErr: true, time: 1 } };
  }
}

export default LinkSentPassword;
