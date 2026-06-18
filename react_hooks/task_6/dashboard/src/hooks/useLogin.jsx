import { useState } from 'react'

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

export default function useLogin(onLogin) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [enableSubmit, setEnableSubmit] = useState(false)

  const validate = (newEmail, newPassword) =>
    emailRegex.test(newEmail) && newPassword.length >= 8

  const handleChangeEmail = (event) => {
    const newEmail = event.target.value
    setEmail(newEmail)
    setEnableSubmit(validate(newEmail, password))
  }

  const handleChangePassword = (event) => {
    const newPassword = event.target.value
    setPassword(newPassword)
    setEnableSubmit(validate(email, newPassword))
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    onLogin(email, password)
  }

  return {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  }
}
