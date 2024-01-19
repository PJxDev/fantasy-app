import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useAppContext } from '../../context/index.jsx'

// TODO: CONTROLAR INPUTS

export default function FormLogin() {
  const [dataForm, setDataForm] = useState({
    email: '',
    password: ''
  })
  const [result, setResult] = useState()
  const { values, set, flag } = useAppContext()
  const router = useRouter()

  const handleChange = (e) => {
    const newValue = { ...dataForm, [e.target.name]: e.target.value }
    setDataForm(newValue)
    if (result) setResult()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      set.flag.isLoading(true)
      const value = await axios.post('/api/auth/login', dataForm)
      setResult()
      set.user.login()
      set.modal.close()
      router.refresh()
      set.flag.dataChanged(true)
    } catch (error) {
      setResult({ data: 'Email o Contraseña incorrecto!' })
      console.error(error)
    } finally {
      set.flag.isLoading(false)
      console.log('result', result)
    }
  }

  return (
    <form
      className='flex flex-col justify-center items-center gap-4 h-full'
      onSubmit={handleSubmit}
    >
      <button
        type='button'
        onClick={() => {
          console.log(result)
        }}
      >
        Button
      </button>
      <input
        type='email'
        name='email'
        placeholder='Email'
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
      <button
        type='submit'
        className=' bg-green-600 p-4 text-white font-semibold rounded-md'
      >
        Login
      </button>
      {result && <h2 className='font-semibold'>{`${result.data}`}</h2>}
    </form>
  )
}
