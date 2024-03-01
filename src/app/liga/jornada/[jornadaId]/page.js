'use client'

import Header from '../../../../components/header/index'
import Footer from '../../../../components/footer/index.jsx'
import Loading from '../../../../components/loading/index.jsx'

import { getCookie, hasCookie } from 'cookies-next'
import { useAppContext } from '../../../../context/index.jsx'
import { decodeJwt } from 'jose'
import { useEffect } from 'react'

export default function Jornada({ params }) {
  const { values, set, flag } = useAppContext()

  const data = {
    id: 1,
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

  const data2 = {
    koiniela: 1,
    preguntas: [
      { p: 'Game 1' },
      { p: 'Game 2' },
      { p: 'Game 3' },
      { p: 'Game 4' },
      { p: 'Game 5' }
    ]
  }

  const data3 = {
    contestacionesId: 3
  }

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
          <section className='flex-1 flex flex-col justify-center items-center gap-2 p-4 text-slate-50 font-header | sm:gap-4'>
            <header>
              <h1>Koiniela</h1>
              <h2>JORNADA {data.jornada} </h2>
              <h2>
                {data.season} {data.year}
              </h2>
            </header>
            <section>
              <header>
                <h3>PREGUNTAS</h3>
                <ol>
                  {data2.preguntas.map((el, idx) => {
                    return <li key={idx}>{el.p}</li>
                  })}
                </ol>
              </header>
            </section>
          </section>
        </>
      ) : (
        <></>
      )}
      <Footer />
    </div>
  )
}
