import React from 'react'

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {
    const [loading, setLoading] = React.useState(false)
    const [token, setToken] = React.useState(window.localStorage.getItem('token') || false)
    const [accounts, setAccounts] = React.useState([])
    const [transactions, setTransactions] = React.useState([])

    return (
        <UserContext.Provider value={{
            loading,
            setLoading,
            token,
            setToken,
            accounts,
            setAccounts,
            transactions,
            setTransactions
        }}> 
            {children} 
        </UserContext.Provider>
    )
}