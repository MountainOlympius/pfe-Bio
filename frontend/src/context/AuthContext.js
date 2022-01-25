import React, { createContext, useEffect, useState } from 'react'

import { getAuthenticatedAccount } from '../utils/api'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [account, setAccount] = useState(undefined)

    useEffect(async () => {
        const accountData = await getAuthenticatedAccount()
        setAccount(accountData)
    }, [])

    return (
        <AuthContext.Provider value={{ account, setAccount }}>
            {children}
        </AuthContext.Provider>
    )
}
