import React from "react";
import Screen from "./Screen";
import img7 from "../assets/7.jpg";
import location from "../assets/location-pin.png";
import bell from "../assets/bell.png";
import pause from "../assets/pause.png";
import cross from "../assets/cross.png";
import wave from "../assets/wave.png";
import heart from "../assets/heart.png";
import tab from "../assets/tab.png";
import email from "../assets/email.png";
import heart1 from "../assets/heart (1).png";
import user from "../assets/user.png";
import About from "./About";
function Feature() {
  return (
    <div className="container feature-con">
      <div className="row">
        <div className="col-md-6">
          <div className="feature-phone">
            <div className="container feature-nav">
              <div className=" row1">
                <h4>
                  Hi, <b>Beth</b>
                </h4>
                <div className="feature-noti">
                  <img src={location} alt="" />
                  <img src={bell} alt="" />
                </div>
              </div>
            </div>
            <div className="feature-img">
              <img src={img7} alt="" />
            </div>
            <div className="feature-name">
              <h3>Sheldon, 28</h3>
              <p>Bampton, Canada</p>
            </div>
            <div className="feature-pause">
              <img src={pause} alt="" />
            </div>
            <div className="feature-control">
              <img src={cross} alt="" />
              <img src={wave} alt="" />
              <img src={heart} alt="" />
            </div>
            <div className="feature-footer">
              <img src={tab} alt="" />
              <img src={email} alt="" />
              <img src={heart1} alt="" />
              <img src={user} alt="" />
            </div>
          </div>
        </div>
        {/* <div className="col-6 intro-left">
                <h1>Chill in</h1>
                <h1>your home</h1>
                <h1>& meet friends online at</h1>
                <h2 className='intro-left-brand'>XYZO</h2>
            </div> */}
        <div className="feature col-md-6"><About /></div>
      </div>
      <div className="screen-animate">
        <Screen />
      </div>
      <div className="screen-animate1">
        <Screen />
      </div>
    </div>
  );
}

export default Feature;
