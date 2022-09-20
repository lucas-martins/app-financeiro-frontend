import React from 'react'

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {
    const userToken = window.localStorage.getItem('token')

    const [loading, setLoading] = React.useState(false)

    return (
        <UserContext.Provider value={{loading, setLoading, userToken}}> 
            {children} 
        </UserContext.Provider>
    )
}