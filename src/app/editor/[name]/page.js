'use client'

import Header from '../../../components/header/index'
import Introduction from '../../../components/introduction/index'
import Footer from '../../../components/footer/index'
import ProductsCard from '../../../components/products/index'

import FormEditProduct from '../../../components/forms/FormEditProduct'
import FormAddProduct from '../../../components/forms/FormAddProduct'
import closeIcon from '../../../../public/closeIcon'

import { useEffect } from 'react'
import { useAppContext } from '../../../context'
import { getCookie, hasCookie } from 'cookies-next'
import { decodeJwt } from 'jose'
import { useRouter } from 'next/navigation'
import Loading from '../../../components/loading'

const capitalizar = (cadena) => {
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

  const router = useRouter()

  useEffect(() => {
    if (hasCookie('tkn')) {
      if (!flag.islogged) set.user.login()
      const cookie = getCookie('tkn')
      const decoded = decodeJwt(cookie)
      if (values.user.nombre !== decoded.nombre) set.user.nombre(decoded.nombre)
      if (decoded.nombre.toLowerCase() !== params.name.toLowerCase())
        router.push('/')
      if (values.user.id !== decoded.id) set.user.id(decoded.id)
    } else {
      router.push('/')
    }

    async function getNames() {
      set.flag.isLoading(true)
      const names = await values.usersNames.get()

      if (names.includes(params.name.toLowerCase())) {
        const dataUser = await values.user.getByName(params.name)
        const carta = await values.carta.get(dataUser.id)
        set.user.carta(carta)
      }
      set.flag.isLoading(false)
    }
    getNames()
    set.flag.dataChanged(false)
  }, [flag.dataChanged])

  const handleAddProduct = () => {
    try {
      set.modal.open()
      set.modal.toAdd()
    } catch (e) {
      console.error(e)
    }
  }
  const handleCancel = () => {
    set.modal.toEdit()
  }
  const handleDeleteDefinitive = async () => {
    try {
      const data = await set.product.delete(values.product.editting.id)
      set.modal.close()
      set.flag.dataChanged(true)
    } catch (error) {
      console.error(e)
    }
  }

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
          <section className='flex | flex-row | flex-wrap | justify-center | items-stretch | gap-4 | w-full | max-w-5xl'>
            {values.user.carta &&
              values.user.carta.map((product) => {
                return (
                  <ProductsCard
                    key={product.id}
                    productID={product.id}
                    title={product.name}
                    img={product.images}
                    links={product.links}
                    description={product.description}
                    edit={true}
                  />
                )
              })}
          </section>
          <div className=' bg-slate-50 p-4  rounded-lg text-xl flex gap-2 justify-center items-center'>
            Puedes añadir cosas a tu carta haciendo click aquí:
            <button onClick={handleAddProduct}>
              <svg
                version='1.1'
                id='Layer_1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 512 512'
                fill='#000000'
                className='w-[30px] | h-[30px]'
              >
                <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                <g
                  id='SVGRepo_tracerCarrier'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></g>
                <g id='SVGRepo_iconCarrier'>
                  {' '}
                  <circle
                    style={{ fill: '#7AB9E8' }}
                    cx='256'
                    cy='256'
                    r='256'
                  ></circle>{' '}
                  <path
                    style={{ fill: '#579ADF' }}
                    d='M256,0v512c141.385,0,256-114.615,256-256S397.385,0,256,0z'
                  ></path>{' '}
                  <polygon
                    style={{ fill: '#F2F2F4' }}
                    points='384,228.571 283.429,228.571 283.429,128 228.571,128 228.571,228.571 128,228.571 128,283.429 228.571,283.429 228.571,384 283.429,384 283.429,283.429 384,283.429 '
                  ></polygon>{' '}
                  <rect
                    x='283.429'
                    y='228.571'
                    style={{ fill: '#DFDFE1' }}
                    width='100.571'
                    height='54.857'
                  ></rect>{' '}
                </g>
              </svg>
            </button>
          </div>
          {flag.isOpen && flag.modalMode === 'editProduct' && (
            <div className='fixed top-0 left-0 w-full h-full p-4 bg-black bg-opacity-50 flex justify-center items-start overflow-auto z-10'>
              <div className='flex flex-col justify-between items-center gap-6 w-[35rem] h-[60rem] p-4 bg-white rounded-lg shadow-md text-stone-950 relative'>
                <section className='h-full w-full'>
                  <FormEditProduct />
                </section>
                <button
                  onClick={set.modal.close}
                  className='absolute right-0 top-0'
                >
                  {closeIcon}
                </button>
              </div>
            </div>
          )}
          {flag.isOpen && flag.modalMode === 'addProduct' && (
            <div className='fixed top-0 left-0 w-full h-full p-4 bg-black bg-opacity-50 flex justify-center items-start overflow-auto z-10'>
              <div className='flex flex-col justify-between items-center gap-6 w-[35rem] h-[60rem] p-4 bg-white rounded-lg shadow-md text-stone-950 relative'>
                <section className='h-full w-full'>
                  <FormAddProduct />
                </section>
                <button
                  onClick={set.modal.close}
                  className='absolute right-0 top-0'
                >
                  {closeIcon}
                </button>
              </div>
            </div>
          )}
          {flag.isLoading && (
            <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-20'>
              <div className='flex flex-col justify-between items-center gap-6 w-96 h-72 p-20 bg-white rounded-lg shadow-md relative'>
                <h3 className='animate-bounce font-bold text-2xl'>
                  <svg
                    viewBox='0 0 72 72'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                    role='img'
                    className='w-[72px] | h-[72px]'
                    preserveAspectRatio='xMidYMid meet'
                    fill='#000000'
                  >
                    <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                    <g
                      id='SVGRepo_tracerCarrier'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    ></g>
                    <g id='SVGRepo_iconCarrier'>
                      <path
                        fill='#FFB636'
                        d='M68.4 10.8c-.6 1.4-1 3.3-1.1 4.5c-1.6 0-2.9 1.3-2.9 2.9c0 1.6 1.3 2.9 2.9 2.9c.2 0 .4 0 .6-.1c-.2 4.3-3.7 7.7-8.1 7.7c-4.4 0-7.9-3.4-8.1-7.7c1.3-.2 2.4-1.4 2.4-2.8c0-1.6-1.3-2.9-2.9-2.9h-.3c-.4-2-1.5-5.2-2.8-5.2c-1.3 0-2.4 3.1-2.8 5.2c-.2 0-.4-.1-.6-.1c-1.6 0-2.9 1.3-2.9 2.9c0 1.4 1 2.6 2.4 2.9c-.2 4.3-3.7 7.7-8.1 7.7c-4.4 0-7.9-3.5-8.1-7.8c1.3-.3 2.2-1.4 2.2-2.8c0-1.6-1.3-2.9-2.9-2.9H27c-.4-2-1.5-5.2-2.8-5.2c-1.3 0-2.4 3.1-2.8 5.2c-.2 0-.4-.1-.6-.1c-1.6 0-2.9 1.3-2.9 2.9c0 1.5 1.1 2.7 2.6 2.9c-.2 4.3-3.8 7.7-8.1 7.7c-4.4 0-7.9-3.4-8.1-7.7c.2 0 .4.1.6.1c1.6 0 2.9-1.3 2.9-2.9c0-1.6-1.3-2.9-2.9-2.9h-.2c-.2-1.3-.5-3-.9-4.4c-.3-1.1-1.8-.9-1.8.3v46.8h68.4V11.3c-.2-1.2-1.5-1.5-2-.5z'
                      ></path>
                      <path
                        fill='#FFD469'
                        d='M70.8 43.6H1.2c-.7 0-1.2-.5-1.2-1.2V39c0-.7.5-1.2 1.2-1.2h69.5c.7 0 1.2.5 1.2 1.2v3.4c.1.7-.4 1.2-1.1 1.2zm1.2 17v-3.4c0-.7-.5-1.2-1.2-1.2H1.2c-.7 0-1.2.5-1.2 1.2v3.4c0 .7.5 1.2 1.2 1.2h69.5c.8 0 1.3-.5 1.3-1.2z'
                      ></path>
                      <path
                        fill='#FFC7EF'
                        d='M64.4 50c0 1.8-1.4 3.2-3.2 3.2S58 51.8 58 50s1.4-3.2 3.2-3.2s3.2 1.4 3.2 3.2zM36 46.8c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2s3.2-1.4 3.2-3.2s-1.4-3.2-3.2-3.2zm-25.2 0c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2S14 51.7 14 50s-1.4-3.2-3.2-3.2z'
                      ></path>
                    </g>
                  </svg>
                </h3>
              </div>
            </div>
          )}
          {flag.isOpen && flag.modalMode === 'confirmDelete' && (
            <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-20'>
              <div className='flex flex-col justify-between items-center gap-6 w-96 h-72 p-10 bg-white rounded-lg shadow-md relative'>
                <h3 className='text-xl font-bold text-center'>
                  ¿Desea eliminar ese producto definitivamente?
                </h3>
                <h4>Esta acción no podrá deshacerse</h4>
                <div className='flex flex-row gap-8'>
                  <button
                    onClick={handleCancel}
                    className=' bg-green-600 p-4 text-white font-semibold rounded-md min-w-[6rem] | hover:bg-green-500'
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDeleteDefinitive}
                    className=' bg-red-600 p-4 text-white font-semibold rounded-md min-w-[6rem] | hover:bg-red-500'
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  )
}
