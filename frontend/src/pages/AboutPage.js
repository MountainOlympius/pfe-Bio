import React from 'react'
import aproposimage from '../assets/aproposimage.png'

import '../styles/AboutPage.scss'

function AboutPage() {
  return (
    <div className='about-page'>
          <div className="title-container">
            <h1>à propos</h1>
          </div>
          <div className="section-one">
          <div className="left-container">
            <h2>some information about the app</h2>
          </div>
          <div className="right-container">
            <div className="img-container"></div>
            <img src={aproposimage} alt="" className="img" />
          </div>
          </div>
        </div>
  )
}

export default AboutPage