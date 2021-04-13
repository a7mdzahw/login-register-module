import jwtDecode from "jwt-decode";
import React from "react";
import CountDown, { zeroPad } from "react-countdown";
import AccountVerified from "../components/login/AccountVerified";
import LinkExpired from "../components/login/LinkExpired";
import http from "../lib/clientHttp";

function LinkSent({ time, currentPage }) {
  console.log(time);
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <>
          <span className="countDown">00:00:00</span>
          <form action="/ResendEmailVerification" method="POST">
            <button className="btn Rectangle-608 log-in btn-resend btn-block btn-blue" disabled={false}>
              Resend
            </button>
          </form>
        </>
      );
    } else {
      // Render a countdown
      return (
        <>
          <span className="countDown">{`${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`}</span>
          <button className="btn Rectangle-608 log-in btn-resend btn-block btn-blue" disabled={true}>
            Resend
          </button>
        </>
      );
    }
  };

  return (
    <div className="linkSend">
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
              <h2 className="headTitle">Link Sent</h2>
              <p className="content">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa sed iste quia accusamus laborum eos ullam
                est beatae consequuntur aut.
              </p>
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
