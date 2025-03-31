import React from 'react'
import video from '../assets/video-camera.png'
import education from '../assets/education.png'
import coins from '../assets/coins.png'
import bitcoin from '../assets/bitcoin.png'
import vr from '../assets/vr-goggles.png'
import man from '../assets/man.png'
import ruler from '../assets/ruler.png'
import paw from '../assets/pawprint.png'
import console from '../assets/console.png'
import burger from '../assets/burger.png'
import laugh from '../assets/laugh.png'
import emoji from '../assets/emoji.png'
import search from '../assets/search.png'
import leo from '../assets/leo-sign.png'
import love from '../assets/love.png'
import party from '../assets/party.png'
function Interests() {
  return (
    <div className="interest">
      <div className='interest-row'>
            <div className="interest-item12">
              <img src={search} alt="" />
              <h4>Relationship</h4>
            </div>
            <img className='interest-img' src={party} alt="" />
            <img className='interest-img' src={love} alt="" />
        </div>
        <div className='interest-row'>
            <div className="interest-item1">
              <img src={video} alt="" />
              <h4>Movies</h4>
            </div>
            <div className="interest-item2">
            <img src={education} alt="" />
              <h4>In College</h4>
            </div>
            <div className="interest-item3">
            <img src={bitcoin} alt="" />
              <h4>crypto</h4>
            </div>
        </div>
        <div className='interest-row'>
            <div className="interest-item4">
            <img src={vr} alt="" />
              <h4>Metaverse</h4>
            </div>
            <div className="interest-item5">
            <img src={coins} alt="" />
              <h4>ETH maxi</h4>
            </div>
            <img className='interest-img' src={laugh} alt="" />
            <div className="interest-item6">
            <img src={man} alt="" />
              <h4>Single</h4>
            </div>
            <div className="interest-item7">
            <img src={console} alt="" />
              <h4>Gaming</h4>
            </div>
        </div>
        <div className='interest-row'>
          <img className='interest-img' src={emoji} alt="" />
            <div className="interest-item8">
            <img src={ruler} alt="" />
              <h4>5.4 ft</h4>
            </div>
            <div className="interest-item9">
            <img src={paw} alt="" />
              <h4>Dogs</h4>
            </div>
            <div className="interest-item10">
            <img src={burger} alt="" />
              <h4>Foodie</h4>
            </div>
        </div>
        <div className='interest-row'>
            <div className="interest-item11">
              <img src={leo} alt="" />
              <h4>Leo</h4>
            </div>
        </div>
    </div>
  )
}

export default Interests