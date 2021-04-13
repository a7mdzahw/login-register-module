import React from "react";

const AccountVerified = () => {
  return (
    <div className="accountVerified">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 d-lg-block d-none">
            <div className="background">
              <img src="/img/email_valid_art.svg" alt="background" />
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="boxLinkSent text-center">
              <img src="/img/email_valid.svg" alt="icon" />
              <h2 className="headTitle">Congratulations</h2>
              <p className="content">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt voluptatum distinctio nemo. Non
                expedita nam rerum tenetur, neque totam facilis.
              </p>
              <a className="btn btn-primary btn-blue btn-resend btn-block" href="/login">
                Log In
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountVerified;
