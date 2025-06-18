import React, {  useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets'
const AddCoures = () => {
  const quillRef = useRef(null)
  const editorRef = useRef(null)

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [currentChapterId, setCurrentChapterId] = useState(null)
  const [lecturesDetail, setLecturesDetail] = useState(

    {
      lectureTitle: '',
      lectureUrl: '',

      isPreviewFree: false,
      lectureDuration: 0,
    }
  )

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      })
    }
  }, [])
  const hanlechapter=(action, chapterId)=>{
    if(action==='add'){
      const title=prompt('enter chapter title')
      if(title){
        const newChapter={
          chapterId:uniqid(),
          chapterTitle:title,
          chapterContent:[],
          collapsed:false,
          chapterOrder:chapters.length>0 ?chapters.slice(-1)[0].chapterOrder+1:1
        }
        setChapters([...chapters,newChapter])
        }  
      } else if(action==='remove'){
        setChapters(chapters.filter(chapter=>chapter.chapterId!==chapterId))
      } else if(action==='toggle'){
        setChapters(
          chapters.map(chapter=>chapter.chapterId===chapterId?{...chapter,collapsed:!chapter.collapsed}:chapter))
      }
  }

  const hanlelecture=(action ,chapterId,lectureindex)=>{

    if(action==='add'){
      setCurrentChapterId(chapterId)
      setShowPopup(true)
    } else if(action==='remove'){
      setChapters(

        chapters.map((chapter)=>{
          if(chapter.chapterId===chapterId){
            chapter.chapterContent.splice(lectureindex,1)
          }
          return chapter
        })
      )
    }
  }

  const addLecture=()=>{

    setChapters(
    chapters.map((chapter)=>{

      if(chapter.chapterId===currentChapterId){

        const newLecture={
  ...lecturesDetail,
  lectureOrder:chapter.chapterContent.length>0?chapter.chapterContent.slice(-1)[0].lectureOder+1:1,
  lectureId:uniqid()

        }
        chapter.chapterContent.push(newLecture)
      }
      return chapter
    })

    );
     setShowPopup(false);
     setLecturesDetail({
      lectureTitle:'',
      lectureUrl:'',
      lectureDuration:'',
      isPreviewFree:false,
     })
  }
  const hanldesumit= async(e)=>{
 e.preventDefault()
  }
  return (
    <div className='h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>

      <form onSubmit={hanldesumit} className='flex flex-col gap-4 max-w-md w-full text-gray-500'>
        <div className='flex flex-col gap-1'>
          <p>Course Title</p>
          <input onChange={e => setCourseTitle(e.target.value)} value={courseTitle}
            type='text'
            placeholder='type here'
            className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500' required />
        </div>
        <div className='flex flex-col gap-1'>
          <p>Course Description</p>
          <div ref={editorRef}></div>
        </div>
        <div className=' flex items-center justify-between flex-wrap'>
          <div className='flex flex-col gap-1'>
            <p>Course Price</p>
            <input onChange={e => setCoursePrice(e.target.value)} value={coursePrice} type='number' placeholder='0' className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500' />
          </div>
          <div className='flex md:flex-row flex-col items-center gap-3'>
            <p>Course Thumbnail</p>
            <label htmlFor='thumbnail' className='flex items-center gap-3'>
              <img src={assets.file_upload_icon} alt='file-upload-icon' className='p-3 bg-blue-500 rounded' />
              <input type='file' id='thumbnail' accept='image/*' onChange={e => setImage(e.target.files[0])} hidden />

              <img className='max-h-10' src={image ? URL.createObjectURL(image) : ""} alt='course-thumbnail' />

            </label>
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <p>Discount%</p>
          <input onChange={e => setDiscount(e.target.value)} value={discount} type='number' placeholder='0' min={0} max={100} className='outline-none md:py-2.5 w-28 py-2 px-3 rounded border border-gray-500' />

        </div>
        {/* adding chapters & lectures */}

        <div>
          {
            chapters.map((chapter, chaptersindex) => (
             <div key={chaptersindex} className='bg-white border rounded-lg mb-4'>
                <div className='flex justify-between items-center p-4 border-b'>
                  <div className='flex items-center'>
                    <img src={assets.dropdown_icon} alt='dropdown-icon' width={14} className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && '-rotate-90'}`} onClick={()=>hanlechapter('toggle',chapter.chapterId)} />
                    <span className='font-semibold'>{chaptersindex + 1}{chapter.chapterTitle}</span>
                  </div>

                  <span className='text-gray-500'>{chapter.chapterContent.length} lectures </span>
                  <img src={assets.cross_icon} alt='cross-icon' className='cursor-pointer' onClick={()=>hanlechapter('remove',chapter.chapterId)}/>
                </div>
                {!chapter.collapsed &&(
                  <div className='p-4'>
                   {
                    chapter.chapterContent.map((lecture,lectureindex)=>(
                      <div key={lectureindex} className='flex justify-between items-center mb-2'>
                       <span>
                        {lectureindex + 1}{lecture.lectureTitle}-{lecture.lectureDuration}mins - <a href={lecture.lectureUrl} target='_blank' className='text-blue-500'>link</a>-{lecture.isPreviewFree?'free Preview':'paid'}
                       </span>
                       <img src={assets.cross_icon} alt='cross-icon' className='cursor-pointer'  onClick={()=>hanlelecture('remove',chapter.chapterId,lectureindex)}/>
                      </div>
                    ))}
                    <div className='inline-flex bg-gray-100 rounded p-2 cursor-pointer mt-2' onClick={()=>hanlelecture('add',chapter.chapterId)}>

                     + Add lecture 
                    </div>
                  </div>
                ) }
              </div>
            )) }
            <div className='flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer' onClick={()=>hanlechapter('add')}>
             + Add Chapter
            </div>
            {
              showPopup && (
                <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                  <div className='bg-white text-gray-700 p-4 rounded relative w-full  max-w-80'>

               <h2 className='text-lg font-semibold mb-4'>Add lecture</h2>
               <div className='mb-2'>
                <p>lecture title</p>
                <input 
                type='text'
                className='mt-1 block w-full border rounded py-1 px-2'
                value={lecturesDetail.lectureTitle}
                onChange={e=>setLecturesDetail({...lecturesDetail,lectureTitle:e.target.value})} 
                />
               </div>
               <div className='mb-2'>
                <p>lecture duration</p>
                <input
                 type='text'
                 className='mt-1 block w-full border rounded py-1 px-2'
                 value={lecturesDetail.lectureDuration}
                 onChange={e=>setLecturesDetail({...lecturesDetail,lectureDuration:e.target.value})}
                />
               </div>
               <div className='mb-2'>
                <p>lecture url</p>
                <input 
                type='text'
                className='mt-1 block w-full border rounded py-1 px-2'
                value={lecturesDetail.lectureUrl}
                onChange={e=>setLecturesDetail({...lecturesDetail,lectureUrl:e.target.value})} 
                />
               </div>

                <div className='flex gap-2 my-4'>
                  <p>is preview free</p>
                  <input
                  
                  type='checkbox'
                  checked={lecturesDetail.isPreviewFree}
                  onChange={e=>setLecturesDetail({...lecturesDetail,isPreviewFree:e.target.checked})}
                  
                  />
                </div>

               <button className='w-full bg-blue-400 text-white px-4 py-2 rounded'>Add</button>
              <img onClick={()=>setShowPopup(false)} src={assets.cross_icon} alt='cross-icon' className='absolute top-4  right-4 w-4  cursor-pointer' />
              </div>

               
                </div>
              )
            }
            </div>
            <button type='submit' className='bg-black text-white w-max px-8 my-4 py-2.5 rounded' onClick={addLecture}>ADD</button>
      </form>

    </div>
  )
}

export default AddCoures