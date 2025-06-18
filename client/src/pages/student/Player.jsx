import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import AppContext from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube'
import Footer from '../../components/student/Footer'
import Rataing from '../../components/student/Rataing'
const Player = () => {
  const { calculaterChaptersTime, enrolledCourses } = useContext(AppContext)
  const [opensection, setOpensection] = useState({})
  const { courseId } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [playerData, setPlayerData] = useState(null)

  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        setCourseData(course)
      }
    })
  }

  useEffect(() => {
    getCourseData()
  }, [enrolledCourses])
  const togglesection = (index) => {
    setOpensection(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }
  return (
    <>

      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
        {/* left column */}
        <div className='text-gray-800'>
          <h2 className='text-xl font-semibold'>Coures Structure</h2>
          <div className="pt-5">
            {courseData && courseData.courseContent.map((chapter, index) => (
              <div key={index} className="border border-gray-300 bg-white mb-2 rounded">
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                  onClick={() => togglesection(index)}
                >
                  <div className="flex items-center gap-2">
                    <img src={assets.down_arrow_icon} alt="arrow icon" className={`transform transition-transform ${opensection[index] ? 'rotate-180' : ''}`} />
                    <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                  </div>
                  <p className="text-sm md:text-default">
                    {chapter.chapterContent.length} lectures {calculaterChaptersTime(chapter)}
                  </p>
                </div>

                <div className={`overflow-hidden transition-all duration-300 ${opensection[index] ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i} className="flex items-start gap-2 py-1">
                        <img src={false ? assets.blue_tick_icon : assets.play_icon} alt="lecture-thumbnail" className="w-4 h-4 mt-1" />
                        <div className="flex items-center justify-between w-full text-gray-500 text-sm md:text-default">
                          <p>{lecture.lectureTitle}</p>
                          <div className="flex gap-2">
                            {lecture.lectureUrl && <p
                              onClick={() => setPlayerData({
                                ...lecture, chapter: index + 1, lecture: i + 1
                              })}
                              className="text-blue-600 cursor-pointer">watch</p>}
                            <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ["h", "m"], round: true })}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className='flex items-center gap-2 py-3 mt-10'>
            <h1 className='text-xl font-bold'>Rate this Course:</h1>
            <Rataing initialRating={0} />
          </div>

        </div>
        {/* right column */}
        <div className=" md:mt-10 max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]">

          {
            playerData ? (
              <div>
                <YouTube
                  videoId={playerData.lectureUrl.split('/').pop()}
                  iframeClassName='w-full aspect-video'
                />
                <div className='flex justify-between items-center mt-1'>
                  <p> {playerData.chapter}
                    {playerData.lecture}
                    {playerData.lectureTitle}
                  </p>
                  <button className='text-blue-600'>{false ? 'Completed' : 'Mark as Completed'}</button>
                </div>
              </div>
            ) : <img src={courseData ? courseData.courseThumbnail : ""} alt="course-thumbnail" className='w-full' />
          }

        </div>
      </div>

      <Footer />
    </>
  )
}

export default Player