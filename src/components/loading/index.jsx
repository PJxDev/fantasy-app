import React from 'react'
import logo from '../../../public/assets/img/logotipo.png'

const Loading = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-20'>
      <div className='flex flex-col justify-center items-center gap-6 w-96 h-72 p-20 bg-white rounded-lg shadow-md relative'>
        <h3 className='animate-bounce font-bold text-2xl'>
          <img
            src={logo.src}
            alt='logo fantasy app'
            className='w-[72px] | h-[72px] animate-rotation'
          />
        </h3>
      </div>
    </div>
  )
}

export default Loading
