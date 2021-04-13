import React from "react";

const LinkSentPassword = ({ someErr, time }) => {
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
              <Countdown date={Date.now() + time} renderer={this.renderer} />
            </div>
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
    return { props: { someErr: true } };
  }
}

export default LinkSentPassword;
