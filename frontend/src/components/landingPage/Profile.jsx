import React from "react";
import Screen from "./Screen";
import Interests from "./Interests";
function Profile() {
  return (
    <div className="row container">
      <div className=" col-lg-6 col-mg-6">
        <div className="feature-con profile-con">
          <Screen />
          <div className="screen-animate">
            <Screen />
          </div>
          <div className="screen-animate1">
            <Screen />
          </div>
          {/* <div className="col-6 intro-left">
                <h1>Set up your</h1>
                <h1>profile</h1>
                <h1>Right now at</h1>
                <h2 className='intro-left-brand'>XYZO</h2>
            </div> */}
        </div>
      </div>

      <div className="about-con col-lg-6 col-mg-6">
        <h1>Customize your profile with</h1>
        <h1>avatars, pics and interests</h1>
        <Interests />
      </div>
    </div>
  );
}

export default Profile;
