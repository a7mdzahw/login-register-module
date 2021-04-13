import React from "react";

const LinkExpired = () => {
  return (
    <div className="linkexpired">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 d-lg-block d-none">
            <div className="background">
              <img src="/img/link_expired_art.svg" alt="background" />
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="boxLinkSent text-center">
              <img src="/img/link_expired.svg" alt="icon" />
              <h2 className="headTitle">Link Expired</h2>
              <p className="content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate ut, odit temporibus natus inventore
                officiis laborum! Porro enim recusandae doloremque delectus aperiam ad sequi suscipit maiores et dolore!
                Nostrum, optio.
              </p>
              <form action="/ResendEmailVerification" method="POST">
                <button className="btn btn-primary d-block w-100 btn-blue btn-resend btn-block">Resend</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkExpired;
