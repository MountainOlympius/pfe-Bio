import React, { createContext, useEffect, useState } from 'react'

import { getAuthenticatedAccount } from '../utils/api'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [account, setAccount] = useState(undefined)

    const fetchAuthInfo = async () => {
        const accountData = await getAuthenticatedAccount()
        setAccount(accountData)
    }

    useEffect(() => {
        fetchAuthInfo()
    }, [])

    return (
        <AuthContext.Provider value={{ account, setAccount }}>
            {children}
        </AuthContext.Provider>
    )
}
