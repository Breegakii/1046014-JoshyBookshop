import { useEffect, useState } from 'react'
import authStorage from '../auth/storage'

import AuthContext from './AuthContext'

export default function AuthContextProvider({children}) {
    const [user, setUser] = useState()
    const restoreUser = ()=>{
        const user = authStorage.getUser()
        if(user) setUser(user)
      }

      useEffect(() => {
        restoreUser()
      }, [])
  return (
    <AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>
  )
}

// AuthContextProvider.propTypes = {
//     children: PropTypes.node.isRequired
// }