import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

// protector for Admin Only pages

const AdminOnly = ({ children }) => {
    const { account } = useContext(AuthContext)

    if (account === undefined) {
        return (<></>)
    } else if (account === null || !account.is_admin) {
        // TODO : Must render 404 not found page
        return <div>Not Allowed</div>
    } else {
        return (<>{children}</>)
    }
}

export default AdminOnly