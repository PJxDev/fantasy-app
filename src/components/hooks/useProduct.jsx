import axios from 'axios'
import { useState } from 'react'

const localhost = process.env.NEXT_PUBLIC_LOCALHOST

function useProduct() {
  const [product, setProduct] = useState()
  const [productEditting, setProductEditting] = useState()

  const deletingProduct = async (id) => {
    const data = await axios.delete(`${localhost}api/products/${id}`)
    return data
  }
  const updatingProduct = async ({ id, dataForm, userId }) => {
    const data = await axios.post(`${localhost}api/products/${id}`, {
      ...dataForm,
      userId
    })
    return data
  }
  const creatingProduct = async ({ dataForm, userId }) => {
    const data = await axios.post(`${localhost}api/products`, {
      ...dataForm,
      userId,
      name: dataForm.title
    })
    return data
  }

  return {
    getProduct: {
      product,
      productEditting
    },
    setProduct: {
      creatingProduct,
      deleteProduct: deletingProduct,
      updateProduct: updatingProduct,
      setProductEditting
    }
  }
}

export default useProduct
