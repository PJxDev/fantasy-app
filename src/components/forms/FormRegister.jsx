import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function FormRegister({ closeModal }) {
  const [dataForm, setDataForm] = useState({
    email: '',
    nombre: '',
    password: ''
  })
  const router = useRouter()
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
      const res = await axios.post('/api/auth/register', dataForm)
      setResult(res.data.message)
      closeModal()
      router.push('/')
    } catch (e) {
      console.error(e)
      setResult({ data: e.response.data.error })
    }
  }

  return (
    <form
      className='flex flex-col justify-center items-center gap-4 h-full'
      method='POST'
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        name='nombre'
        placeholder='nombre'
        value={dataForm.nombre}
        onChange={handleChange}
        className=' bg-slate-200 text-xl p-2 rounded-md'
      />
      <input
        type='email'
        name='email'
        placeholder='email'
        value={dataForm.email}
        onChange={handleChange}
        className=' bg-slate-200 text-xl p-2 rounded-md'
      />
      <input
        type='password'
        name='password'
        placeholder='password'
        value={dataForm.password}
        onChange={handleChange}
        className=' bg-slate-200 text-xl p-2 rounded-md'
      />
      <button className=' bg-green-600 p-4 text-white font-semibold rounded-md'>
        Registarse
      </button>
      {result && <h2 className='font-semibold'>{`${result.data}`}</h2>}
    </form>
  )
}
