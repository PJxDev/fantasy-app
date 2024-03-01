'use client'

import Header from '../../components/header/index'
import Footer from '../../components/footer/index.jsx'
import Loading from '../../components/loading'

import { getCookie, hasCookie } from 'cookies-next'
import { useAppContext } from '../../context'
import { decodeJwt } from 'jose'
import { useEffect } from 'react'

export default function Home() {
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
          <section className='flex-1 grid grid-cols-4 justify-center items-center gap-2 p-4 text-slate-50 font-header | sm:gap-4'>
            {data &&
              data.map((split, idx) => {
                return (
                  <article
                    key={split.id}
                    className={`flex flex-col justify-center bg- items-center rounded-md min-h-[10rem] h-full w-auto gap-4 p-4 overflow-hidden text-xl text-center font-bold | sm:text-2xl transition-all || ${
                      split.season === 'Winter' &&
                      'bg-blue-800/90 hover:bg-blue-600/90'
                    } ${
                      split.season === 'Spring' &&
                      'bg-lime-800/90 hover:bg-lime-600/90'
                    } ${
                      split.season === 'Summer' &&
                      'bg-rose-800/90 hover:bg-rose-600/90'
                    } ${
                      split.season === 'Worlds' &&
                      'bg-amber-800/90 hover:bg-amber-600/90'
                    } `}
                  >
                    <h2>{`${split.season} ${split.year}`}</h2>
                    <h3>Winner: {split.winner} 🏆</h3>
                    <ul className='w-full flex flex-col'>
                      {split.puntos && split.puntos.length > 0 ? (
                        split.puntos.map((player, idx) => {
                          return (
                            <li
                              key={idx}
                              className='w-full flex justify-between items-center border-white border-dashed border-b'
                            >
                              <span>{`${player.user}:`}</span>
                              <span>{player.puntos} 🥈</span>
                            </li>
                          )
                        })
                      ) : (
                        <></>
                      )}
                    </ul>
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
