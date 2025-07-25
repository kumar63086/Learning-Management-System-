import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='flex md:flex-row flex-col-reverse items-center  justify-between text-left w-full px-8 border-t'>
      
    <div className='flex items-center  gap-4 '>
      <img className='hidden md:block w-20 ' src={assets.logo} alt='logo'/>
      <div className='hidden md:block h-7 w-px bg-gray-500/60'></div>
      <p className='py-4 text-center text-gray-500 md:text-sm text-xs'>
      copyright © 2023 Skill-Hub. All rights reserved.
      </p>
    </div>
    <div className='flex gap-3 max-md:mt-4'>
     <a href='#' >
      <img src={assets.facebook_icon} alt='facebook icon' className='w-6 h-6'/>
     </a>
     <a href='#' >
      <img src={assets.instagram_icon} alt='instagram icon' className='w-6 h-6'/>
     </a>
     <a href='#' >  
      <img src={assets.twitter_icon} alt='twitter icon' className='w-6 h-6'/>
     </a>
    </div>
    </footer>
  )
}

export default Footer