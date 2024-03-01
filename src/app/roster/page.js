'use client'

import Header from '../../components/header/index'
import Footer from '../../components/footer/index.jsx'
import Loading from '../../components/loading'

import { getCookie, hasCookie } from 'cookies-next'
import { useAppContext } from '../../context'
import { decodeJwt } from 'jose'
import { useEffect } from 'react'

export default function Roster() {
  const { values, set, flag } = useAppContext()

  const data = [
    {
      id: 1,
      year: 2024,
      season: 'Winter',
      winner: 'Andres',
      puntos: [
        {
          id: 1,
          user: 'Andres',
          puntos: '1360'
        },
        {
          id: 2,
          user: 'Pedro',
          puntos: '1300'
        },
        {
          id: 3,
          user: 'Ruben',
          puntos: '1060'
        },
        {
          id: 4,
          user: 'Ale',
          puntos: '360'
        }
      ]
    },
    {
      id: 2,
      year: 2024,
      season: 'Spring',
      winner: 'Ruben',
      puntos: [
        {
          id: 1,
          user: 'Andres',
          puntos: '360'
        },
        {
          id: 2,
          user: 'Pedro',
          puntos: '1300'
        },
        {
          id: 3,
          user: 'Ruben',
          puntos: '1360'
        },
        {
          id: 4,
          user: 'Ale',
          puntos: '1060'
        }
      ]
    },
    {
      id: 3,
      year: 2024,
      season: 'Summer',
      winner: 'Ale',
      puntos: [
        {
          id: 1,
          user: 'Andres',
          puntos: '1300'
        },
        {
          id: 2,
          user: 'Pedro',
          puntos: '360'
        },
        {
          id: 3,
          user: 'Ruben',
          puntos: '1060'
        },
        {
          id: 4,
          user: 'Ale',
          puntos: '1360'
        }
      ]
    },
    {
      id: 4,
      year: 2024,
      season: 'Worlds',
      winner: 'Pedro',
      puntos: [
        {
          id: 1,
          user: 'Andres',
          puntos: '1300'
        },
        {
          id: 2,
          user: 'Pedro',
          puntos: '1360'
        },
        {
          id: 3,
          user: 'Ruben',
          puntos: '1060'
        },
        {
          id: 4,
          user: 'Ale',
          puntos: '360'
        }
      ]
    }
  ]

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

  if (flag.isLoading)
    return (
      <div className=' min-h-screen flex flex-col justify-between'>
        <Loading />
      </div>
    )

  return (
    <div className=' min-h-screen flex flex-col justify-between'>
      <Header />
      {flag.isLogged ? (
        <>
          <section className='flex-1 grid grid-cols-1 justify-center items-center gap-2 p-4 text-slate-50 font-header | sm:gap-4'>
            <form className='flex-1 flex flex-col w-full h-full bg-slate-900/90 border-2 border-solid border-amber-300'>
              <h1>Tu Roster</h1>
            </form>
          </section>
        </>
      ) : (
        <></>
      )}
      <Footer />
    </div>
  )
}
