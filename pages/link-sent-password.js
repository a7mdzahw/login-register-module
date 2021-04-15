import React from "react";
import Head from "next/head";
import CountDown, { zeroPad } from "react-countdown";

const LinkSentPassword = ({ someErr, time }) => {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <>
          <span className="countDown">00:00:00</span>
          <form action="/ForgetPasswordRequest" method="POST">
            <button
              className="btn Rectangle-608 log-in btn-resend btn-block btn-blue"
              disabled={false}
            >
              Resend
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
          <button
            className="btn Rectangle-608 log-in btn-resend btn-block btn-blue"
            disabled={true}
          >
            Resend
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
            <div className="boxLinkSent text-center flex flex-col gap-1 items-center justify-center">
              <img src="/img/link_sent.svg" alt="icon" />
              <h2 className="headTitle">Link Sent</h2>
              <p className="content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ad
                recusandae, similique rem eligendi minima impedit exercitationem quia
                aliquid beatae.
              </p>
              <CountDown
                date={Date.now() + time * 60 * 1000 - 1000}
                renderer={renderer}
              />
            </div>
            {someErr && (
              <div className="alert alert-danger">Something Error Occurred</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  const pass_id = req.cookies.resetPassword_ID;
  try {
    const { data } = await http.post(`/EmailVerificationCountDown/${pass_id}`);
    return { props: { time: data.time } };
  } catch (err) {
    return { props: { someErr: true, time: 1 } };
  }
}

export default LinkSentPassword;
