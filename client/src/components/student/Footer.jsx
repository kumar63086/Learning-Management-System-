import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer class="bg-gray-900 md:px-36 text-left w-full mt-10">

      <div class="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
        <div class="flex flex-col md:items-start items-center w-full">
          <img src={assets.logo_dark} alt="logo" className='text-white/80' />
          <p class="mt-6 text-center md:text-left text-sm text-white/80">

            © 2025 LMS. All rights reserved.
          </p>
        </div>
        <div class="flex flex-col md:items-start items-center w-full">
          <h2 class="font-semibold text-white mb-5">company</h2>
          <ul class="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
            <li><a href='#' >Home</a></li>
            <li><a href='#' >About us</a></li>
            <li><a href='#' >Contact us</a></li>
            <li><a href='#' >Privacy policy</a></li>
          </ul>
        </div>
        <div class="hidden md:flex flex-col items-start w-full">
          <h2 class="font-semibold text-white mb-5">Subscribe to our newsletter</h2>
          <p className='text-sm text-white/80'>The latest news, articles, and resources, sent to your inbox weekly.</p>
          <div className='flex items-center gap-2 pt-4"'>
            <input class="border text-white/80 border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm" type='email' placeholder='Enter you are Email' />
            <button className='bg-blue-600 text-white w-24 h-9 rounded'>Subscribe</button>
          </div>
        </div>
      </div>
      <p class="py-4 text-center text-xs md:text-sm text-white/60">Copyright 2025 © Kumar. All Right Reserved.</p>
    </footer>
  )
}

export default Footer