import React from 'react'

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {
    const userToken = window.localStorage.getItem('userToken')
    
    const [loading, setLoading] = React.useState(false)
    const [erro, setErro] = React.useState(null)

    return (
        <UserContext.Provider value={{erro, loading, userToken}}> 
            {children} 
        </UserContext.Provider>
    )
}