import { useState } from 'react'

function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalMode, setModalMode] = useState('')

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const editModal = () => {
    setModalMode('editProduct')
  }
  const addModal = () => {
    setModalMode('addProduct')
  }
  const deleteModal = () => {
    setModalMode('confirmDelete')
  }
  const loginModal = () => {
    setModalMode('login')
  }
  const registerModal = () => {
    setModalMode('register')
  }
  const resetModal = () => {
    setModalMode('')
  }

  return {
    getModal: {
      isOpen,
      modalMode
    },
    setModal: {
      open: openModal,
      close: closeModal,
      toEdit: editModal,
      toAdd: addModal,
      toDelete: deleteModal,
      toLogin: loginModal,
      toRegister: registerModal,
      toReset: resetModal
    }
  }
}

export default useModal
