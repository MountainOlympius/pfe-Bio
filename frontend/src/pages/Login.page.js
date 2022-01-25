import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Loginform from '../components/LoginForm'
import { accountLogin } from '../utils/api'
import { AuthContext } from '../context/AuthContext'

import '../styles/LoginPage.scss'

const LoginPage = () => {
    const { setAccount } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const redirectTo = location?.state?.from || '/admin'

    const login = async (data, errorsCallback) => {
        const response = await accountLogin(data)

        if (response && response.ok && response.data) {
            setAccount({...response.data})
            setTimeout(() => navigate(redirectTo))
        } else {
            const errors = (response?.errors || ['Something went wrong']).map(
                (message) => {
                    return { message }
                }
            )

            if (typeof errorsCallback === 'function') errorsCallback(errors)
        }
    }

    return (
        <div className='LoginPage'>
            <h2>Login Page</h2>
            <Loginform submitCallback={login} />
        </div>
    )
}

export default LoginPage
