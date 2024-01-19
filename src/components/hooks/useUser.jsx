import axios from 'axios'
import { useState } from 'react'

const localhost = process.env.NEXT_PUBLIC_LOCALHOST

function useUser() {
  const [isLogged, setIsLogged] = useState(false)
  const [nombreUser, setNombreUser] = useState('')
  const [userId, setUserId] = useState()
  const [userCarta, setUserCarta] = useState()
  const [usersNames, setUsersNames] = useState([])

  const loginUser = () => {
    setIsLogged(true)
  }

  const logoutUser = () => {
    setIsLogged(false)
  }

  const gettingUserByName = async (name) => {
    const { data: dataUser } = await axios.get(
      `${localhost}api/users/${name.toLowerCase()}`
    )
    return dataUser
  }

  const gettingUserNames = async () => {
    const { data } = await axios.get(`${localhost}api/users`)
    const namesFromUsers = data.users.map((user) => user.nombre)
    return namesFromUsers
  }

  return {
    getUser: {
      isLogged,
      nombreUser,
      userId,
      userCarta,
      usersNames,
      getUserNames: gettingUserNames,
      getUserByName: gettingUserByName
    },
    setUser: {
      loginUser,
      logoutUser,
      setNombreUser,
      setUserId,
      setUserCarta,
      setUsersNames
    }
  }
}

export default useUser
