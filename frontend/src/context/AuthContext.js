import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [account, setAccount] = useState(undefined)

    useEffect(() => {
        // Set request to /api/auth
    }, [])

    return (
        <AuthContext.Provider value={{ account }}>
            {children}
        </AuthContext.Provider>
    )
}
