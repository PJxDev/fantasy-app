import React from 'react'
import axios from 'axios'
import FormLogin from '../forms/FormLogin'
import FormRegister from '../forms/FormRegister'
import Loading from '../loading'

import closeIcon from '../../../public/closeIcon'
import logo from '../../../public/assets/img/logotipo.png'

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
      <header className=' text-slate-50 | font-header | pb-8 | flex | flex-col | justify-between | items-center | gap-7 | font-bold'>
        <nav className=' bg-slate-950/70 p-4 | w-full flex flex-row justify-between gap-2'>
          <ul className='flex flex-row justify-end gap-8'>
            {flag.isLogged ? (
              <>
                <li className=' flex justify-center items-center rounded-full w-auto p-4 overflow-hidden text-xl | sm:text-2xl | transition-all | hover:scale-110 hover:cursor-pointer'>
                  <a href='/'>
                    {' '}
                    <img src={logo.src} alt='FANTASY APP' className=' w-32 ' />
                  </a>
                </li>
                <li className='flex justify-center items-center  rounded-full | w-auto p-4 overflow-hidden text-xl | sm:text-2xl | transition-all | hover:scale-110 hover:cursor-pointer'>
                  <a href='/roster'>Roster</a>
                </li>
                <li className='flex justify-center items-center  rounded-full | w-auto p-4 overflow-hidden text-xl | sm:text-2xl | transition-all | hover:scale-110 hover:cursor-pointer'>
                  <a href='/liga'>Liga</a>
                </li>
                <li className='flex justify-center items-center  rounded-full | w-auto p-4 overflow-hidden text-xl | sm:text-2xl | transition-all | hover:scale-110 hover:cursor-pointer'>
                  <a href='/salonDeLaFama'>Salon de la Fama</a>
                </li>
              </>
            ) : (
              <>
                <li className=' flex justify-center items-center rounded-full w-auto p-4 overflow-hidden text-xl | sm:text-2xl | transition-all | hover:scale-110 hover:cursor-pointer'>
                  <a href='/'>Inicio</a>
                </li>
              </>
            )}
          </ul>

          <ul className='flex flex-row justify-end gap-2 | sm:gap-4'>
            {flag.isLogged ? (
              <>
                <li className='flex justify-center items-center  rounded-full | w-auto p-4 overflow-hidden text-xl | sm:text-2xl | transition-all | hover:scale-110 hover:cursor-pointer'>
                  <button onClick={handlerLogout}>Cerrar Sesión</button>
                </li>
              </>
            ) : (
              <>
                <li
                  className='flex justify-center items-center text-center rounded-full w-auto p-4 overflow-hidden text-xl | sm:text-2xl | transition-all | hover:scale-110 hover:cursor-pointer'
                  onClick={() => {
                    set.modal.open()
                    set.modal.toLogin()
                  }}
                >
                  Iniciar Sesión
                </li>
              </>
            )}
          </ul>
        </nav>
        {flag.isLogged ? <></> : <img src={logo.src} alt='FANTASY APP' />}
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
