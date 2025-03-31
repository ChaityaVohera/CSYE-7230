import React from 'react'
import community from '../assets/community.jpg'
function About() {
  return (
    <div className="about">
        <div className='about-con'>
        <h1>XYZO is a real time virtual</h1>
        <h1>world for community & friends</h1>
    </div>
    <div className="community">
        <img src={community} alt="" />
    </div>
    </div>
  )
}

export default About