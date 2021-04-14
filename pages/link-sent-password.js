import React from "react";
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
      <div className="container">
        <div className="row">
          <div className="col-lg-6 d-lg-block d-none">
            <div className="background">
              <img src="/img/link_sent_art.svg" alt="background" />
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="boxLinkSent text-center">
              <img src="/img/link_sent.svg" alt="icon" />
              <h2 className="headTitle">Link Sent</h2>
              <p className="content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ad recusandae,
                similique rem eligendi minima impedit exercitationem quia aliquid beatae.
              </p>
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
  // const resetPassword_ID = req.cookies.reset
  try {
    const { data } = await http.post(`/EmailVerificationCountDown/${user.sub}`);
    return { props: { time: data.time } };
  } catch (err) {
    return { props: { someErr: true, time: 1 } };
  }
}

export default LinkSentPassword;
