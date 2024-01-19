'use client'

import { createContext, useContext, useState } from 'react'
import useUser from '../components/hooks/useUser'
import useModal from '../components/hooks/useModal'
import useCarta from '../components/hooks/useCarta'
import useProduct from '../components/hooks/useProduct'

const Appcontext = createContext()

export function Appwrapper({ children }) {
  const { letter, setLetter } = useCarta()
  const { getModal, setModal } = useModal()
  const { getUser, setUser } = useUser()
  const { getProduct, setProduct } = useProduct()

  // FLAGS
  const [dataChanged, setDataChanged] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Appcontext.Provider
      value={{
        values: {
          user: {
            nombre: getUser.nombreUser,
            id: getUser.userId,
            carta: getUser.userCarta,
            getByName: getUser.getUserByName
          },
          product: {
            get: getProduct.product,
            editting: getProduct.productEditting
          },
          carta: {
            value: letter,
            get: setLetter.getCartaById
          },
          usersNames: {
            value: getUser.usersNames,
            get: getUser.getUserNames
          }
        },
        set: {
          user: {
            login: setUser.loginUser,
            logout: setUser.logoutUser,
            nombre: setUser.setNombreUser,
            id: setUser.setUserId,
            carta: setUser.setUserCarta
          },
          usersNames: setUser.setUsersNames,
          modal: {
            open: setModal.open,
            close: setModal.close,
            toEdit: setModal.toEdit,
            toAdd: setModal.toAdd,
            toDelete: setModal.toDelete,
            toLogin: setModal.toLogin,
            toRegister: setModal.toRegister,
            toReset: setModal.toReset
          },
          product: {
            create: setProduct.creatingProduct,
            update: setProduct.updateProduct,
            delete: setProduct.deleteProduct,
            editting: setProduct.setProductEditting
          },
          carta: {
            set: setLetter.settingCarta,
            reset: setLetter.resetCarta
          },
          flag: {
            dataChanged: setDataChanged,
            isLoading: setIsLoading
          }
        },
        flag: {
          isOpen: getModal.isOpen,
          modalMode: getModal.modalMode,
          isLogged: getUser.isLogged,
          dataChanged,
          isLoading
        }
      }}
    >
      {children}
    </Appcontext.Provider>
  )
}

export function useAppContext() {
  return useContext(Appcontext)
}
