import { createContext,  useEffect, useState } from 'react'
import { dummyCourses } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import humanizeDuration from 'humanize-duration'
const AppContext = createContext()

export const AppContextProvider = (props) => {
    const [allCoures, setAllCoures] = useState([])
    const [isEducator, setIsEducator] = useState(true)
    const [enrolledCourses, setEnrolledCourses] = useState([])
    const navagate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY
    const fetchAllCoures = async () => {
       setAllCoures(dummyCourses)

    }
    const fetchUserEnrolledCourses = async () => {
        setEnrolledCourses(dummyCourses)
    }
    //calculate rating
    const caluculate=(course)=>{
        if(course.courseRatings.length===0){
            return 0
        
        } 
        let totalRatings=0
        course.courseRatings.forEach(rating=>{
            totalRatings+=rating.rating
        })
        return totalRatings/course.courseRatings.length
    }
    useEffect(() => {
        fetchAllCoures()
        fetchUserEnrolledCourses()
    }, [])
//calculate chapter time
    const calculaterChaptersTime=(chapter)=>{
           let time=0
           chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration)
           return humanizeDuration(time*60*1000,{units: ['h','m']})
    }
    //calculate course duration
    const calculaterCourseDuration=(course)=>{
        let time=0
        course.courseContent.map((chapter)=>chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration))
        return humanizeDuration(time*60*1000,{units: ['h','m']})
    }
    //calculate no of lectures in course
    const calculateNoOfLectures=(course)=>{
        let totalLectures=0
        course.courseContent.forEach(chapter=>{
            if(Array.isArray(chapter.chapterContent)){
                totalLectures+=chapter.chapterContent.length
            }
        })
        return totalLectures;
    }

    
    const value = {
        currency,
        allCoures,
        navagate,
        caluculate,
        isEducator,
        setIsEducator,
         calculaterChaptersTime,
        calculaterCourseDuration,
        calculateNoOfLectures,
        enrolledCourses,
        fetchUserEnrolledCourses

     }
     
    return (

        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext                       