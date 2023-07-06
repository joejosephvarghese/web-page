import React from 'react'
import './Body.css'

function Body() {
  return (
    <div className='mediaBlock' >
       <img className='bannerImage' src="https://gmedia.playstation.com/is/image/SIEPDC/F1-23-homepage-hero-desktop-en-01-06jun23?$1600px$" alt='BannerLogo'></img>
       <img className='banneerLogo' src="https://gmedia.playstation.com/is/image/SIEPDC/F1-23-logo-stacked-en-01-06jun23?$800px--t$" alt="" />
       <div className='banneerHeading'>
       <h2>Be the last to brake</h2>
       <p>Experience a new chapter in the “Braking Point” story,race at Las Vegas and Lusail, and more in F1® 23, out now.</p>
       <button className='bannerButton rounded-pill'>Buy now</button>
       </div>
    </div>
  )
}

export default Body
