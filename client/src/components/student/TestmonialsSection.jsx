import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const TestmonialsSection = () => {
  return (
    <div class="pb-14 px-8 md:px-0">
      <h2 className='text-2xl font-medium text-gray-800'>Testimonials</h2>
      <p class="md:text-base text-gray-500 mt-3">Hear from our learners as they share their journeys of transformation, success, and how our<br/>
      platform has made a difference in their lives.</p>
      <div className='grid grid-cols-auto gap-8 mt-14'>
        {dummyTestimonial.map((testmonial, index) => (
          <div key={index} className='text-sm text-left border  border-gray-500/30 pb-6 rounded-lg bg-white'>
            <div className='flex items-center gap-4 px-5 py-4 bg-gray-500/10 shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden'>
              <img src={testmonial.image} alt={testmonial.name} className='w-12 h-12 rounded-full ' />
              <div>
                <h1 className='text-lg font-medium text-gray-800'>{testmonial.name}</h1>
                <p className='text-gray-800/80'>{testmonial.role}</p>
              </div>
             
            </div>
            <div className='p-5 pb-7'>
                <div className='flex  gap-0.5'>
                 {[...Array(5)].map((_,i)=>(
                  <img className='h-5' key={i} src={i<Math.floor(testmonial.rating)?assets.star:assets.star_blank} alt='star'/>
                 ))} 
                </div>
                <p className='text-gray-500 mt-5'>{testmonial.feedback}</p>
              </div>
              <a href='#' className='text-blue-500 underline px-5'>Read more</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestmonialsSection