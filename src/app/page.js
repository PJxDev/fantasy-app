'use client'

import Header from '../components/header/index'
import Footer from '../components/footer/index.jsx'
import Loading from '../components/loading'

import { getCookie, hasCookie } from 'cookies-next'
import { useAppContext } from '../context'
import { decodeJwt } from 'jose'
import { useEffect } from 'react'

export default function Home() {
  const { values, set, flag } = useAppContext()

  useEffect(() => {
    set.flag.isLoading(true)
    if (hasCookie('tkn')) {
      if (!flag.islogged) set.user.login()
      const cookie = getCookie('tkn')
      const decoded = decodeJwt(cookie)
      if (decoded.nombre) set.user.nombre(decoded.nombre)
      if (values.userID !== decoded.id) set.user.id(decoded.id)
    }
    set.flag.isLoading(false)
  }, [flag.dataChanged])

  useEffect(() => {
    const fetchData = async () => {
      set.flag.isLoading(true)
      if (flag.isLogged) {
        try {
          const newCarta = await values.carta.get(values.user.id)
          set.carta.set(newCarta)
        } catch (error) {
          console.error('Carta Vacia: ' + error)
        }
      } else {
        set.carta.reset()
        set.user.nombre('')
      }
      set.flag.isLoading(false)
    }
    fetchData()
    set.flag.dataChanged(false)
  }, [flag.dataChanged])

  if (flag.isLoading)
    return (
      <div className='bg-orange-200 min-h-screen flex flex-col'>
        <Loading />
      </div>
    )

  return (
    <div className='bg-orange-200 min-h-screen flex flex-col'>
      <Header />
      {flag.isLogged ? (
        <ul className='flex flex-row justify-center items-center gap-2 text-slate-950 font-header | sm:gap-4'>
          <li className=' flex justify-center items-center rounded-md min-h-[5rem] bg-blue-300 w-auto p-4 overflow-hidden text-xl text-center | sm:text-2xl transition-all | hover:scale-110 hover:bg-blue-200 hover:cursor-pointer '>
            <a href={`/${values.user.nombre.toLowerCase()}`}>
              Carta para Compartir
            </a>
          </li>
          <li className=' flex justify-center items-center rounded-md min-h-[5rem] bg-green-300 w-auto p-4 overflow-hidden text-xl text-center | sm:text-2xl transition-all | hover:scale-110 hover:bg-green-200 hover:cursor-pointer  '>
            <a href={`/editor/${values.user.nombre}`}>Editar mi Carta</a>
          </li>
        </ul>
      ) : (
        <h3 className='w-full text-center font-semibold text-2xl text-slate-950'>
          ¡ Regístrate o inicia sesión para editar tu carta y compartirla !
        </h3>
      )}
      <Footer />
    </div>
  )
}
