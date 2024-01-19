import React from 'react'

const Loading = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-20'>
      <div className='flex flex-col justify-center items-center gap-6 w-96 h-72 p-20 bg-white rounded-lg shadow-md relative'>
        <h3 className='animate-bounce font-bold text-2xl'>
          <svg
            viewBox='0 0 72 72'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            role='img'
            className='w-[72px] | h-[72px]'
            preserveAspectRatio='xMidYMid meet'
            fill='#000000'
          >
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g
              id='SVGRepo_tracerCarrier'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></g>
            <g id='SVGRepo_iconCarrier'>
              <path
                fill='#FFB636'
                d='M68.4 10.8c-.6 1.4-1 3.3-1.1 4.5c-1.6 0-2.9 1.3-2.9 2.9c0 1.6 1.3 2.9 2.9 2.9c.2 0 .4 0 .6-.1c-.2 4.3-3.7 7.7-8.1 7.7c-4.4 0-7.9-3.4-8.1-7.7c1.3-.2 2.4-1.4 2.4-2.8c0-1.6-1.3-2.9-2.9-2.9h-.3c-.4-2-1.5-5.2-2.8-5.2c-1.3 0-2.4 3.1-2.8 5.2c-.2 0-.4-.1-.6-.1c-1.6 0-2.9 1.3-2.9 2.9c0 1.4 1 2.6 2.4 2.9c-.2 4.3-3.7 7.7-8.1 7.7c-4.4 0-7.9-3.5-8.1-7.8c1.3-.3 2.2-1.4 2.2-2.8c0-1.6-1.3-2.9-2.9-2.9H27c-.4-2-1.5-5.2-2.8-5.2c-1.3 0-2.4 3.1-2.8 5.2c-.2 0-.4-.1-.6-.1c-1.6 0-2.9 1.3-2.9 2.9c0 1.5 1.1 2.7 2.6 2.9c-.2 4.3-3.8 7.7-8.1 7.7c-4.4 0-7.9-3.4-8.1-7.7c.2 0 .4.1.6.1c1.6 0 2.9-1.3 2.9-2.9c0-1.6-1.3-2.9-2.9-2.9h-.2c-.2-1.3-.5-3-.9-4.4c-.3-1.1-1.8-.9-1.8.3v46.8h68.4V11.3c-.2-1.2-1.5-1.5-2-.5z'
              ></path>
              <path
                fill='#FFD469'
                d='M70.8 43.6H1.2c-.7 0-1.2-.5-1.2-1.2V39c0-.7.5-1.2 1.2-1.2h69.5c.7 0 1.2.5 1.2 1.2v3.4c.1.7-.4 1.2-1.1 1.2zm1.2 17v-3.4c0-.7-.5-1.2-1.2-1.2H1.2c-.7 0-1.2.5-1.2 1.2v3.4c0 .7.5 1.2 1.2 1.2h69.5c.8 0 1.3-.5 1.3-1.2z'
              ></path>
              <path
                fill='#FFC7EF'
                d='M64.4 50c0 1.8-1.4 3.2-3.2 3.2S58 51.8 58 50s1.4-3.2 3.2-3.2s3.2 1.4 3.2 3.2zM36 46.8c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2s3.2-1.4 3.2-3.2s-1.4-3.2-3.2-3.2zm-25.2 0c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2S14 51.7 14 50s-1.4-3.2-3.2-3.2z'
              ></path>
            </g>
          </svg>
        </h3>
      </div>
    </div>
  )
}

export default Loading
