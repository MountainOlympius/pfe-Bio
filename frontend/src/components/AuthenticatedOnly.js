import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

// Wrapper for protected pages and components

export const AuthenticatedOnly = ({ children }) => {
    const { account } = useContext(AuthContext)
    const location = useLocation()


    if (account === undefined) {
        return (<></>)
    } else if (account === null) {
        return <Navigate to='/login' state={{ from: location.pathname }} />
    } else {
        return (<>{children}</>)
    }
}
