'use client'

import Header from '../../components/header/index'
import Footer from '../../components/footer/index.jsx'
import Loading from '../../components/loading'

import { getCookie, hasCookie } from 'cookies-next'
import { useAppContext } from '../../context'
import { decodeJwt } from 'jose'
import { useEffect } from 'react'

export default function Liga() {
  const { values, set, flag } = useAppContext()

  const data = [
    {
      id: 1,
      year: 2024,
      season: 'Winter',
      jornada: 1
    },
    {
      id: 2,
      year: 2024,
      season: 'Winter',
      jornada: 2
    },
    {
      id: 3,
      year: 2024,
      season: 'Winter',
      jornada: 3
    },
    {
      id: 4,
      year: 2024,
      season: 'Winter',
      jornada: 4
    },
    {
      id: 5,
      year: 2024,
      season: 'Winter',
      jornada: 5
    },
    {
      id: 6,
      year: 2024,
      season: 'Winter',
      jornada: 6
    },
    {
      id: 7,
      year: 2024,
      season: 'Winter',
      jornada: 7
    },
    {
      id: 8,
      year: 2024,
      season: 'Winter',
      jornada: 8
    },
    {
      id: 9,
      year: 2024,
      season: 'Winter',
      jornada: 9
    },
    {
      id: 10,
      year: 2024,
      season: 'Winter',
      jornada: 10
    },
    {
      id: 11,
      year: 2024,
      season: 'Winter',
      jornada: 11
    },
    {
      id: 12,
      year: 2024,
      season: 'Winter',
      jornada: 12
    },
    {
      id: 13,
      year: 2024,
      season: 'Winter',
      jornada: 13
    },
    {
      id: 14,
      year: 2024,
      season: 'Winter',
      jornada: 14
    },
    {
      id: 15,
      year: 2024,
      season: 'Winter',
      jornada: 15
    },
    {
      id: 16,
      year: 2024,
      season: 'Winter',
      jornada: 16
    },
    {
      id: 17,
      year: 2024,
      season: 'Winter',
      jornada: 17
    },
    {
      id: 18,
      year: 2024,
      season: 'Winter',
      jornada: 18
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
          <section className='flex-1 grid grid-cols-4 justify-center items-center gap-2 p-4 text-slate-50 font-header | sm:gap-4'>
            {data &&
              data.map((el, idx) => {
                return (
                  <article
                    key={el.id}
                    className=' flex flex-col justify-center items-center rounded-md min-h-[10rem] h-full bg-blue-800/90 w-auto p-4 overflow-hidden text-xl text-center font-bold | sm:text-2xl transition-all | hover:bg-blue-600/90 hover:cursor-pointer '
                  >
                    <a
                      className='w-full h-full grid place-content-center'
                      href={`./liga/jornada/${el.id}`}
                    >
                      <h2>{el.season}</h2>
                      <h3>Jornada {el.jornada}</h3>
                    </a>
                  </article>
                )
              })}
          </section>
        </>
      ) : (
        <></>
      )}
      <Footer />
    </div>
  )
}
