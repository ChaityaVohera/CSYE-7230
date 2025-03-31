import React from 'react'
import img4 from '../assets/4.jpg';
import edit from '../assets/edit.png'
import telegram from '../assets/telegram.png'
import discord from '../assets/discord.png'
import messenger from '../assets/messenger.png'
import linkedin from '../assets/linkedin.png'
import tab from '../assets/tab.png'
import email from '../assets/email.png'
import heart1 from '../assets/heart (1).png'
import user from '../assets/user.png'
import music from '../assets/musical-note.png'
import cricket from '../assets/cricket.png'
import cup from '../assets/cup-of-drink.png'
import dumbell from '../assets/dumbbell.png'
import running from '../assets/running.png'
import ui from '../assets/ui.png'
function Screen() {
  return (
    <div>
        <div className="col-6">
                <div className="feature-phone">
                    <div className="container feature-nav">
                        <div className="row1 row2">
                                <h4>Profile</h4>
                                <div className="profile-noti">
                                    <img src={edit} alt="" />
                                </div>
                        </div>
                    </div>
                    <div className="profile-img">
                        <img src={img4} alt="" />
                    </div>
                    <div className="profile-name">
                        <h3>Beth, 24</h3>
                        <p>Boston, USA</p>
                    </div>
                    
                    <div className="profile-control">
                    <div className="profile-control-con"><img src={telegram} alt="" /></div>
                    <div className="profile-control-con"><img src={discord} alt="" /></div>
                    <div className="profile-control-con"><img src={messenger} alt="" /></div>
                    <div className="profile-control-con"><img src={linkedin} alt="" /></div>
                    </div>
                    <h6>Interests</h6>
                    <div className="profile-interest">
                        <div className="profile-interest-row1">
                            <div className="profile-interest-con"><img src={cricket} alt="" /><p>Cricket</p></div>
                            <div className="profile-interest-con"><img src={music} alt="" /><p>Music</p></div>
                            <div className="profile-interest-con"><img src={running} alt="" /><p>Sports</p></div>
                        </div>
                        <div className="profile-interest-row2">
                            <div className="profile-interest-con"><img src={cup} alt="" /><p>Coffee</p></div>
                            <div className="profile-interest-con"><img src={ui} alt="" /><p>UI/UX</p></div>
                            <div className="profile-interest-con"><img src={dumbell} alt="" /><p>Gym</p></div>
                        </div>
                    </div>
                    
                    <div className="feature-footer">
                        <img src={tab} alt="" />
                        <img src={email} alt="" />
                        <img src={heart1} alt="" />
                        <img src={user} alt="" />
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Screen