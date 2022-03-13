import React, { useRef, useState } from 'react'

import '../styles/LoginForm.scss'


// Note : I used ref just because there just two fields
// Other form must automated

const LoginForm = ({ submitCallback }) => {
    const usernameInputRef = useRef()
    const passwordInputRef = useRef()

    const [errors, setErrors] = useState([])

    const checkRequiredField = (ref, field) => {
        if (!ref.current) return []

        const target = ref.current

        if (!target.value || target.value === '') {
            return [{ field: field, message: `${field} field is required` }]
        }

        return []
    }

    const clearFieldErrors = (field) => {
        setErrors(errors.filter((error) => error?.field !== field))
    }

    const submitForm = (e) => {
        e.preventDefault()

        const newErrors = [
            ...checkRequiredField(usernameInputRef, 'username'),
            ...checkRequiredField(passwordInputRef, 'password'),
        ]

        if (newErrors.length > 0) {
            return setErrors(newErrors)
        }

        setErrors([])

        if (typeof submitCallback === 'function') {
            submitCallback(
                {
                    username: usernameInputRef.current.value,
                    password: passwordInputRef.current.value,
                },
                setErrors
            )
        }
    }

    return (
        <div className="form-container">
        <form onSubmit={submitForm}>
            <div className="form-div">
                <label>Username : </label>
                <input
                    type="text"
                    name="username"
                    className={`input-elt ${errors.filter((error) => error?.field === 'username').length > 0 ? 'error' : ''}`}
                    id="username-input"
                    ref={usernameInputRef}
                    onChange={() => clearFieldErrors('username')}
                />
                <div className="errors-div-username-errors">
                    {errors
                        .filter((error) => error?.field === 'username')
                        .map((error, i) => (
                            <p key={i}>{error.message}</p>
                        ))}
                </div>
            </div>
            <div className="form-div">
                <label>Password : </label>
                <input
                    type="password"
                    name="password"
                    className={`input-elt ${errors.filter((error) => error?.field === 'password').length > 0 ? 'error' : ''}`}
                    id="password-input"
                    ref={passwordInputRef}
                    onChange={() => clearFieldErrors('password')}
                />
                <div className="errors-div-password-errors">
                    {errors
                        .filter((error) => error?.field === 'password')
                        .map((error, i) => (
                            <p key={i}>{error.message}</p>
                        ))}
                </div>
            </div>

            <div className="global-errors-div">
                {errors.filter((error) => !error.field).map((error, i) => (<p key={i}>{error.message}</p>))}
            </div>

            <button className="submit" type="submit">Log in</button>
        </form>
        </div>
    )
}

export default LoginForm
