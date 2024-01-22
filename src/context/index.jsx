'use client'

import { createContext, useContext, useState } from 'react'
import useUser from '../components/hooks/useUser'
import useModal from '../components/hooks/useModal'
import useCarta from '../components/hooks/useCarta'
import useProduct from '../components/hooks/useProduct'

const Appcontext = createContext()

export function Appwrapper({ children }) {
  const { getModal, setModal } = useModal()
  const { getUser, setUser } = useUser()

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
            getByName: getUser.getUserByName
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
            id: setUser.setUserId
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
