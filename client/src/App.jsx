import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/student/Home'
import Courseslist from './pages/student/Courseslist'
import CourseDetails from './pages/student/CourseDetails'
import MyEnrollment from './pages/student/MyEnrollment'
import Player from './pages/student/Player'
import Loading from './components/student/Loading'
import Educater from './pages/educator/Educater'
import Dashboard from './pages/educator/Dashboard'
import AddCoures from './pages/educator/AddCoures'
import MyCourses from './pages/educator/MyCourses'
import StudentEnrolled from './pages/educator/StudentEnrolled'
import Navbar from './components/student/Navbar'
import "quill/dist/quill.snow.css";
const App = () => {
  const isEducatore=useMatch("/educator*")
  return (
    <div className='bg-white min-h-screen text-deafult'>
     
      {!isEducatore&& <Navbar/>}
   <Routes>
    
      <Route path="/" element={ <Home/>} />
      <Route path="/coures-list" element={ <Courseslist/>} />
      <Route path="/coures-list/:input" element={ <Courseslist/>} />
      <Route path="/course/:id" element={ <CourseDetails/>} />
      <Route path="/my-enrollment" element={ <MyEnrollment/>} />
      <Route path="/player/:courseId" element={ <Player/>} />
      <Route path="/loading/:path" element={ <Loading/>} />
     
      <Route path="/educator" element={ <Educater/> }>
      <Route path="/educator" element={ <Dashboard/>} />
      <Route path="add-course" element={ <AddCoures/>} />
      <Route path="my-courses" element={ <MyCourses/>} />
      <Route path="student-enrolled" element={ <StudentEnrolled/>} />



      </Route>
      
   
   </Routes>
  

    </div>
  )
}

export default App