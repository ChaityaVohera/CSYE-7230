import React from 'react'
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <div>
        <nav class="navbar navbar-light ">
            <a class="navbar-brand" href="#"><span class="logo-bold">Connect</span></a>
            <div className="navbar-menu">
            {/* <a className='navbar-brand-link' href="C:\Users\navee\OneDrive\Desktop\web-project\src\launch.html">LAUNCH APP</a> */}
            <Link className="navbar-brand-link" to="/launch">LAUNCH APP</Link>
            </div>
        </nav>
    </div>
  )
}

export default Navbar