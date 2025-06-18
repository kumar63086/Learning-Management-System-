import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppContext from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar'
import CourseCard from '../../components/student/CourseCard'
import { assets } from '../../assets/assets'
import Footer from '../../components/student/Footer'
const Courseslist = () => {
  const { input } = useParams()
  const { allCoures,navagate } = useContext(AppContext)
  
  const [filterCoures, setFilterCoures] = useState([])

  useEffect(() => {
    if (allCoures && allCoures.length > 0) {
      const tempCoures = allCoures.slice()
      input 
        ? setFilterCoures(
            tempCoures.filter(item => 
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilterCoures(tempCoures)
    }
  }, [allCoures, input])
  
  return (
    <>
      <div className='relative md:px-36 px-8 pt-20 text-left'>
        <div className='flex md:flex-row flex-col items-start justify-between w-full gap-6'>
          <div>
            <h1 className='text-4xl font-semibold text-gray-800'>Courses List</h1>
            <p className='text-gray-500'>
              <span 
                className='text-blue-600 cursor-pointer' 
                onClick={() => navagate('/')}
              >
                Home/
              </span>
              courses List
            </p> 
          </div>
          <SearchBar data={input}/>
        </div>
        {input && <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600' >
          <p>{input}</p>
           <img src={assets.cross_icon} alt='cross' className="cursor-pointer" onClick={()=>navagate('/coures-list')}/> </div>} 
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-16 gap-6 px-2 md:p-0'>
          {filterCoures.map((course, index) => (
            <CourseCard key={index} course={course}/>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Courseslist