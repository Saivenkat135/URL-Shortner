// import React from 'react'
// import '../style/Header.css'
// export default function Header() {
//   return (
//     <div className='head-main'>
//         <p className='head-p'>Header</p>
//         <div></div>
//     </div>
//   )
// }

import React from 'react';
import '../style/Header.css';

export default function Header() {

  function handleContact(){
    window.location.href = '/contact';
  }
  function handleAbout(){
    window.location.href = '/about';
  }
  function handleServices(){
    window.location.href = '/services';
  }
  function handleHome(){
    window.location.href = '/';
  }

  function handleStart(){
    window.location.href='/hero';
  }
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <img src="../public/logo.png" alt="YourLogo" className="header-logo" />
        </div>
        
        <nav className="header-nav">
          <ul className="nav-list">
            <li><a  onClick={handleHome} className="nav-link">Home</a></li>
            <li><a onClick={handleAbout} className="nav-link">About</a></li>
            <li><a onClick={handleServices} className="nav-link">Services</a></li>
            <li><a onClick={handleContact} className="nav-link">Contact</a></li>
          </ul>
        </nav>
        
        <div className="header-actions">
          {/* <button className="btn btn-outline">Login</button> */}
          <button onClick={handleStart} className="btn btn-primary">Get Started</button>
        </div>
        
        <div className="mobile-menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
}