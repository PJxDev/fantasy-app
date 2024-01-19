'use client'

import Header from '../../components/header/index'
import Introduction from '../../components/introduction/index'
import Footer from '../../components/footer/index'
import ProductsCard from '../../components/products/index'

import { useEffect } from 'react'
import { useAppContext } from '../../context'
import { getCookie, hasCookie } from 'cookies-next'
import { decodeJwt } from 'jose'
import Loading from '../../components/loading'

const capitalizar = (cadena) => {
  cadena.split(' ')

  let array = cadena.split(' ')

  if (array.length === 1)
    return cadena.charAt(0).toUpperCase() + cadena.toLowerCase().slice(1)

  array = array.map((word) => {
    return capitalizar(word)
  })
  return array.join(' ')
}

export default function EditorPage({ params }) {
  const { values, set, flag } = useAppContext()

  useEffect(() => {
    if (hasCookie('tkn')) {
      if (!flag.islogged) set.user.login()
      const cookie = getCookie('tkn')
      const decoded = decodeJwt(cookie)
      if (decoded.nombre) set.user.nombre(decoded.nombre)
      if (decoded.id) set.user.id(decoded.id)
    }

    async function getNames() {
      set.flag.isLoading(true)
      const names = await values.usersNames.get()
      set.usersNames(names)
      if (names.includes(params.name.toLowerCase())) {
        try {
          const dataUser = await values.user.getByName(params.name)
          const carta = await values.carta.get(dataUser.id)
          set.user.carta(carta)
        } catch (error) {
          console.error(error)
        }
      }
      set.flag.isLoading(false)
    }

    getNames()
  }, [])

  if (flag.isLoading)
    return (
      <div className='bg-orange-200 min-h-screen flex flex-col'>
        <Loading />
      </div>
    )

  return (
    <>
      <div className='bg-orange-200 min-h-screen flex flex-col'>
        <Header />
        <Introduction />
        <main className=' bg-emerald-100/75 | text-black | p-7 | flex | flex-1 | flex-col | gap-4 | justify-center | items-center'>
          <h2 className='text-2xl'>{`Carta de ${capitalizar(
            params.name
          )}:`}</h2>
          {values.usersNames.value.includes(params.name.toLowerCase()) &&
          values.user.carta !== undefined ? (
            <section className='flex | flex-row | flex-wrap | justify-center | items-stretch | gap-4 |  w-full | max-w-5xl'>
              {values.user.carta.length > 0 ? (
                values.user.carta.map((product) => {
                  return (
                    <ProductsCard
                      key={product.id}
                      title={product.name}
                      img={product.images}
                      links={product.links}
                      description={product.description}
                    />
                  )
                })
              ) : (
                <div className='text-xl'>Tu carta está vacía!</div>
              )}
            </section>
          ) : (
            'Parece que esta carta no existe!'
          )}
        </main>
        <Footer />
      </div>
    </>
  )
}
