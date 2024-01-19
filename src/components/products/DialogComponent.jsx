import React from 'react'
import closeIcon from '../../../public/closeIcon'
import { useAppContext } from '../../context'

const DialogComponent = ({ links, icon }) => {
  const { values, set, flag } = useAppContext()
  return (
    <>
      <button
        className='self-center transition-all stroke-[#00bfd8] | hover:stroke-red-500 hover:scale-110 '
        onClick={set.modal.open}
      >
        {icon}
      </button>

      {flag.isOpen && (
        <div
          class='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10'
          onClick={set.modal.close}
        >
          <div class='flex flex-col justify-between items-center gap-6 w-300 p-20 bg-white rounded-lg shadow-md'>
            <ul class='flex flex-row flex-wrap justify-center gap-4'>
              {links.map((el, idx) => {
                return (
                  <li
                    key={idx}
                    className='| border-2 border-solid border-[#00bfd8] rounded-full p-8'
                  >
                    <a
                      href={el}
                      className='flex flex-col justify-center items-center transition-all stroke-[#00bfd8] | hover:stroke-red-500 hover:scale-110 '
                      target='_blank'
                    >
                      {icon}
                      <p className=' font-semibold text-xl'>
                        {`Opción ${idx + 1}`}
                      </p>
                    </a>
                  </li>
                )
              })}
            </ul>
            <button onClick={set.modal.close}>{closeIcon}</button>
          </div>
        </div>
      )}
    </>
  )
}

export default DialogComponent
