import React from "react";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.jpg";
import img7 from "../assets/7.jpg";

function Intro() {
  return (
    <div>
      <div class="container overflow-hidden">
        <div className="row overflow-hidden">
          <div class="col-5 intro-left">
            <h1>MEET AND</h1>
            <h1>CONNECT WITH</h1>
            <h1>ALUMNI</h1>
            <div className="">
              <div className="">
                <h2 className="intro-left-brand">CONNECT</h2>
              </div>
              <div className="triangle"></div>
            </div>
          </div>
          <div class="col-7 intro-right overflow-hidden">
            <img className="intro-img1" src={img1} alt="" />
            <img className="intro-img2" src={img2} alt="" />
            <img className="intro-img3" src={img3} alt="" />
            <img className="intro-img4" src={img4} alt="" />
            <img className="intro-img5" src={img5} alt="" />
            <img className="intro-img6" src={img6} alt="" />
            <img className="intro-img7" src={img7} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
