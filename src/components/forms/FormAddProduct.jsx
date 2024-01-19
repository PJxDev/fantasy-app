import { useState } from 'react'
import { useAppContext } from '../../context'

export default function FormRegister() {
  const { values, set, flag } = useAppContext()
  const [dataForm, setDataForm] = useState({
    title: '',
    images: '',
    links: '',
    description: ''
  })
  const [result, setResult] = useState()

  const handleChange = (e) => {
    const newValue = { ...dataForm, [e.target.name]: e.target.value }
    setDataForm(newValue)
    if (result) {
      setResult('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await set.product.create({
        dataForm,
        userId: values.user.id
      })
      setResult(data)
      set.modal.close()
      set.flag.dataChanged(true)
    } catch (e) {
      console.error(e)
      setResult(e.response)
    }
  }

  return (
    <form
      className='flex flex-col justify-center items-center gap-4 h-full'
      method='POST'
      onSubmit={handleSubmit}
    >
      <h3 className='text-2xl'>AÑADIR PRODUCTO</h3>
      <label htmlFor='title' className='text-lg pt-2 w-full'>
        Nombre
      </label>
      <input
        type='text'
        name='title'
        placeholder='Titulo'
        value={dataForm.title}
        onChange={handleChange}
        className=' bg-slate-200 text-lg p-2 rounded-md w-full'
      />
      <label htmlFor='' className='text-m p-2 w-full bg-amber-100'>
        Introduzca los enlaces de las imágenes y de los productos separados por
        una &quot; , &quot; en el caso de que sean varios enlaces
      </label>
      <label htmlFor='images' className='text-lg pt-2 w-full'>
        Imágenes
      </label>
      <textarea
        name='images'
        placeholder='https:\\www...,https:\\www..., https:\\www... '
        value={dataForm.images}
        onChange={handleChange}
        className=' bg-slate-200 text-lg p-2 rounded-md w-full h-32 resize-none'
      />
      <label htmlFor='links' className='text-lg pt-2 w-full'>
        Enlaces
      </label>
      <textarea
        name='links'
        placeholder='https:\\www...,https:\\www...,https:\\www... '
        value={dataForm.links}
        onChange={handleChange}
        className=' bg-slate-200 text-lg p-2 rounded-md w-full h-32 resize-none'
      />
      <label htmlFor='images' className='text-lg pt-2 w-full'>
        Descripción
      </label>
      <textarea
        name='description'
        placeholder='Descripcion'
        value={dataForm.description}
        onChange={handleChange}
        className=' bg-slate-200 text-lg p-2 rounded-md w-full h-24 resize-none'
      />
      <button className=' bg-green-600 p-4 text-white font-semibold rounded-md'>
        Crear
      </button>
      {result && <h2 className='font-semibold'>{`${result.data}`}</h2>}
    </form>
  )
}
