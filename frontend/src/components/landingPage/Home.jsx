import React from 'react'
import Navbar from './Navbar';
import Intro from './Intro';
import Feature from './Feature';
import Profile from './Profile';
import Aboutpitch from './Aboutpitch';
function Home() {
  return (
    <div>
        <Navbar />
        <Intro />
        <Feature />
        <Aboutpitch />
        <Profile />
    </div>

  )
}

export default Home