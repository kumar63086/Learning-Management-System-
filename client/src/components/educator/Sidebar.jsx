import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import AppContext from '../../context/AppContext'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const { isEducator } = useContext(AppContext)

  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Courses', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
    { name: 'Students Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ]

  return isEducator && (

    <div className='md:w-64 w-16 border-r min-h-screen border-gray-500 py-2 flex flex-col overflow-y-auto'>
      {
        menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={item.path === '/educator'}
            className={({ isActive }) =>
              `group flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 
              ${isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'hover:bg-gray-100'}`
            }
          >
            <img src={item.icon} alt='icon' className='w-6 h-6 cursor-pointer' />
            <p className='md:block hidden text-center group-hover:block'>{item.name}</p>
          </NavLink>
        ))
      }


    </div>
  )
}

export default Sidebar
