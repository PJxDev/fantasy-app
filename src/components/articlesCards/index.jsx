import React from 'react'
import ProductsCard from '../products/index.jsx'
import { useAppContext } from '../../context/index.jsx'

const ArticlesCards = () => {
  const { values, set, flag } = useAppContext()

  return (
    <main className=' bg-emerald-100/75 | text-black | p-7 | flex | flex-1 | flex-col | gap-4 | justify-center | items-center'>
      <h2 className='text-3xl | font-header '>Mi Carta:</h2>
      <section className='flex | flex-row | flex-wrap | justify-center | items-stretch | gap-4 | max-w-5xl'>
        {values.carta.value.length > 0 ? (
          values.carta.value.map(({ name, images, links, description }) => {
            return (
              <ProductsCard
                key={name}
                title={name}
                img={images}
                links={links}
                description={description}
              />
            )
          })
        ) : (
          <div className='text-xl'>Tu carta está vacía!</div>
        )}
      </section>
    </main>
  )
}

export default ArticlesCards
