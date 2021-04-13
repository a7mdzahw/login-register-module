import React from "react";

const JSBlank = () => {
  return (
    <div className="JavaScript-Blank">
      <img src="/link_sent_art.svg" className="link_sent_art" />
      <div className="Rectangle-685">
        <img src="/delet_trai_acc.svg" className="delet_trai_acc" />
        <h2 className="Content_signup oops">Oops !</h2>
        <p className="Content_signup">
          it seem that <span className="text-style-1">javaScript</span> is disabled on your browser
        </p>
        <p className="Content_signup">
          enable JavaScript on <span className="text-style-2 ">Google Chrome, Firefox, Microsoft Edge.</span>{" "}
        </p>
      </div>
      <style jsx>
        {`
          .JavaScript-Blank {
            display: flex;
            align-items: center;
            width: 1920px;
            height: 75vh;
            padding: 235px 333px 235px 335px;
          }
          .Rectangle-685 {
            width: 611px;
            height: 375px;
            align-self: end;
            padding: 60px 80.5px;
            border-radius: 4px;
            box-shadow: 0 30px 30px 0 rgba(102, 137, 163, 0.08);
            background-color: var(--background);
          }
          .link_sent_art {
            width: 610px;
            height: 610px;
            margin: 0 30px 0 0;
            object-fit: contain;
            opacity: 1;
          }
          .delet_trai_acc {
            width: 75px;
            height: 75px;
            margin: 0 188px 15px 187px;
            object-fit: contain;
          }
          .Content_signup {
            width: 450px;
            height: 30px;
            margin: 15px 0;
            font-family: Cairo;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: center;
            color: var(--dark);
          }
          .oops {
            color: var(--error);
          }
          .Content_signup .text-style-1 {
            font-weight: bold;
          }
          .Content_signup .text-style-2 {
            color: var(--dimmed);
          }
        `}
      </style>
    </div>
  );
};

export default JSBlank;
<style jsx></style>;
