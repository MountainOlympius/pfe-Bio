import React from 'react'
import aproposimage from '../assets/aproposimage.png'

import '../styles/AboutPage.scss'

function AboutPage() {
  return (
    <div className='about-page'>
          <div className="title-container">
            <h1>About dddddddddddddddddddddddd</h1>
          </div>
          <div className="left-container">
            <h3>dfsdgsdg</h3>
          </div>
          <div className="right-container">
            <h2>sdfsdgs</h2>
            <div className="img-container"></div>
            <img src={aproposimage} alt="" className="img" />
          </div>
        </div>
  )
}

export default AboutPage