'use client'

import Header from '../components/header/index'
import Footer from '../components/footer/index.jsx'
import Loading from '../components/loading'

import { getCookie, hasCookie } from 'cookies-next'
import { useAppContext } from '../context'
import { decodeJwt } from 'jose'
import { useEffect, useState } from 'react'

const data = [
  { nombre: 'Pedro', puntos: 0 },
  { nombre: 'Andres', puntos: 3 },
  { nombre: 'Ruben', puntos: 6 },
  { nombre: 'Ale', puntos: -2 }
]
const data2 = {
  year: 2024,
  season: 'Winter',
  jornada: 1,
  games: [
    {
      game: 'MDK vs G2',
      result: 'MDK WINS'
    },
    {
      game: 'TH vs GX',
      result: 'GX WINS'
    },
    {
      game: 'SK vs BDS',
      result: ''
    },
    {
      game: 'FNC vs KC',
      result: ''
    },
    {
      game: 'VIT vs RGE',
      result: ''
    }
  ]
}

export default function Home() {
  const { values, set, flag } = useAppContext()
  const [ranking, setRanking] = useState()
  const [games, setGames] = useState()

  useEffect(() => {
    set.flag.isLoading(true)
    if (hasCookie('tkn')) {
      if (!flag.islogged) set.user.login()
      const cookie = getCookie('tkn')
      const decoded = decodeJwt(cookie)
      if (decoded.nombre) set.user.nombre(decoded.nombre)
      if (values.userID !== decoded.id) set.user.id(decoded.id)
      setRanking(data)
      setGames(data2)
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
        <section className='flex-1 grid grid-cols-2 justify-center items-center gap-2 p-4 text-slate-50 font-header | sm:gap-4'>
          <article className=' flex justify-center items-center rounded-md min-h-[10rem] h-full bg-blue-800/90 w-auto p-4 overflow-hidden text-xl text-center font-bold | sm:text-2xl transition-all | hover:bg-blue-600/90 hover:cursor-pointer '>
            <a href={`/${values.user.nombre.toLowerCase()}`}>Koiniela</a>
          </article>
          <article className=' flex justify-center items-center rounded-md min-h-[10rem] h-full bg-blue-800/90 w-auto p-4 overflow-hidden text-xl text-center font-bold | sm:text-2xl transition-all | hover:bg-blue-600/90 hover:cursor-pointer  '>
            <a href={`/editor/${values.user.nombre}`}>Liga</a>
          </article>
          <article className=' flex flex-col justify-center items-center rounded-md min-h-[10rem] h-full bg-yellow-600/90 w-auto p-4 overflow-hidden text-xl text-center font-bold | sm:text-2xl transition-all  '>
            <h2 className='w-full'>Ranking</h2>
            <ul className='w-1/2'>
              {ranking.length > 0 ? (
                ranking.map((el, idx) => {
                  return (
                    <li
                      key={idx}
                      className='flex flex-row justify-between w-full'
                    >
                      <h3>{el.nombre}</h3>
                      <span>{el.puntos}</span>
                    </li>
                  )
                })
              ) : (
                <></>
              )}
            </ul>
          </article>
          <article className=' flex flex-col justify-center items-center rounded-md min-h-[10rem] h-full bg-yellow-800/90 w-auto p-4 overflow-hidden text-xl text-center font-bold | sm:text-2xl transition-all | '>
            <h2 className='w-full'>PROX. JORNADA</h2>
            {games ? (
              <>
                <h3 className='w-full'>{`${games.season} - Jornada ${games.jornada}`}</h3>
                <ul className=''>
                  {games.games.map((el, idx) => {
                    return (
                      <li
                        key={idx}
                        className='flex flex-row gap-4 justify-between w-full font-normal'
                      >
                        <h3>{el.game}</h3>
                        {el.result !== '' ? <span>{el.result}</span> : <></>}
                      </li>
                    )
                  })}
                </ul>
              </>
            ) : (
              <></>
            )}
          </article>
        </section>
      ) : (
        <></>
      )}
      <Footer />
    </div>
  )
}
