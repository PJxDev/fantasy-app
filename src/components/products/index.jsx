import React from 'react'
import Carousel from './Carousel'
import DialogComponent from './DialogComponent'
import { useAppContext } from '../../context'
import axios from 'axios'

const carro = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='icon icon-tabler icon-tabler-building-store'
    width='44'
    height='44'
    viewBox='0 0 24 24'
    strokeWidth='2'
    stroke='inherit'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <line x1='3' y1='21' x2='21' y2='21' />
    <path d='M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4' />
    <line x1='5' y1='21' x2='5' y2='10.85' />
    <line x1='19' y1='21' x2='19' y2='10.85' />
    <path d='M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4' />
  </svg>
)

const ProductsCard = ({
  productID,
  title,
  img,
  description,
  links,
  edit = false
}) => {
  const { values, set, flag } = useAppContext()
  const handleEditProduct = async (id) => {
    try {
      let { data } = await axios.get(`../api/products/${id}`)
      set.product.editting(data.exists)
      set.modal.open()
      set.modal.toEdit()
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <article className='bg-gray-200 | border-slate-300 | border-2 | p-6 | rounded-xl | flex | flex-col | justify-between | gap-4 | w-full | h-full | min-h-[33rem] | max-w-xs | max-h-[35rem] | relative'>
      {edit && (
        <button
          onClick={() => handleEditProduct(productID)}
          className='bg-yellow-50 | rounded-full | w-12 | h-12 | absolute | top-0 | right-0 | flex justify-center items-center'
        >
          <svg
            version='1.1'
            id='Layer_1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512.001 512.001'
            fill='#000000'
            className='w-8 h-8'
          >
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g
              id='SVGRepo_tracerCarrier'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></g>
            <g id='SVGRepo_iconCarrier'>
              {' '}
              <path
                style={{ fill: '#FFBD42' }}
                d='M33.052,356.136l-0.822,0.822l0,0L0.613,485.716c-1.77,7.209,0.355,14.819,5.604,20.068 l88.242-88.242L33.052,356.136z'
              ></path>{' '}
              <path
                style={{ fill: '#ffec1f' }}
                d='M502.599,86.817L425.182,9.402c-12.536-12.536-32.86-12.536-45.396,0L311.18,78.008l-10.078,10.078 L32.23,356.957l0,0L0.613,485.716c-1.77,7.209,0.355,14.819,5.604,20.068c5.249,5.249,12.858,7.374,20.068,5.604l128.759-31.617l0,0 l268.873-268.873l10.078-10.078l68.606-68.606C515.135,119.677,515.135,99.353,502.599,86.817z'
              ></path>{' '}
              <path
                style={{ fill: '#007066' }}
                d='M425.182,9.402c-12.536-12.536-32.86-12.536-45.396,0L311.18,78.008l-10.078,10.078L32.23,356.957 l0,0L0.613,485.716c-1.77,7.209,0.355,14.819,5.604,20.068L463.891,48.11L425.182,9.402z'
              ></path>{' '}
              <path
                style={{ fill: '#2c3e3f' }}
                d='M425.182,9.402c-12.536-12.536-32.86-12.536-45.396,0L311.18,78.008l-10.078,10.078L32.23,356.957 l0,0L0.613,485.716c-1.77,7.209,0.355,14.819,5.604,20.068L463.891,48.11L425.182,9.402z'
              ></path>{' '}
              <path
                style={{ fill: '#940009' }}
                d='M466.265,168.547l36.334-36.334c12.536-12.536,12.536-32.86,0-45.396L425.182,9.402 c-12.536-12.536-32.86-12.536-45.396,0l-36.334,36.334L466.265,168.547z'
              ></path>{' '}
              <path
                style={{ fill: '#FF0029' }}
                d='M463.891,48.11L425.182,9.402c-12.536-12.536-32.86-12.536-45.396,0l-36.334,36.334l61.407,61.407 L463.891,48.11z'
              ></path>{' '}
              <path
                style={{ fill: '#F7DC4D' }}
                d='M33.052,356.136l-0.822,0.822l0,0L0.613,485.716c-1.77,7.209,0.355,14.819,5.604,20.068 c5.249,5.249,12.858,7.374,20.068,5.604l128.759-31.617l0,0l0.822-0.822L33.052,356.136z'
              ></path>{' '}
              <rect
                x='297.713'
                y='90.415'
                transform='matrix(-0.7071 -0.7071 0.7071 -0.7071 566.3668 489.469)'
                style={{ fill: '#FF9800' }}
                width='173.685'
                height='74.042'
              ></rect>{' '}
              <polygon
                style={{ fill: '#F7DC4D' }}
                points='410.735,101.265 349.328,39.86 311.18,78.007 301.103,88.085 296.972,92.217 358.378,153.622 '
              ></polygon>{' '}
              <path
                style={{ fill: '#2D2B27' }}
                d='M11.138,442.855l-10.524,42.86c-1.77,7.209,0.355,14.819,5.604,20.068 c5.249,5.249,12.858,7.374,20.068,5.604l42.86-10.525L11.138,442.855z'
              ></path>{' '}
              <path
                style={{ fill: '#403E3B' }}
                d='M11.138,442.855l-10.524,42.86c-1.77,7.209,0.355,14.819,5.604,20.068l33.925-33.925L11.138,442.855z '
              ></path>{' '}
            </g>
          </svg>
        </button>
      )}
      <header className='text-2xl | text-center | font-bold'>{title}</header>
      <div className='flex flex-col gap-4 | text-left - min-h-[24rem] justify-between'>
        {img.length > 1 ? (
          <Carousel images={img} />
        ) : (
          <img
            src={img.join('')}
            className='rounded-lg | flex | relative | w-full | h-[15rem] | | justify-center | items-center | object-cover | object-center'
          />
        )}

        <p>{description}</p>
        {links.length > 1 ? (
          <DialogComponent links={links} icon={carro} />
        ) : (
          <a
            href={links.join('')}
            target='_blank'
            className='self-center transition-all stroke-[#00bfd8] | hover:stroke-red-500 hover:scale-110 '
          >
            {carro}
          </a>
        )}
      </div>
    </article>
  )
}

export default ProductsCard
