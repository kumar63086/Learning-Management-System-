import React, { useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import {Line }from "rc-progress"
import Footer from '../../components/student/Footer'
const MyEnrollment = () => {
  const { enrolledCourses, calculaterCourseDuration, navagate } = useContext(AppContext)

  const [progressArray, setProgressArray] = useState([
    { lectureComplete: 2, totalLectures: 4 },
    { lectureComplete: 1, totalLectures: 5 },
    { lectureComplete: 3, totalLectures: 6 },
    { lectureComplete: 4, totalLectures: 4 },
    { lectureComplete: 0, totalLectures: 3 },
    { lectureComplete: 5, totalLectures: 7 },
    { lectureComplete: 6, totalLectures: 8 },
    { lectureComplete: 2, totalLectures: 6 },
    { lectureComplete: 4, totalLectures: 10 },
    { lectureComplete: 3, totalLectures: 5 },
    { lectureComplete: 7, totalLectures: 7 },
    { lectureComplete: 1, totalLectures: 4 },
    { lectureComplete: 0, totalLectures: 2 },
    { lectureComplete: 5, totalLectures: 5 },


  ])
  return (
    <>
      <div className='md:px-36 px-8 pt-10'>
        <h1 className='text-2xl font-semibold'>MyEnrollment</h1>
        <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
            <tr>
              <th className='px-3 py-3 font-semibold truncate'>Course</th>
              <th className='px-3 py-3 font-semibold truncate'>Duration</th>
              <th className='px-3 py-3 font-semibold truncate'>Completed</th>
              <th className='px-3 py-3 font-semibold truncate'>Status</th>
            </tr>
          </thead>
          <tbody className='text-gray-700 '>
            {enrolledCourses.map((course, index) => (
              <tr key={index} className='border-b border-gray-500/20'>
                <td className=' md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                  <img src={course.courseThumbnail} alt='course thumbnail' className='w-14 sm:w-24 md:w-28' />
                  <div className='flex-1'>
                    <p className='md-1 max-sm:text-sm '>{course.courseTitle}</p>
                    <Line strokeWidth={2} percent={progressArray[index]?(progressArray[index].lectureComplete*100)/progressArray[index].totalLectures:0} className='bg-gray-300 rounded-full'/>
                  </div>
                </td>
                <td className='px-4 py-3 max-sm:hidden'>
                  {calculaterCourseDuration(course)}
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  {progressArray[index] && (
                    <>
                      {progressArray[index].lectureComplete}/{progressArray[index].totalLectures} <span>lectures</span>
                    </>
                  )}
                </td>

                <td className='px-4 py-3 max-sm:text-right'>
                  <button className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white' onClick={() => navagate('/player/' + course._id)}>
                    {
                      progressArray[index] && progressArray[index].lectureComplete / progressArray[index].totalLectures === 1 ? "Completed" : "on Going"
                    }
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <Footer/>
    </>
  )
}

export default MyEnrollment