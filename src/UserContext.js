import React from 'react'

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {
    const [loading, setLoading] = React.useState(false)
    const [token, setToken] = React.useState(window.localStorage.getItem('token') || false)
    const [accounts, setAccounts] = React.useState([])

    return (
        <UserContext.Provider value={{loading, setLoading, token, setToken, accounts, setAccounts}}> 
            {children} 
        </UserContext.Provider>
    )
}