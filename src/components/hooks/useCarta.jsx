import axios from 'axios'
import { useState } from 'react'

const localhost = process.env.NEXT_PUBLIC_LOCALHOST

function useCarta() {
  const [letter, setLetter] = useState([])

  const getCartaById = async (id) => {
    const { data } = await axios.get(`${localhost}api/cartas/${id}`)
    data.map((product) => {
      product.images = product.images.split(',')
      product.links = product.links.split(',')
      return product
    })
    return data
  }
  const settingCarta = (content) => {
    setLetter(content)
  }
  const resetCarta = () => {
    setLetter([])
  }

  return {
    letter,
    setLetter: {
      getCartaById,
      settingCarta,
      resetCarta
    }
  }
}

export default useCarta
