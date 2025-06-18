import React, { useEffect, useState } from 'react';
import { dummyStudentEnrolled } from '../../assets/assets';
import Loading from '../../components/student/Loading';

const StudentEnrolled = () => {
  const [enrolledStudents, setStudentEnrolled] = useState(null);

  const fetchStudentEnrolledData = async () => {
    // Simulating data fetch
    setStudentEnrolled(dummyStudentEnrolled);
  };

  useEffect(() => {
    fetchStudentEnrolledData();
  }, []);

  return enrolledStudents ? (
    <div className='min-h-screen flex flex-col items-start justify-between md:p-8 p-4 pt-8'>
      <div className='w-full max-w-4xl mx-auto'>
        <h2 className='text-lg font-semibold pb-4'>
          Enrolled Students <span className='text-gray-500'>({enrolledStudents.length})</span>
        </h2>
        <div className='flex flex-col items-center w-full overflow-hidden rounded-md bg-white border border-gray-300'>
          <div className='w-full overflow-x-auto'>
            <table className='table-fixed md:table-auto w-full'>
              <thead className='text-gray-900 border-b border-gray-300 text-sm text-left'>
                <tr>
                  <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#</th>
                  <th className='px-4 py-3 font-semibold'>Student Name</th>
                  <th className='px-4 py-3 font-semibold'>Course Title</th>
                  <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>Date</th>
                </tr>
              </thead>
              <tbody className='text-sm text-gray-600'>
                {enrolledStudents.map((item, index) => (
                  <tr key={index} className='border-b border-gray-200/20'>
                    <td className='px-4 py-3 text-center hidden sm:table-cell'>{index + 1}</td>
                    <td className='px-4 py-3 flex items-center space-x-3'>
                      <img
                        src={item.student.imageUrl || '/default-avatar.png'}
                        alt='Profile'
                        className='w-9 h-9 rounded-full object-cover'
                        onError={(e) => (e.target.src = '/default-avatar.png')}
                      />
                      <span className='truncate'>{item.student.name}</span>
                    </td>
                    <td className='px-4 py-3'>
                      {item.courseTitle}
                    </td>
                    <td className='px-4 py-3 text-center hidden sm:table-cell'>
                      {new Date(item.purchaseDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='min-h-screen flex items-center justify-center'>
      <Loading />
    </div>
  );
};

export default StudentEnrolled;
