import React from 'react'
import axios from 'axios'
import FormLogin from '../forms/FormLogin'
import FormRegister from '../forms/FormRegister'
import Loading from '../loading'

import closeIcon from '../../../public/closeIcon'

import { useAppContext } from '../../context/index'
import { useRouter } from 'next/navigation'

const Header = () => {
  const { values, set, flag } = useAppContext()
  const router = useRouter()

  const handlerLogout = async () => {
    try {
      const value = await axios.get('/api/auth/logout')
      set.user.nombre('')
      set.user.logout()
    } catch (error) {
    } finally {
      router.refresh()
      set.flag.dataChanged(true)
    }
  }

  return (
    <>
      <header className=' text-black | font-header | pb-8 | flex | flex-col | justify-between | items-center | gap-7'>
        <nav className='bg-orange-300/75  p-4 | w-full flex flex-row justify-between gap-2'>
          <ul className='flex flex-row justify-end gap-4'>
            <li className=' flex justify-center items-center rounded-full bg-slate-50 w-auto p-4 overflow-hidden text-xl | sm:text-2xl | transition-all | hover:scale-110 hover:cursor-pointer'>
              <a href='/'>Inicio</a>
            </li>
          </ul>
          <ul className='flex flex-row justify-end gap-2 | sm:gap-4'>
            {flag.isLogged ? (
              <>
                <li className=' rounded-full | bg-red-500 | text-slate-50 | w-auto p-4 overflow-hidden text-xl | sm:text-2xl | transition-all | hover:scale-110 hover:bg-red-400 hover:cursor-pointer'>
                  <button onClick={handlerLogout}>Cerrar Sesión</button>
                </li>
              </>
            ) : (
              <>
                <li
                  className='flex justify-center items-center text-center rounded-full bg-green-200 w-auto p-4 overflow-hidden text-xl | sm:text-2xl | transition-all | hover:scale-110 hover:bg-green-100 hover:cursor-pointer'
                  onClick={() => {
                    set.modal.open()
                    set.modal.toLogin()
                  }}
                >
                  Iniciar Sesión
                </li>
                <li
                  className=' flex justify-center items-center rounded-full bg-blue-200 w-auto p-4 overflow-hidden text-xl | sm:text-2xl | transition-all | hover:scale-110 hover:bg-blue-100 hover:cursor-pointer'
                  onClick={() => {
                    set.modal.open()
                    set.modal.toRegister()
                  }}
                >
                  Registarse
                </li>
              </>
            )}
          </ul>
        </nav>
        <h1 className='text-4xl | text-center'>Queridos Reyes Magos ...</h1>
        <img
          src='https://fotografias.lasexta.com/clipping/cmsimages01/2021/01/05/DAE96D97-478A-4926-9ED6-CEC0E49AE108/default.jpg?crop=1300,731,x0,y12&width=1900&height=1069&optimize=low'
          alt='imagen de los tres reyes magos'
          className='w-11/12 | h-full | m-4 | object-contain | object-center | rounded-2xl | md:object-cover md:h-[30rem]'
        />
      </header>
      {flag.isOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10'>
          {flag.modalMode === 'login' && (
            <div className='flex flex-col justify-between items-center gap-6 w-96 h-72  p-20 bg-white rounded-lg shadow-md text-stone-950 relative'>
              <section className='h-full'>
                <FormLogin />
              </section>
              <button
                onClick={set.modal.close}
                className='absolute right-0 top-0'
              >
                {closeIcon}
              </button>
            </div>
          )}
          {flag.modalMode === 'register' && (
            <div className='flex flex-col justify-between items-center gap-6 w-96 h-96  p-10 bg-white rounded-lg shadow-md text-stone-950 relative'>
              <section className='h-full'>
                <FormRegister closeModal={set.modal.close} />
              </section>
              <button
                onClick={set.modal.close}
                className='absolute right-0 top-0'
              >
                {closeIcon}
              </button>
            </div>
          )}
        </div>
      )}
      {flag.isLoading && <Loading />}
    </>
  )
}

export default Header
