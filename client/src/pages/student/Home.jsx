import React from 'react'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CourseSection from '../../components/student/CourseSection'
import TestmonialsSection from '../../components/student/TestmonialsSection'
import CallToAction from '../../components/student/CallToAction'
import Footer from '../../components/student/Footer'

const Home = () => {
  return (
    <div className='flex flex-col items-center text-center space-y-7'>
      <Hero/>
      <Companies/>
      <CourseSection/>
      <TestmonialsSection/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default Home